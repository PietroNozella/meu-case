import { useState } from 'react';
import {
  VscAccount,
  VscArchive,
  VscHome,
  VscSettingsGear,
} from 'react-icons/vsc';
import Dock from './components/Dock';
import Lightfall from './components/Lightfall';
import { AboutSection } from './components/AboutSection';
import { ProjectsGallerySection } from './components/ProjectsGallerySection';
import { ContactCard } from './components/ContactCard';
import { heroContent } from './content/hero';

const lightfallColors = ['#FFFFFF', '#D4D4D8', '#71717A'];

const scrollToSection = (sectionId: string) => () => {
  document.getElementById(sectionId)?.scrollIntoView({
    behavior: 'smooth',
    block: 'start',
  });
};

function App() {
  const [isContactOpen, setIsContactOpen] = useState(false);

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
      onClick: () => setIsContactOpen(true),
    },
  ];

  return (
    <main>
      <section
        id="home"
        className="relative min-h-screen overflow-hidden bg-zinc-950 text-white"
      >
        <Lightfall
          className="absolute inset-0 pointer-events-none"
          colors={lightfallColors}
          backgroundColor="#09090B"
          speed={0.5}
          streakCount={2}
          streakWidth={1}
          streakLength={1}
          glow={0.85}
          density={0.6}
          twinkle={1}
          zoom={3}
          backgroundGlow={0.25}
          opacity={0.9}
          mouseInteraction={false}
          mouseStrength={0.5}
          mouseRadius={1}
          dpr={1}
        />

        <div className="absolute inset-0 bg-zinc-950/55" aria-hidden="true" />
        <div
          className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-zinc-950 to-transparent"
          aria-hidden="true"
        />

        <div className="relative z-10 mx-auto flex min-h-screen max-w-5xl flex-col items-center justify-center px-6 pb-36 pt-20 text-center sm:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <p className="mb-5 text-sm font-medium text-cyan-200 sm:text-base">
              {heroContent.eyebrow}
            </p>

            <h1 className="mx-auto text-balance text-4xl font-semibold leading-tight text-white sm:text-6xl">
              {heroContent.title}
            </h1>

            <p className="mx-auto mt-8 max-w-2xl text-base leading-8 text-zinc-300 sm:text-lg">
              {heroContent.description}
            </p>
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
      <AboutSection />
      <ContactCard
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
      />
    </main>
  );
}

export default App;
