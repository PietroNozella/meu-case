import Particles from './Particles';

const specialties = [
  'Automações',
  'Dashboards interativos',
  'Landing Pages de alta conversão',
  'Aplicações web',
  'Integrações com APIs',
  'Cybersegurança',
];

const stack = [
  'TypeScript',
  'JavaScript',
  'Python',
  'React',
  'Tailwind CSS',
  'Supabase',
  'Vercel',
  'HTML',
  'CSS',
  'SQL',
  'Git/GitHub',
];

export function AboutSection() {
  return (
    <section
      id="about"
      className="relative overflow-hidden bg-zinc-950 py-24 text-white sm:py-28"
    >
      <Particles
        className="pointer-events-none absolute inset-0 opacity-70"
        particleColors={['#ffffff']}
        particleCount={95}
        particleSpread={11}
        speed={0.035}
        particleBaseSize={85}
        moveParticlesOnHover
        particleHoverFactor={0.2}
        alphaParticles
        disableRotation={false}
        pixelRatio={1}
      />

      <div className="absolute inset-0 bg-zinc-950/70" aria-hidden="true" />
      <div
        className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-zinc-950 to-transparent"
        aria-hidden="true"
      />
      <div
        className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-zinc-950 to-transparent"
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto grid max-w-6xl items-center gap-12 px-6 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        <div className="order-2 relative mx-auto w-full max-w-sm overflow-hidden lg:order-1 lg:max-w-lg lg:-ml-10">
          <div
            className="absolute inset-x-12 bottom-16 top-24 rounded-full bg-white/[0.035] blur-3xl"
            aria-hidden="true"
          />

          <div
            className="absolute inset-x-0 bottom-0 z-20 h-1/2 bg-gradient-to-t from-zinc-950 via-zinc-950/95 to-transparent"
            aria-hidden="true"
          />

          <div
            className="absolute inset-y-0 left-0 z-20 w-1/4 bg-gradient-to-r from-zinc-950 to-transparent"
            aria-hidden="true"
          />

          <div
            className="absolute inset-y-0 right-0 z-20 w-1/4 bg-gradient-to-l from-zinc-950 to-transparent"
            aria-hidden="true"
          />

          <img
            src="/about/profile.png"
            alt="Retrato de Pietro Nozella, desenvolvedor full stack"
            className="relative z-10 mx-auto h-auto max-h-[680px] w-full object-contain opacity-75 drop-shadow-2xl brightness-70 contrast-110 saturate-[0.8] [mask-image:linear-gradient(to_bottom,transparent_0%,black_9%,black_68%,transparent_100%)]"
          />
        </div>

        <div className="order-1 max-w-2xl lg:order-2">
          <p className="mb-4 text-sm font-medium text-cyan-200">Sobre mim</p>

          <h2 className="max-w-2xl text-3xl font-semibold leading-tight text-white sm:text-5xl">
            Prazer, sou Pietro Nozella,
            <span className="block text-zinc-300">desenvolvedor full stack.</span>
          </h2>

          <div className="mt-6 max-w-xl space-y-4 text-sm leading-7 text-zinc-300 sm:text-base">
            <p>
              Tenho 21 anos e sou formando em Engenharia de Software. Desenvolvo
              soluções digitais com foco em automações, dashboards interativos,
              landing pages de alta conversão e aplicações web modernas.
            </p>

            <p>
              Minha base combina desenvolvimento full stack, visão de produto e
              fundamentos de cybersegurança para criar interfaces funcionais,
              seguras e orientadas a resultado.
            </p>
          </div>

          <div className="mt-8 border-t border-white/10 pt-6">
            <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-500">
              Especialidades
            </h3>

            <div className="mt-4 flex flex-wrap gap-x-3 gap-y-2 text-sm font-medium text-zinc-200">
              {specialties.map((specialty, index) => (
                <span key={specialty} className="inline-flex items-center gap-3">
                  {index > 0 && <span className="text-cyan-200/40">•</span>}
                  {specialty}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-8">
            <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-500">
              Stack técnica
            </h3>

            <div className="mt-4 flex flex-wrap gap-2">
              {stack.map((technology) => (
                <span
                  key={technology}
                  className="rounded-md border border-white/10 bg-white/[0.035] px-3 py-1.5 text-xs font-medium text-zinc-300 backdrop-blur-sm"
                >
                  {technology}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
