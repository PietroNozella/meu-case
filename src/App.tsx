import {
  VscAccount,
  VscArchive,
  VscHome,
  VscSettingsGear,
} from 'react-icons/vsc';
import Dock from './components/Dock';
import Particles from './components/Particles';
import { ProjectsGallerySection } from './components/ProjectsGallerySection';
import { heroContent } from './content/hero';

const scrollToSection = (sectionId: string) => () => {
  document.getElementById(sectionId)?.scrollIntoView({
    behavior: 'smooth',
    block: 'start',
  });
};

const dockItems = [
  {
    icon: <VscHome size={18} />,
    label: 'Home',
    onClick: scrollToSection('home'),
  },
  {
    icon: <VscArchive size={18} />,
    label: 'Projetos',
    onClick: scrollToSection('projects'),
  },
  {
    icon: <VscAccount size={18} />,
    label: 'Sobre',
    onClick: scrollToSection('about'),
  },
  {
    icon: <VscSettingsGear size={18} />,
    label: 'Contato',
    onClick: scrollToSection('contact'),
  },
];

function App() {
  return (
    <main>
      <section
        id="home"
        className="relative min-h-screen overflow-hidden bg-zinc-950 text-white"
      >
        <Particles
          className="absolute inset-0 pointer-events-none"
          particleColors={['#ffffff']}
          particleCount={180}
          particleSpread={7}
          speed={0.06}
          particleBaseSize={115}
          moveParticlesOnHover
          particleHoverFactor={0.5}
          alphaParticles
          disableRotation={false}
          pixelRatio={1}
        />

        <div className="absolute inset-0 bg-zinc-950/55" aria-hidden="true" />
        <div
          className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-zinc-950 to-transparent"
          aria-hidden="true"
        />

        <div className="relative z-10 mx-auto flex min-h-screen max-w-5xl flex-col justify-center px-6 pb-36 pt-20 sm:px-8">
          <div className="max-w-3xl">
            <p className="mb-5 text-sm font-medium text-cyan-200 sm:text-base">
              {heroContent.eyebrow}
            </p>

            <h1 className="text-4xl font-semibold leading-tight text-white sm:text-6xl">
              {heroContent.title}
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-8 text-zinc-300 sm:text-lg">
              {heroContent.description}
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <a
                className="inline-flex min-h-12 items-center justify-center rounded-md bg-white px-5 py-3 text-sm font-semibold text-zinc-950 transition hover:bg-cyan-100 focus:outline-none focus:ring-2 focus:ring-cyan-300 focus:ring-offset-2 focus:ring-offset-zinc-950"
                href="#projects"
              >
                {heroContent.primaryButton}
              </a>

              <a
                className="inline-flex min-h-12 items-center justify-center rounded-md border border-white/15 px-5 py-3 text-sm font-semibold text-white transition hover:border-cyan-200/60 hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-cyan-300 focus:ring-offset-2 focus:ring-offset-zinc-950"
                href="mailto:contato@exemplo.com"
              >
                {heroContent.secondaryButton}
              </a>
            </div>
          </div>
        </div>

        <Dock
          items={dockItems}
          panelHeight={68}
          baseItemSize={50}
          magnification={70}
        />
      </section>

      <ProjectsGallerySection />
    </main>
  );
}

export default App;
