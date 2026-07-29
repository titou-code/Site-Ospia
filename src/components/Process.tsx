"use client";

import { useRef, useState, useCallback } from "react";
import dynamic from "next/dynamic";
import { motion, useScroll, useTransform, useSpring, useInView, useMotionValueEvent } from "framer-motion";
import { Reveal, TextReveal } from "./motion";

const TimelineDiamond = dynamic(() => import("./TimelineDiamond"), { ssr: false });

const steps = [
  {
    num: "01",
    title: "Audit initial gratuit",
    desc: "Visio de 30 minutes, sans engagement. Nous écoutons, nous comprenons votre métier et vos douleurs.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="m15.75 10.5 4.72-4.72a.75.75 0 0 1 1.28.53v11.38a.75.75 0 0 1-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25h-9A2.25 2.25 0 0 0 2.25 7.5v9a2.25 2.25 0 0 0 2.25 2.25Z" />
      </svg>
    ),
  },
  {
    num: "02",
    title: "Analyse des besoins",
    desc: "Nous cartographions vos processus réels et définissons le périmètre fonctionnel exact.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
      </svg>
    ),
  },
  {
    num: "03",
    title: "Devis détaillé sous 48h",
    desc: "Un chiffrage précis, transparent, sans surprise. Vous savez exactement ce que vous payez.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
      </svg>
    ),
  },
  {
    num: "04",
    title: "Développement & ajustements",
    desc: "Votre solution prend forme en 2 à 4 semaines. Vous suivez l'avancée à chaque étape, testez, et nous ajustons jusqu'à validation finale.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75 22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3-4.5 16.5" />
      </svg>
    ),
  },
  {
    num: "05",
    title: "Déploiement & formation",
    desc: "Une fois validée, votre solution est mise en ligne et votre équipe est formée pour une prise en main immédiate.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5" />
      </svg>
    ),
  },
  {
    num: "06",
    title: "Garantie",
    desc: "3 mois de garantie : tout bug est corrigé gratuitement après la mise en ligne.",
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" strokeWidth={1.5} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
        <path d="m9 12 2 2 4-4" />
      </svg>
    ),
  },
  {
    num: "07",
    title: "Relation long terme",
    desc: "Votre activité évolue, votre outil doit suivre. Nous restons à vos côtés pour le faire évoluer avec vous.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
      </svg>
    ),
  },
];

function TimelineStep({
  step,
  index,
  isActive,
  isActiveMobile,
  dotRef,
  mobileDotRef,
}: {
  step: (typeof steps)[0];
  index: number;
  isActive: boolean;
  isActiveMobile: boolean;
  dotRef: (el: HTMLDivElement | null) => void;
  mobileDotRef: (el: HTMLDivElement | null) => void;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const isEven = index % 2 === 0;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: isEven ? -40 : 40 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
      className={`relative flex flex-col lg:flex-row items-start gap-6 lg:gap-12 max-md:pl-14 ${
        isEven ? "lg:flex-row" : "lg:flex-row-reverse"
      }`}
    >
      <div className={`flex-1 ${isEven ? "lg:text-right" : "lg:text-left"}`}>
        <motion.div
          whileHover={{
            y: -4,
            boxShadow: "0 20px 40px -12px rgba(58, 127, 193, 0.15)",
          }}
          transition={{ duration: 0.15 }}
          className={`bg-white rounded-2xl border border-border p-6 lg:p-8 transition-all duration-300 ${
            isEven ? "lg:ml-auto" : "lg:mr-auto"
          } max-w-lg`}
        >
          <div
            className={`flex items-center gap-3 mb-3 ${
              isEven ? "lg:justify-end" : ""
            }`}
          >
            <div className="w-10 h-10 rounded-xl bg-navy/5 flex items-center justify-center text-navy">
              {step.icon}
            </div>
            <span className="text-xs font-bold text-blue-accent tracking-widest uppercase">
              Étape {step.num}
            </span>
          </div>
          <h3 className="text-lg font-semibold text-navy mb-2">{step.title}</h3>
          <p className="text-text-secondary leading-relaxed">{step.desc}</p>
        </motion.div>
      </div>

      {/* Dot mobile sur la ligne de progression — s'allume/s'éteint selon le trait */}
      <div ref={mobileDotRef} className="md:hidden absolute left-6 -translate-x-1/2 top-7 z-10">
        <motion.div
          initial={{ scale: 0 }}
          animate={isInView ? { scale: 1 } : {}}
          transition={{ duration: 0.4, delay: 0.15, type: "spring", stiffness: 300 }}
          className={`w-4 h-4 rounded-full border-4 border-bg-secondary shadow-sm transition-colors duration-300 ${
            isActiveMobile ? "bg-blue-accent" : "bg-border"
          }`}
          style={isActiveMobile ? { animation: "pulse-glow 2.5s ease-in-out infinite" } : {}}
        />
      </div>

      <div ref={dotRef} className="hidden lg:flex absolute left-1/2 -translate-x-1/2 top-8 z-10">
        <motion.div
          initial={{ scale: 0 }}
          animate={isInView ? { scale: 1 } : {}}
          transition={{
            duration: 0.4,
            delay: 0.3,
            type: "spring",
            stiffness: 300,
          }}
          className={`w-5 h-5 rounded-full border-4 border-white shadow-md transition-colors duration-300 ${
            isActive ? "bg-blue-accent" : "bg-border"
          }`}
          style={
            isActive
              ? { animation: "pulse-glow 2.5s ease-in-out infinite" }
              : {}
          }
        />
      </div>

      <div className="flex-1 hidden lg:block" />
    </motion.div>
  );
}

export default function Process() {
  const containerRef = useRef<HTMLDivElement>(null);
  const dotRefs = useRef<(HTMLDivElement | null)[]>([]);
  const mobileDotRefs = useRef<(HTMLDivElement | null)[]>([]);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.8", "end 0.6"],
  });
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  const [activeIndex, setActiveIndex] = useState(-1);
  const [mobileActiveIndex, setMobileActiveIndex] = useState(-1);

  const setDotRef = useCallback((index: number) => (el: HTMLDivElement | null) => {
    dotRefs.current[index] = el;
  }, []);

  const setMobileDotRef = useCallback((index: number) => (el: HTMLDivElement | null) => {
    mobileDotRefs.current[index] = el;
  }, []);

  useMotionValueEvent(scrollYProgress, "change", () => {
    const container = containerRef.current;
    if (!container) return;

    const containerRect = container.getBoundingClientRect();
    const containerHeight = container.offsetHeight;
    const linePixelHeight = scrollYProgress.get() * containerHeight;

    // Les dots desktop (lg:flex) sont masqués sur mobile et vice-versa (display:none => rect 0),
    // donc chaque calcul n'est significatif qu'à son propre breakpoint.
    const computeActive = (refs: (HTMLDivElement | null)[]) => {
      let newActive = -1;
      for (let i = 0; i < refs.length; i++) {
        const dot = refs[i];
        if (!dot) continue;
        const dotRect = dot.getBoundingClientRect();
        if (dotRect.height === 0 && dotRect.top === 0) continue; // masqué (autre breakpoint)
        const dotOffsetInContainer = dotRect.top - containerRect.top + dotRect.height / 2;
        if (linePixelHeight >= dotOffsetInContainer) {
          newActive = i;
        }
      }
      return newActive;
    };

    setActiveIndex(computeActive(dotRefs.current));
    setMobileActiveIndex(computeActive(mobileDotRefs.current));
  });

  return (
    <section id="process" className="relative pt-0 pb-24 lg:pb-32 max-md:pb-14 bg-bg-secondary">
      <div className="h-32 max-md:h-14 bg-gradient-to-b from-white to-bg-secondary" />
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <Reveal className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-sm font-semibold text-blue-accent tracking-wide uppercase mb-3">
            Notre méthode
          </p>
          <h2 className="text-3xl font-bold text-navy sm:text-4xl lg:text-5xl tracking-tight">
            <TextReveal text="De l'audit au déploiement," />
            <br />
            <span className="text-blue-accent">
              <TextReveal text="en toute transparence" delay={0.3} />
            </span>
          </h2>
        </Reveal>

        <div className="relative" ref={containerRef}>
          <div className="absolute left-6 lg:left-1/2 top-0 bottom-0 w-px bg-border" />
          <motion.div
            className="absolute left-6 lg:left-1/2 top-0 w-px bg-gradient-to-b from-blue-accent/80 to-blue-light/85 origin-top"
            style={{ height: lineHeight }}
          />

          {/* Diamant 3D au bout de la ligne */}
          <motion.div
            className="absolute max-md:left-6 md:left-1/2 pointer-events-none"
            style={{
              transform: "translateX(-50%)",
              width: 28,
              height: 34,
              top: useTransform(
                useSpring(
                  useTransform(scrollYProgress, (v) => {
                    const container = containerRef.current;
                    if (!container) return -17;
                    return v * container.offsetHeight - 17;
                  }),
                  { stiffness: 400, damping: 35, mass: 0.5 }
                ),
                (v) => `${v}px`
              ),
              opacity: useTransform(scrollYProgress, [0, 0.03, 0.95, 1], [0, 1, 1, 0]),
            }}
          >
            <TimelineDiamond />
          </motion.div>

          <div className="space-y-8 lg:space-y-12">
            {steps.map((step, i) => (
              <TimelineStep
                key={i}
                step={step}
                index={i}
                isActive={i <= activeIndex}
                isActiveMobile={i <= mobileActiveIndex}
                dotRef={setDotRef(i)}
                mobileDotRef={setMobileDotRef(i)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
