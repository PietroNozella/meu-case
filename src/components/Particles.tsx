import { useEffect, useRef } from 'react';
import { Camera, Geometry, Mesh, Program, Renderer, Transform } from 'ogl';

type ParticlesProps = {
  className?: string;
  particleColors?: string[];
  particleCount?: number;
  particleSpread?: number;
  speed?: number;
  particleBaseSize?: number;
  moveParticlesOnHover?: boolean;
  particleHoverFactor?: number;
  alphaParticles?: boolean;
  disableRotation?: boolean;
  pixelRatio?: number;
};

const vertexShader = `
attribute vec3 position;
attribute vec4 random;
attribute vec3 color;

uniform mat4 modelViewMatrix;
uniform mat4 projectionMatrix;
uniform float uTime;
uniform float uSpeed;
uniform float uBaseSize;
uniform float uHoverFactor;
uniform vec2 uMouse;
uniform bool uDisableRotation;

varying vec4 vRandom;
varying vec3 vColor;

void main() {
  vec3 pos = position;
  float time = uTime * uSpeed;
  float angle = uDisableRotation ? 0.0 : time + random.x * 6.28318530718;
  float s = sin(angle);
  float c = cos(angle);

  pos.xz = mat2(c, -s, s, c) * pos.xz;
  pos.y += sin(time * 1.6 + random.y * 8.0) * 0.08;
  pos.x += uMouse.x * uHoverFactor * random.z;
  pos.y += uMouse.y * uHoverFactor * random.w;

  vec4 mvPos = modelViewMatrix * vec4(pos, 1.0);
  gl_PointSize = uBaseSize * (0.7 + random.x * 0.6) / max(0.1, -mvPos.z);
  gl_Position = projectionMatrix * mvPos;

  vRandom = random;
  vColor = color;
}
`;

const fragmentShader = `
precision highp float;

uniform bool uAlphaParticles;

varying vec4 vRandom;
varying vec3 vColor;

void main() {
  vec2 uv = gl_PointCoord - vec2(0.5);
  float distanceToCenter = length(uv);
  float alpha = uAlphaParticles
    ? smoothstep(0.5, 0.0, distanceToCenter)
    : step(distanceToCenter, 0.5);

  if (alpha < 0.01) {
    discard;
  }

  gl_FragColor = vec4(vColor, alpha * (0.55 + vRandom.y * 0.35));
}
`;

function parseHexColor(color: string): [number, number, number] {
  const normalized = color.replace('#', '').trim();
  const hex =
    normalized.length === 3
      ? normalized
          .split('')
          .map((value) => `${value}${value}`)
          .join('')
      : normalized;

  const value = Number.parseInt(hex, 16);

  if (Number.isNaN(value)) {
    return [1, 1, 1];
  }

  return [
    ((value >> 16) & 255) / 255,
    ((value >> 8) & 255) / 255,
    (value & 255) / 255,
  ];
}

function Particles({
  className,
  particleColors = ['#ffffff'],
  particleCount = 120,
  particleSpread = 8,
  speed = 0.05,
  particleBaseSize = 80,
  moveParticlesOnHover = false,
  particleHoverFactor = 0.5,
  alphaParticles = true,
  disableRotation = false,
  pixelRatio,
}: ParticlesProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;

    if (!container) {
      return;
    }

    const renderer = new Renderer({
      alpha: true,
      antialias: true,
      dpr: pixelRatio ?? Math.min(window.devicePixelRatio, 2),
      depth: false,
    });
    const gl = renderer.gl;

    gl.clearColor(0, 0, 0, 0);
    gl.canvas.style.display = 'block';
    gl.canvas.style.width = '100%';
    gl.canvas.style.height = '100%';
    container.appendChild(gl.canvas);

    const camera = new Camera(gl, { fov: 35, near: 0.1, far: 100 });
    camera.position.z = 8;

    const scene = new Transform();
    const positions = new Float32Array(particleCount * 3);
    const randoms = new Float32Array(particleCount * 4);
    const colors = new Float32Array(particleCount * 3);
    const parsedColors = particleColors.map(parseHexColor);

    for (let index = 0; index < particleCount; index += 1) {
      const positionIndex = index * 3;
      const randomIndex = index * 4;
      const color = parsedColors[index % parsedColors.length] ?? [1, 1, 1];

      positions[positionIndex] = (Math.random() - 0.5) * particleSpread;
      positions[positionIndex + 1] = (Math.random() - 0.5) * particleSpread * 0.65;
      positions[positionIndex + 2] = (Math.random() - 0.5) * particleSpread;

      randoms[randomIndex] = Math.random();
      randoms[randomIndex + 1] = Math.random();
      randoms[randomIndex + 2] = Math.random() * 2 - 1;
      randoms[randomIndex + 3] = Math.random() * 2 - 1;

      colors[positionIndex] = color[0];
      colors[positionIndex + 1] = color[1];
      colors[positionIndex + 2] = color[2];
    }

    const geometry = new Geometry(gl, {
      position: { size: 3, data: positions },
      random: { size: 4, data: randoms },
      color: { size: 3, data: colors },
    });

    const mouse: [number, number] = [0, 0];
    const mouseTarget: [number, number] = [0, 0];

    const program = new Program(gl, {
      vertex: vertexShader,
      fragment: fragmentShader,
      transparent: true,
      depthTest: false,
      depthWrite: false,
      uniforms: {
        uTime: { value: 0 },
        uSpeed: { value: speed },
        uBaseSize: { value: particleBaseSize },
        uHoverFactor: { value: particleHoverFactor },
        uMouse: { value: mouse },
        uAlphaParticles: { value: alphaParticles },
        uDisableRotation: { value: disableRotation },
      },
    });

    const mesh = new Mesh(gl, {
      geometry,
      program,
      mode: gl.POINTS,
    });
    mesh.setParent(scene);

    const resize = () => {
      const width = container.clientWidth || 1;
      const height = container.clientHeight || 1;

      renderer.setSize(width, height);
      camera.perspective({ aspect: width / height });
    };

    const handlePointerMove = (event: PointerEvent) => {
      if (!moveParticlesOnHover) {
        return;
      }

      const rect = container.getBoundingClientRect();
      const isInside =
        event.clientX >= rect.left &&
        event.clientX <= rect.right &&
        event.clientY >= rect.top &&
        event.clientY <= rect.bottom;

      if (!isInside) {
        mouseTarget[0] = 0;
        mouseTarget[1] = 0;
        return;
      }

      mouseTarget[0] = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
      mouseTarget[1] = -(((event.clientY - rect.top) / rect.height - 0.5) * 2);
    };

    let animationFrame = 0;
    const startTime = performance.now();

    const update = () => {
      const elapsed = performance.now() - startTime;

      program.uniforms.uTime.value = elapsed * 0.001;
      mouse[0] += (mouseTarget[0] - mouse[0]) * 0.06;
      mouse[1] += (mouseTarget[1] - mouse[1]) * 0.06;

      renderer.render({ scene, camera, sort: false, clear: true });
      animationFrame = requestAnimationFrame(update);
    };

    resize();
    update();

    window.addEventListener('resize', resize);
    window.addEventListener('pointermove', handlePointerMove);

    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointermove', handlePointerMove);
      geometry.remove();
      program.remove();
      gl.canvas.remove();
    };
  }, [
    alphaParticles,
    disableRotation,
    moveParticlesOnHover,
    particleBaseSize,
    particleColors,
    particleCount,
    particleHoverFactor,
    particleSpread,
    pixelRatio,
    speed,
  ]);

  return (
    <div
      ref={containerRef}
      className={['h-full w-full', className ?? 'relative'].filter(Boolean).join(' ')}
      aria-hidden="true"
    />
  );
}

export default Particles;
