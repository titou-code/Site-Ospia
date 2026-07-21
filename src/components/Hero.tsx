"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { TextReveal, GlowButton } from "./motion";

const Diamond3DOrbit = dynamic(() => import("./Diamond3D"), { ssr: false });

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Aurora animated background — very soft blues */}
      <div
        className="absolute inset-0 animate-aurora"
        style={{
          background:
            "linear-gradient(135deg, #FFFFFF 0%, #FAFCFF 20%, #F5F9FE 40%, #F8FAFC 60%, #F7FAFD 80%, #FFFFFF 100%)",
          backgroundSize: "300% 300%",
        }}
      />

      {/* Animated gradient blobs */}
      <motion.div
        className="absolute -top-20 -right-20 w-[500px] h-[500px] rounded-full blur-3xl"
        style={{
          background: "radial-gradient(circle, rgba(58,127,193,0.08) 0%, transparent 70%)",
        }}
        animate={{ scale: [1, 1.15, 1], opacity: [0.5, 0.7, 0.5] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-1/3 -left-32 w-[400px] h-[400px] rounded-full blur-3xl"
        style={{
          background: "radial-gradient(circle, rgba(26,60,94,0.05) 0%, transparent 70%)",
        }}
        animate={{ scale: [1, 1.2, 1], opacity: [0.4, 0.6, 0.4] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-20 right-1/4 w-[350px] h-[350px] rounded-full blur-3xl"
        style={{
          background: "radial-gradient(circle, rgba(11,94,215,0.04) 0%, transparent 70%)",
        }}
        animate={{ scale: [1.1, 1, 1.1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* 3D diamond orbit (Three.js) */}
      <Diamond3DOrbit />

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
          Oxai audite votre entreprise, identifie vos vrais besoins, puis
          construit exactement l&apos;outil dont vous avez besoin — en quelques
          semaines, pour moins cher qu&apos;un ERP standard.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.1, ease: [0.22, 1, 0.36, 1] }}
          className="mt-10 flex flex-col sm:flex-row gap-3 justify-center items-center"
        >
          <GlowButton href="#contact" className="text-sm whitespace-nowrap">
            <span className="inline-flex items-center gap-2">
              Demander mon audit gratuit
              <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
              </svg>
            </span>
          </GlowButton>
          <a
            href="#offres"
            className="inline-flex items-center justify-center rounded-lg border border-navy/20 bg-white/80 backdrop-blur-sm px-6 py-3 text-sm font-semibold text-navy hover:bg-navy/5 transition-all duration-200 cursor-pointer"
          >
            Voir nos offres
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.4 }}
          className="mt-16 flex flex-wrap items-center justify-center gap-4 sm:gap-8 text-sm text-text-muted"
        >
          {["Audit gratuit", "Devis sous 48h", "100% propriétaire"].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 1.5 + i * 0.15 }}
              className="flex items-center gap-2"
            >
              <svg className="w-5 h-5 text-blue-accent" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
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
