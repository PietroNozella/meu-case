import {
  Children,
  cloneElement,
  forwardRef,
  isValidElement,
  useEffect,
  useMemo,
  useRef,
  type CSSProperties,
  type KeyboardEvent,
  type MouseEvent,
  type ReactElement,
  type ReactNode,
  type RefObject,
} from 'react';
import gsap from 'gsap';

export interface CardSwapProps {
  width?: number | string;
  height?: number | string;
  cardDistance?: number;
  verticalDistance?: number;
  delay?: number;
  pauseOnHover?: boolean;
  onCardClick?: (idx: number) => void;
  skewAmount?: number;
  easing?: 'linear' | 'elastic';
  reducedMotion?: boolean;
  className?: string;
  children: ReactNode;
}

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  customClass?: string;
}

type CardRef = RefObject<HTMLDivElement | null>;

type Slot = {
  x: number;
  y: number;
  z: number;
  zIndex: number;
};

const makeSlot = (
  index: number,
  distanceX: number,
  distanceY: number,
  total: number,
): Slot => ({
  x: index * distanceX,
  y: -index * distanceY,
  z: -index * distanceX * 1.5,
  zIndex: total - index,
});

const placeNow = (element: HTMLElement, slot: Slot, skew: number) => {
  gsap.set(element, {
    x: slot.x,
    y: slot.y,
    z: slot.z,
    xPercent: -50,
    yPercent: -50,
    skewY: skew,
    transformOrigin: 'center center',
    zIndex: slot.zIndex,
    force3D: true,
  });
};

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, customClass, ...rest }, ref) => (
    <div
      ref={ref}
      {...rest}
      className={[
        'absolute left-1/2 top-1/2 overflow-hidden rounded-md border border-white/10 bg-zinc-950/95 shadow-2xl shadow-black/40',
        '[backface-visibility:hidden] [transform-style:preserve-3d] [will-change:transform]',
        customClass,
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    />
  ),
);

Card.displayName = 'Card';

function CardSwap({
  width = 500,
  height = 400,
  cardDistance = 60,
  verticalDistance = 70,
  delay = 5000,
  pauseOnHover = false,
  onCardClick,
  skewAmount = 6,
  easing = 'elastic',
  reducedMotion,
  className,
  children,
}: CardSwapProps) {
  const config = useMemo(
    () =>
      easing === 'elastic'
        ? {
            ease: 'elastic.out(0.6,0.9)',
            durDrop: 1.8,
            durMove: 1.6,
            durReturn: 1.8,
            promoteOverlap: 0.86,
            returnDelay: 0.05,
          }
        : {
            ease: 'power1.inOut',
            durDrop: 0.7,
            durMove: 0.7,
            durReturn: 0.7,
            promoteOverlap: 0.45,
            returnDelay: 0.2,
          },
    [easing],
  );
  const childArr = useMemo(
    () => Children.toArray(children) as ReactElement<CardProps>[],
    [children],
  );
  const refs = useMemo<CardRef[]>(
    () => childArr.map(() => ({ current: null })),
    [childArr],
  );
  const order = useRef<number[]>([]);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const intervalRef = useRef<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const elements = refs
      .map((ref) => ref.current)
      .filter((element): element is HTMLDivElement => Boolean(element));

    if (elements.length === 0) {
      return;
    }

    const shouldReduceMotion =
      reducedMotion ??
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const total = elements.length;

    order.current = Array.from({ length: total }, (_, index) => index);
    elements.forEach((element, index) =>
      placeNow(
        element,
        makeSlot(index, cardDistance, verticalDistance, total),
        skewAmount,
      ),
    );

    if (shouldReduceMotion) {
      return () => {
        gsap.killTweensOf(elements);
      };
    }

    const clearSwapInterval = () => {
      if (intervalRef.current) {
        window.clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };

    const swap = () => {
      if (order.current.length < 2) {
        return;
      }

      timelineRef.current?.kill();

      const [front, ...rest] = order.current;
      const frontElement = elements[front];
      const timeline = gsap.timeline();
      timelineRef.current = timeline;

      timeline.to(frontElement, {
        y: '+=460',
        duration: config.durDrop,
        ease: config.ease,
      });

      timeline.addLabel('promote', `-=${config.durDrop * config.promoteOverlap}`);
      rest.forEach((idx, index) => {
        const element = elements[idx];
        const slot = makeSlot(index, cardDistance, verticalDistance, total);

        timeline.set(element, { zIndex: slot.zIndex }, 'promote');
        timeline.to(
          element,
          {
            x: slot.x,
            y: slot.y,
            z: slot.z,
            duration: config.durMove,
            ease: config.ease,
          },
          `promote+=${index * 0.12}`,
        );
      });

      const backSlot = makeSlot(total - 1, cardDistance, verticalDistance, total);
      timeline.addLabel('return', `promote+=${config.durMove * config.returnDelay}`);
      timeline.call(
        () => {
          gsap.set(frontElement, { zIndex: backSlot.zIndex });
        },
        undefined,
        'return',
      );
      timeline.to(
        frontElement,
        {
          x: backSlot.x,
          y: backSlot.y,
          z: backSlot.z,
          duration: config.durReturn,
          ease: config.ease,
        },
        'return',
      );
      timeline.call(() => {
        order.current = [...rest, front];
      });
    };

    intervalRef.current = window.setInterval(swap, delay);

    if (!pauseOnHover) {
      return () => {
        clearSwapInterval();
        timelineRef.current?.kill();
        gsap.killTweensOf(elements);
      };
    }

    const container = containerRef.current;
    const pause = () => {
      clearSwapInterval();
      timelineRef.current?.pause();
    };
    const resume = () => {
      timelineRef.current?.play();
      clearSwapInterval();
      intervalRef.current = window.setInterval(swap, delay);
    };

    container?.addEventListener('mouseenter', pause);
    container?.addEventListener('mouseleave', resume);

    return () => {
      container?.removeEventListener('mouseenter', pause);
      container?.removeEventListener('mouseleave', resume);
      clearSwapInterval();
      timelineRef.current?.kill();
      gsap.killTweensOf(elements);
    };
  }, [
    cardDistance,
    config,
    delay,
    pauseOnHover,
    reducedMotion,
    refs,
    skewAmount,
    verticalDistance,
  ]);

  const renderedCards = childArr.map((child, index) => {
    if (!isValidElement<CardProps>(child)) {
      return child;
    }

    const handleClick = (event: MouseEvent<HTMLDivElement>) => {
      child.props.onClick?.(event);
      onCardClick?.(index);
    };
    const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
      child.props.onKeyDown?.(event);

      if (!onCardClick || (event.key !== 'Enter' && event.key !== ' ')) {
        return;
      }

      event.preventDefault();
      onCardClick(index);
    };
    const isInteractive = Boolean(child.props.onClick || onCardClick);

    return cloneElement(child, {
      key: child.key ?? index,
      ref: refs[index],
      role: isInteractive ? 'button' : child.props.role,
      tabIndex: isInteractive ? 0 : child.props.tabIndex,
      style: { width, height, ...(child.props.style ?? {}) } as CSSProperties,
      onClick: isInteractive ? handleClick : child.props.onClick,
      onKeyDown: isInteractive ? handleKeyDown : child.props.onKeyDown,
    } as CardProps & React.RefAttributes<HTMLDivElement>);
  });

  return (
    <div
      ref={containerRef}
      className={[
        'absolute bottom-4 left-1/2 origin-bottom -translate-x-1/2 overflow-visible [perspective:900px]',
        'max-md:scale-[0.9] max-sm:scale-[0.84]',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      style={{ width, height }}
    >
      {renderedCards}
    </div>
  );
}

export default CardSwap;
