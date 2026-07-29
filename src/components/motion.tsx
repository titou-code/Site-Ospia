"use client";

import {
  motion,
  useInView,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
  type Variants,
} from "framer-motion";
import {
  useRef,
  useEffect,
  useState,
  useCallback,
  Children,
  type ReactNode,
  type MouseEvent as ReactMouseEvent,
} from "react";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1 },
};

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  variant?: "fadeUp" | "fadeIn" | "scaleIn";
}

const variantMap = { fadeUp, fadeIn, scaleIn };

export function Reveal({
  children,
  className = "",
  delay = 0,
  variant = "fadeUp",
}: RevealProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={variantMap[variant]}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

interface StaggerContainerProps {
  children: ReactNode;
  className?: string;
  staggerDelay?: number;
}

export function StaggerContainer({
  children,
  className = "",
  staggerDelay = 0.1,
}: StaggerContainerProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: staggerDelay } },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      variants={fadeUp}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Carrousel mobile à focus : la carte centrée est mise en avant (pleine opacité + ombre),
// les voisines sont réduites, atténuées et légèrement floutées. Points de pagination + flèches
// optionnelles. Desktop (>=768px) : grille inchangée, styles inline effacés, indicateurs masqués.
export function FocusCarousel({
  children,
  className,
  staggerDelay = 0.1,
  arrows = false,
}: {
  children: ReactNode;
  className: string;
  staggerDelay?: number;
  arrows?: boolean;
}) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const scrollerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(wrapRef, { once: true, margin: "-80px" });
  const [active, setActive] = useState(0);
  const count = Children.count(children);

  const update = useCallback(() => {
    const el = scrollerRef.current;
    if (!el) return;
    const items = Array.from(el.children) as HTMLElement[];
    const mobile = window.matchMedia("(max-width: 767px)").matches;
    if (!mobile) {
      items.forEach((it) => {
        const c = it.firstElementChild as HTMLElement | null;
        if (c) {
          c.style.transform = "";
          c.style.opacity = "";
          c.style.filter = "";
          c.style.boxShadow = "";
          c.style.transition = "";
        }
      });
      return;
    }
    const rect = el.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    let best = 0;
    let bestDist = Infinity;
    items.forEach((it, i) => {
      const c = it.firstElementChild as HTMLElement | null;
      if (!c) return;
      const r = it.getBoundingClientRect();
      const d = Math.abs(centerX - (r.left + r.width / 2));
      if (d < bestDist) {
        bestDist = d;
        best = i;
      }
      const ratio = Math.min(d / r.width, 1);
      c.style.transformOrigin = "center center";
      c.style.transform = `scale(${(1 - ratio * 0.12).toFixed(3)})`;
      c.style.opacity = (1 - ratio * 0.5).toFixed(3);
      c.style.boxShadow = `0 24px 48px -18px rgba(26,60,94,${(0.3 * (1 - ratio)).toFixed(3)})`;
      c.style.transition = "transform 0.3s ease-out, opacity 0.3s ease-out, box-shadow 0.3s ease-out";
    });
    setActive(best);
  }, []);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };
    const mq = window.matchMedia("(max-width: 767px)");
    el.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", update);
    mq.addEventListener("change", update);
    update();
    const t = setTimeout(update, 120);
    return () => {
      el.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", update);
      mq.removeEventListener("change", update);
      cancelAnimationFrame(raf);
      clearTimeout(t);
    };
  }, [update]);

  const goTo = (i: number) => {
    const el = scrollerRef.current;
    if (!el) return;
    const child = el.children[i] as HTMLElement | undefined;
    if (child) el.scrollTo({ left: child.offsetLeft - (el.clientWidth - child.offsetWidth) / 2, behavior: "smooth" });
  };

  return (
    <div ref={wrapRef} className="relative">
      <motion.div
        ref={scrollerRef}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={{ hidden: {}, visible: { transition: { staggerChildren: staggerDelay } } }}
        className={className}
      >
        {children}
      </motion.div>

      {arrows && (
        <>
          <button
            type="button"
            aria-label="Carte précédente"
            onClick={() => goTo(Math.max(0, active - 1))}
            className="md:hidden absolute left-0 top-[38%] -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-white/95 shadow-lg border border-border flex items-center justify-center text-navy active:scale-90 transition-transform cursor-pointer"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
            </svg>
          </button>
          <button
            type="button"
            aria-label="Carte suivante"
            onClick={() => goTo(Math.min(count - 1, active + 1))}
            className="md:hidden absolute right-0 top-[38%] -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-white/95 shadow-lg border border-border flex items-center justify-center text-navy active:scale-90 transition-transform cursor-pointer"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
            </svg>
          </button>
        </>
      )}

      {/* Points de pagination (mobile) */}
      <div className="md:hidden flex justify-center items-center gap-2 mt-5">
        {Array.from({ length: count }).map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => goTo(i)}
            aria-label={`Aller à la carte ${i + 1}`}
            className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${i === active ? "w-6 bg-blue-accent" : "w-2 bg-navy/20"}`}
          />
        ))}
      </div>
    </div>
  );
}

// Word-by-word text reveal
export function TextReveal({
  text,
  className = "",
  delay = 0,
}: {
  text: string;
  className?: string;
  delay?: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const words = text.split(" ");

  return (
    <span ref={ref} className={className}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 12, filter: "blur(4px)" }}
          animate={
            isInView
              ? { opacity: 1, y: 0, filter: "blur(0px)" }
              : { opacity: 0, y: 12, filter: "blur(4px)" }
          }
          transition={{
            duration: 0.4,
            delay: delay + i * 0.04,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="inline-block mr-[0.25em]"
        >
          {word}
        </motion.span>
      ))}
    </span>
  );
}

// 3D tilt card
export function TiltCard({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [8, -8]), {
    stiffness: 300,
    damping: 30,
  });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-8, 8]), {
    stiffness: 300,
    damping: 30,
  });

  function handleMouse(e: ReactMouseEvent) {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  }

  function handleLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      ref={ref}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      onMouseMove={handleMouse}
      onMouseLeave={handleLeave}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Animated counter
export function CountUp({
  target,
  suffix = "",
  prefix = "",
  className = "",
  duration = 2,
}: {
  target: number;
  suffix?: string;
  prefix?: string;
  className?: string;
  duration?: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const end = target;
    const step = end / (duration * 60);
    const timer = setInterval(() => {
      start += step;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 1000 / 60);
    return () => clearInterval(timer);
  }, [isInView, target, duration]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {count}
      {suffix}
    </span>
  );
}

// Glow CTA button
export function GlowButton({
  children,
  href,
  className = "",
}: {
  children: ReactNode;
  href: string;
  className?: string;
}) {
  return (
    <a href={href} className={`group relative inline-flex cursor-pointer ${className}`}>
      <span className="relative inline-flex items-center justify-center rounded-lg bg-navy px-6 py-3 text-sm font-semibold text-white overflow-hidden max-sm:w-full">
        <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
        <span className="relative">{children}</span>
      </span>
    </a>
  );
}

export { motion, useScroll, useTransform, useMotionValue, useSpring };
