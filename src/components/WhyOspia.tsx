"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Reveal, TextReveal } from "./motion";

const points = [
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
      </svg>
    ),
    title: "Tout part d'un audit",
    desc: "Pas d'une grille tarifaire. Nous commençons par comprendre, pas par vendre.",
  },
  {
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" strokeWidth={1.5} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 10a2 2 0 0 0-2 2c0 1.02-.1 2.51-.26 4" />
        <path d="M14 13.12c0 2.38 0 6.38-1 8.88" />
        <path d="M17.29 21.02c.12-.6.43-2.3.5-3.02" />
        <path d="M2 12a10 10 0 0 1 18-6" />
        <path d="M2 16h.01" />
        <path d="M21.8 16c.2-2 .131-5.354 0-6" />
        <path d="M5 19.5C5.5 18 6 15 6 12a6 6 0 0 1 .34-2" />
        <path d="M8.65 22c.21-.66.45-1.32.57-2" />
        <path d="M9 6.8a6 6 0 0 1 9 5.2v2" />
      </svg>
    ),
    title: "Zéro solution générique",
    desc: "Chaque outil est configuré pour le métier du client. Pas de compromis.",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z" />
      </svg>
    ),
    title: "Vous payez ce dont vous avez besoin",
    desc: "Pas de fonctionnalités superflues. Juste celles qui comptent.",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z" />
      </svg>
    ),
    title: "Délais courts",
    desc: "2 à 4 semaines vs 3 à 6 mois en développement classique.",
  },
  {
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" strokeWidth={1.5} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </svg>
    ),
    title: "Un interlocuteur, pas une agence",
    desc: "Vous échangez directement avec la personne qui conçoit votre solution. Pas de chef de projet, pas d'allers-retours sans fin.",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
      </svg>
    ),
    title: "Relation long terme",
    desc: "Support continu et accompagnement dans la durée. Nous restons disponibles pour faire évoluer votre outil avec votre activité.",
  },
];

function CascadeGrid({ children }: { children: React.ReactNode[] }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: 0.1 } },
      }}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
    >
      {children}
    </motion.div>
  );
}

export default function WhyOspia() {
  return (
    <section id="pourquoi" className="relative pt-0 pb-24 lg:pb-32 bg-bg-secondary overflow-hidden">
      <div className="h-32 bg-gradient-to-b from-bg-secondary to-bg-secondary" />

      {/* Background floating shapes */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <svg viewBox="0 0 52 66" className="absolute top-[20%] right-[5%] w-24 h-28 opacity-[0.04] animate-float-2 hidden lg:block">
          <polygon points="26,2 0,34 26,34" fill="#1A3C5E" />
          <polygon points="26,2 26,34 52,34" fill="#3A7FC1" />
          <polygon points="0,34 26,66 26,34" fill="#0B5ED7" />
          <polygon points="26,34 26,66 52,34" fill="#4FA8F5" />
        </svg>
        <svg viewBox="0 0 52 66" className="absolute bottom-[15%] left-[3%] w-16 h-20 opacity-[0.03] animate-float-3 hidden lg:block">
          <polygon points="26,2 0,34 26,34" fill="#1A3C5E" />
          <polygon points="26,2 26,34 52,34" fill="#3A7FC1" />
          <polygon points="0,34 26,66 26,34" fill="#0B5ED7" />
          <polygon points="26,34 26,66 52,34" fill="#4FA8F5" />
        </svg>
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
        <Reveal className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-sm font-semibold text-blue-accent tracking-wide uppercase mb-3">
            Pourquoi Ospia
          </p>
          <h2 className="text-3xl font-bold text-navy sm:text-4xl lg:text-5xl tracking-tight">
            <TextReveal text="Ce qui nous" />
            {" "}
            <span className="text-blue-accent">
              <TextReveal text="rend différents" delay={0.2} />
            </span>
          </h2>
        </Reveal>

        <CascadeGrid>
          {points.map((p, i) => (
            <motion.div
              key={i}
              variants={{
                hidden: { opacity: 0, y: 40, scale: 0.95 },
                visible: { opacity: 1, y: 0, scale: 1 },
              }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="group rounded-2xl border border-border bg-white p-8 hover:border-blue-accent/30 hover:shadow-xl hover:shadow-blue-accent/10 transition-all duration-300 cursor-default h-full">
                <div className="w-12 h-12 rounded-xl bg-navy/5 flex items-center justify-center text-navy mb-5 group-hover:bg-blue-accent/10 group-hover:text-blue-accent transition-colors duration-300">
                  {p.icon}
                </div>
                <h3 className="text-lg font-semibold text-navy mb-2">{p.title}</h3>
                <p className="text-text-secondary leading-relaxed">{p.desc}</p>
              </div>
            </motion.div>
          ))}
        </CascadeGrid>
      </div>
    </section>
  );
}
