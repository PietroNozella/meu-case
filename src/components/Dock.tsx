'use client';

import { useRef, type ReactNode } from 'react';
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  type MotionValue,
} from 'motion/react';

type DockItem = {
  icon: ReactNode;
  label: string;
  onClick: () => void;
};

type DockProps = {
  items: DockItem[];
  panelHeight?: number;
  baseItemSize?: number;
  magnification?: number;
  className?: string;
};

type DockButtonProps = {
  item: DockItem;
  mouseX: MotionValue<number>;
  baseItemSize: number;
  magnification: number;
};

function DockButton({
  item,
  mouseX,
  baseItemSize,
  magnification,
}: DockButtonProps) {
  const itemRef = useRef<HTMLButtonElement>(null);
  const distance = useTransform(mouseX, (value) => {
    const bounds = itemRef.current?.getBoundingClientRect();

    if (!bounds) {
      return Number.POSITIVE_INFINITY;
    }

    return value - bounds.left - bounds.width / 2;
  });
  const itemSize = useTransform(distance, [-150, 0, 150], [
    baseItemSize,
    magnification,
    baseItemSize,
  ]);
  const animatedSize = useSpring(itemSize, {
    mass: 0.12,
    stiffness: 180,
    damping: 18,
  });

  return (
    <motion.button
      ref={itemRef}
      type="button"
      aria-label={item.label}
      title={item.label}
      className="group relative inline-flex shrink-0 items-center justify-center rounded-md border border-white/10 bg-white/10 text-zinc-100 shadow-lg shadow-black/20 outline-none backdrop-blur-md transition-colors hover:border-cyan-200/60 hover:bg-white/20 focus-visible:border-cyan-200/70 focus-visible:ring-2 focus-visible:ring-cyan-300 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950"
      style={{ height: animatedSize, width: animatedSize }}
      whileTap={{ scale: 0.95 }}
      onClick={item.onClick}
    >
      <span
        className="pointer-events-none absolute -top-10 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md border border-white/10 bg-zinc-900/95 px-2 py-1 text-xs font-medium text-white opacity-0 shadow-lg shadow-black/20 transition-opacity duration-150 group-hover:opacity-100 group-focus-visible:opacity-100"
        role="tooltip"
      >
        {item.label}
      </span>

      <span className="flex items-center justify-center" aria-hidden="true">
        {item.icon}
      </span>
    </motion.button>
  );
}

function Dock({
  items,
  panelHeight = 68,
  baseItemSize = 50,
  magnification = 70,
  className,
}: DockProps) {
  const mouseX = useMotionValue(Number.POSITIVE_INFINITY);

  return (
    <motion.nav
      aria-label="Atalhos da pagina"
      className={[
        'absolute inset-x-0 bottom-6 z-20 flex justify-center px-4',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      onMouseLeave={() => mouseX.set(Number.POSITIVE_INFINITY)}
      onMouseMove={(event) => mouseX.set(event.clientX)}
    >
      <div
        className="flex items-center gap-2 overflow-visible rounded-md border border-white/10 bg-zinc-950/60 px-3 shadow-2xl shadow-black/40 backdrop-blur-xl"
        style={{ height: panelHeight }}
      >
        {items.map((item) => (
          <DockButton
            key={item.label}
            item={item}
            mouseX={mouseX}
            baseItemSize={baseItemSize}
            magnification={magnification}
          />
        ))}
      </div>
    </motion.nav>
  );
}

export default Dock;
