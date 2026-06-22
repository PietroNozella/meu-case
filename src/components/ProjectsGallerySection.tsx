import CircularGallery from './CircularGallery';
import Particles from './Particles';
import { projects } from '../content/projects';

export function ProjectsGallerySection() {
  return (
    <section
      id="projects"
      className="relative overflow-hidden bg-zinc-950 py-24 text-white sm:py-28"
    >
      <Particles
        className="pointer-events-none absolute inset-0"
        particleColors={['#ffffff']}
        particleCount={160}
        particleSpread={9}
        speed={0.05}
        particleBaseSize={100}
        moveParticlesOnHover
        particleHoverFactor={0.35}
        alphaParticles
        disableRotation={false}
        pixelRatio={1}
      />

      <div className="absolute inset-0 bg-zinc-950/45" aria-hidden="true" />

      <div className="relative z-10 mx-auto max-w-6xl px-6 sm:px-8">
        <div className="mb-10 max-w-2xl">
          <p className="mb-3 text-sm font-medium text-cyan-200">Projetos</p>

          <h2 className="text-3xl font-semibold leading-tight text-white sm:text-5xl">
            Uma seleção dos meus trabalhos recentes.
          </h2>

          <p className="mt-4 text-base leading-7 text-zinc-300">
            Explore projetos que combinam produto, interface, performance e
            implementação full-stack.
          </p>
        </div>
      </div>

      <div className="relative z-10 h-[420px] w-full overflow-hidden md:h-[600px]">
        <CircularGallery
          items={projects}
          bend={0.75}
          textColor="#ffffff"
          borderRadius={0.05}
          scrollEase={0.05}
          font="bold 24px Inter"
          scrollSpeed={1.6}
        />
      </div>
    </section>
  );
}
