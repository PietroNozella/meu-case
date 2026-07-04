import LogoLoop from './LogoLoop';
import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiTailwindcss,
  SiPython,
  SiSupabase,
  SiVercel,
  SiGithub,
} from 'react-icons/si';

const techLogos = [
  {
    node: <SiReact color="#61DAFB" />,
    title: 'React',
    href: 'https://react.dev',
  },
  {
    node: <SiNextdotjs color="#ffffff" />,
    title: 'Next.js',
    href: 'https://nextjs.org',
  },
  {
    node: <SiTypescript color="#3178C6" />,
    title: 'TypeScript',
    href: 'https://www.typescriptlang.org',
  },
  {
    node: <SiTailwindcss color="#06B6D4" />,
    title: 'Tailwind CSS',
    href: 'https://tailwindcss.com',
  },
  {
    node: <SiPython color="#3776AB" />,
    title: 'Python',
    href: 'https://python.org',
  },
  {
    node: <SiSupabase color="#3FCF8E" />,
    title: 'Supabase',
    href: 'https://supabase.com',
  },
  {
    node: <SiVercel color="#ffffff" />,
    title: 'Vercel',
    href: 'https://vercel.com',
  },
  {
    node: <SiGithub color="#ffffff" />,
    title: 'GitHub',
    href: 'https://github.com',
  },
];

export function TechStackSection() {
  return (
    <section className="relative bg-zinc-950 py-16">
      <div className="mx-auto max-w-6xl px-6 sm:px-8">
        <p className="mb-8 text-center text-sm font-medium tracking-wide text-cyan-200">
          Tecnologias
        </p>
        <LogoLoop
          logos={techLogos}
          speed={80}
          direction="left"
          logoHeight={48}
          gap={64}
          hoverSpeed={0}
          scaleOnHover
          fadeOut
          fadeOutColor="#09090B"
          ariaLabel="Tecnologias do stack"
        />
      </div>
    </section>
  );
}
