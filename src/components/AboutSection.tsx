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
        className="pointer-events-none absolute inset-0"
        particleColors={['#ffffff']}
        particleCount={120}
        particleSpread={10}
        speed={0.04}
        particleBaseSize={90}
        moveParticlesOnHover
        particleHoverFactor={0.25}
        alphaParticles
        disableRotation={false}
        pixelRatio={1}
      />

      <div className="absolute inset-0 bg-zinc-950/60" aria-hidden="true" />
      <div
        className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-zinc-950 to-transparent"
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto grid max-w-6xl items-center gap-14 px-6 sm:px-8 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <p className="mb-3 text-sm font-medium text-cyan-200">Sobre mim</p>

          <h2 className="max-w-3xl text-3xl font-semibold leading-tight text-white sm:text-5xl">
            Desenvolvimento com foco em clareza, resultado e execução.
          </h2>

          <div className="mt-6 max-w-2xl space-y-4 text-base leading-8 text-zinc-300 sm:text-lg">
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

          <div className="mt-10">
            <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-zinc-400">
              Especialidades
            </h3>

            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {specialties.map((specialty) => (
                <div
                  key={specialty}
                  className="rounded-md border border-white/10 bg-white/[0.04] px-4 py-3 text-sm font-medium text-zinc-100 backdrop-blur-sm"
                >
                  {specialty}
                </div>
              ))}
            </div>
          </div>

          <div className="mt-10">
            <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-zinc-400">
              Stack técnica
            </h3>

            <div className="mt-4 flex flex-wrap gap-2">
              {stack.map((technology) => (
                <span
                  key={technology}
                  className="rounded-md border border-cyan-200/15 bg-cyan-200/10 px-3 py-2 text-sm font-medium text-cyan-100"
                >
                  {technology}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-sm lg:max-w-md">
          <div
            className="absolute inset-x-8 bottom-4 top-16 rounded-md border border-cyan-200/15 bg-cyan-200/10 shadow-2xl shadow-cyan-950/40 backdrop-blur-sm"
            aria-hidden="true"
          />

          <div
            className="absolute inset-x-12 bottom-8 top-28 rounded-md bg-cyan-200/10 blur-3xl"
            aria-hidden="true"
          />

          <img
            src="/about/profile.png"
            alt="Retrato de Carlos, desenvolvedor full stack"
            className="relative z-10 mx-auto h-auto max-h-[620px] w-full object-contain drop-shadow-2xl"
          />
        </div>
      </div>
    </section>
  );
}
