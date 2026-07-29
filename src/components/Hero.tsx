"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { TextReveal, GlowButton } from "./motion";

export default function Hero() {
  const [useVideo, setUseVideo] = useState(false);

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isDesktop = window.innerWidth >= 768;
    // Charger la vidéo (4,8 Mo) uniquement sur desktop et si l'utilisateur n'a pas réduit les animations
    if (isDesktop && !prefersReduced) setUseVideo(true);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Image poster — affichée immédiatement, et seule sur mobile / reduced-motion */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/hero-poster.jpg"
        alt=""
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Vidéo de fond réelle (desktop, animations autorisées) */}
      {useVideo && (
        <video
          autoPlay
          muted
          loop
          playsInline
          poster="/hero-poster.jpg"
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/hero-video.mp4" type="video/mp4" />
        </video>
      )}

      {/* Voile clair par-dessus la vidéo — garde le texte navy parfaitement lisible */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(255,255,255,0.72) 0%, rgba(250,252,255,0.62) 45%, rgba(245,249,254,0.45) 100%)",
        }}
      />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-7xl px-6 pt-32 pb-20 lg:px-8 lg:pt-40 lg:pb-32 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="mb-6"
        >
          <span className="inline-flex items-center gap-2 rounded-full bg-navy/5 border border-navy/10 px-4 py-1.5 text-sm font-medium text-navy">
            <span className="w-2 h-2 rounded-full bg-blue-accent animate-pulse-glow" />
            Applications métier sur-mesure & IA
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          className="text-4xl font-extrabold tracking-tight text-navy sm:text-5xl lg:text-6xl xl:text-7xl leading-[1.1]"
          style={{ textShadow: "0 0 24px rgba(255,255,255,0.8)" }}
        >
          <TextReveal text="Construit pour vous." delay={0.25} />
          <br />
          <span className="text-blue-accent">
            <TextReveal text="Pas pour tout le monde." delay={0.55} />
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="mt-6 mx-auto max-w-2xl text-lg text-text-secondary leading-relaxed sm:text-xl"
        >
          Ospia audite votre entreprise, identifie vos vrais besoins, puis
          construit exactement l&apos;outil dont vous avez besoin — en quelques
          semaines, pour moins cher qu&apos;un ERP standard.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.1, ease: [0.22, 1, 0.36, 1] }}
          className="mt-10 flex flex-col sm:flex-row gap-3 justify-center items-center"
        >
          <GlowButton href="#contact" className="text-sm whitespace-nowrap max-sm:w-full">
            <span className="inline-flex items-center gap-2">
              Demander mon audit gratuit
              <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
              </svg>
            </span>
          </GlowButton>
          <a
            href="#offres"
            className="inline-flex items-center justify-center rounded-lg border border-navy/20 bg-white/80 backdrop-blur-sm px-6 py-3 text-sm font-semibold text-navy hover:bg-navy/5 transition-all duration-200 cursor-pointer max-sm:w-full"
          >
            Voir nos offres
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.4 }}
          className="mt-16 flex flex-wrap items-center justify-center gap-4 sm:gap-8 text-base font-semibold text-navy"
        >
          {["Audit gratuit", "Devis sous 48h", "100% propriétaire"].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 1.5 + i * 0.15 }}
              className="flex items-center gap-2"
            >
              <svg className="w-6 h-6 text-blue-accent" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
              </svg>
              {item}
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-bg-primary to-transparent" />
    </section>
  );
}
