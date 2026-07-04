import { useEffect, useRef } from 'react';

interface ContactCardProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ContactCard({ isOpen, onClose }: ContactCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const card = cardRef.current;
    if (!card) return;

    const isMobile = window.matchMedia('(pointer: coarse)').matches;

    const handlePointerMove = (e: PointerEvent) => {
      if (isMobile) return;
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      const tiltX = (y - 0.5) * -10;
      const tiltY = (x - 0.5) * 10;
      card.style.setProperty('--tilt-x', `${tiltX}deg`);
      card.style.setProperty('--tilt-y', `${tiltY}deg`);
    };

    const handlePointerLeave = () => {
      card.style.setProperty('--tilt-x', '0deg');
      card.style.setProperty('--tilt-y', '0deg');
    };

    card.addEventListener('pointermove', handlePointerMove);
    card.addEventListener('pointerleave', handlePointerLeave);

    return () => {
      card.removeEventListener('pointermove', handlePointerMove);
      card.removeEventListener('pointerleave', handlePointerLeave);
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === overlayRef.current) onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      ref={overlayRef}
      onClick={handleOverlayClick}
      className="fixed inset-0 z-50 flex items-center justify-center bg-zinc-950/80 backdrop-blur-sm"
    >
      <div
        ref={cardRef}
        style={{
          transform:
            'perspective(500px) rotateX(var(--tilt-x, 0deg)) rotateY(var(--tilt-y, 0deg))',
        }}
        className="relative w-full max-w-sm overflow-hidden rounded-2xl border border-white/10 bg-zinc-950 shadow-2xl shadow-black/50 transition-transform duration-200 ease-out"
      >
        <div className="absolute inset-0">
          <img
            src="/sem fundo2.png"
            alt=""
            className="h-full w-full object-cover brightness-[0.35] saturate-[0.7]"
            style={{ filter: 'blur(16px) brightness(0.35) saturate(0.7)' }}
          />
          <div className="absolute inset-0 bg-zinc-950/40" />
        </div>

        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-10 flex h-7 w-7 items-center justify-center rounded-full bg-black/40 text-zinc-400 backdrop-blur-sm transition-colors hover:bg-white/10 hover:text-white"
          aria-label="Fechar"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        <div className="relative z-[1] flex flex-col items-center p-8 pt-12">
          <div className="h-20 w-20 overflow-hidden rounded-full border-2 border-white/20 shadow-lg shadow-black/30">
            <img
              src="/sem fundo2.png"
              alt="Pietro Nozella"
              className="h-full w-full object-cover"
            />
          </div>

          <p className="mb-1 mt-5 text-center text-sm font-medium text-cyan-200">Contato</p>
          <h3 className="text-center text-xl font-semibold text-white">Pietro Nozella</h3>
          <p className="text-center text-sm text-zinc-400">Engenheiro de Software</p>

          <div className="my-5 h-px w-full bg-white/10" />

          <div className="flex w-full flex-col gap-3">
            <a
              href="https://github.com/PietroNozella"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 rounded-lg border border-white/15 bg-white/10 px-4 py-3 text-sm text-zinc-200 backdrop-blur-sm transition-colors hover:border-white/30 hover:bg-white/20 hover:text-white"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
              </svg>
              <span>github.com/PietroNozella</span>
            </a>
            <a
              href="mailto:nozellasoneto@gmail.com"
              className="flex items-center gap-3 rounded-lg border border-white/15 bg-white/10 px-4 py-3 text-sm text-zinc-200 backdrop-blur-sm transition-colors hover:border-white/30 hover:bg-white/20 hover:text-white"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="2" y="4" width="20" height="16" rx="2" />
                <path d="M22 7l-10 7L2 7" />
              </svg>
              <span>nozellasoneto@gmail.com</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
