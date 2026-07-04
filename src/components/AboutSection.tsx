import CardSwap, { Card } from './CardSwap';
import Particles from './Particles';

const aboutParagraphs = [
  'Sou engenheiro de software com perfil pr\u00e1tico, direto e orientado a entrega. Gosto de transformar problemas reais em produtos digitais simples de usar, bem estruturados e prontos para crescer sem complexidade desnecess\u00e1ria.',
  'Atuo entre frontend, backend, automa\u00e7\u00f5es e dados, conectando vis\u00e3o de produto com execu\u00e7\u00e3o t\u00e9cnica. Meu foco \u00e9 construir interfaces claras, fluxos eficientes e solu\u00e7\u00f5es que economizam tempo, reduzem atrito e geram resultado mensur\u00e1vel.',
] as const;

const aboutCards = [
  {
    title: 'Interfaces & Landing Pages',
    focus: 'Clareza visual e convers\u00e3o',
    description: 'Experi\u00eancias responsivas com hierarquia clara, CTA direto e base visual consistente.',
    stack: ['React', 'TypeScript', 'Tailwind CSS'],
    code: `const HeroCTA = () => (
  <section className="grid gap-6">
    <h1>Produto claro.</h1>
    <a href="#contact">Comecar</a>
  </section>
);`,
  },
  {
    title: 'Automa\u00e7\u00f5es & APIs',
    focus: 'Fluxos repet\u00edveis e integra\u00e7\u00f5es',
    description: 'Rotinas pequenas para conectar fontes, limpar dados e reduzir trabalho manual.',
    stack: ['Python', 'APIs', 'Scripts'],
    code: `async def sync_leads(api):
    rows = await api.fetch()
    clean = normalize(rows)
    return await api.send(clean)`,
  },
  {
    title: 'Dashboards & Dados',
    focus: 'M\u00e9tricas acion\u00e1veis',
    description: 'Consultas e interfaces para acompanhar indicadores sem perder contexto de produto.',
    stack: ['Supabase', 'SQL', 'React'],
    code: `const { data } = await supabase
  .from('metrics')
  .select('label,value')
  .order('created_at');`,
  },
  {
    title: 'Produto, Deploy & Seguran\u00e7a',
    focus: 'Entrega pronta para produ\u00e7\u00e3o',
    description: 'Deploy previs\u00edvel, revis\u00e3o de mudan\u00e7as e cuidados b\u00e1sicos de seguran\u00e7a no fluxo.',
    stack: ['Vercel', 'GitHub', 'Cyberseguran\u00e7a'],
    code: `export const deploy = {
  preview: 'vercel',
  checks: ['build', 'headers'],
  branch: 'main',
};`,
  },
] as const;

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
            <span className="block text-zinc-300">engenheiro de software.</span>
          </h2>

          <div className="mt-6 max-w-xl space-y-4 text-sm leading-7 text-zinc-300 sm:text-base">
            {aboutParagraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>

          <div className="relative mt-8 h-[460px] max-w-xl overflow-hidden sm:h-[500px] lg:h-[540px]">
            <CardSwap
              width={380}
              height={350}
              cardDistance={30}
              verticalDistance={52}
              delay={6000}
              pauseOnHover
              skewAmount={4}
            >
              {aboutCards.map((card) => (
                <Card
                  key={card.title}
                  className="flex flex-col justify-between p-5 text-left"
                >
                  <div>
                    <div className="flex flex-wrap gap-1.5">
                      {card.stack.map((technology) => (
                        <span
                          key={technology}
                          className="rounded-md border border-white/10 bg-white/[0.04] px-2 py-1 text-[10px] font-medium uppercase tracking-[0.12em] text-zinc-300"
                        >
                          {technology}
                        </span>
                      ))}
                    </div>

                    <p className="mt-5 text-xs font-semibold uppercase tracking-[0.18em] text-zinc-500">
                      {card.focus}
                    </p>
                    <h3 className="mt-2 text-xl font-semibold leading-tight text-white">
                      {card.title}
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-zinc-400">
                      {card.description}
                    </p>
                  </div>

                  <pre className="mt-4 overflow-hidden whitespace-pre-wrap break-words rounded-md border border-white/10 bg-black/50 p-3 font-mono text-[11px] leading-5 text-zinc-300">
                    <code>{card.code}</code>
                  </pre>
                </Card>
              ))}
            </CardSwap>
          </div>
        </div>
      </div>
    </section>
  );
}