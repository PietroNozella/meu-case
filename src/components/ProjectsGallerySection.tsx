import CircularGallery from './CircularGallery';
import { projects } from '../content/projects';

export function ProjectsGallerySection() {
  return (
    <section id="projects" className="bg-zinc-950 py-24 text-white sm:py-28">
      <div className="mx-auto max-w-6xl px-6 sm:px-8">
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

      <div className="relative h-[420px] w-full overflow-hidden md:h-[600px]">
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
