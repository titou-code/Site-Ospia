"use client";

import dynamic from "next/dynamic";
import { Reveal, TextReveal } from "./motion";
import Logo from "./Logo";
import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";

const CircuitBackground = dynamic(() => import("./CircuitBackground"), { ssr: false });

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <section id="contact" className="relative py-24 lg:py-32 overflow-hidden" style={{ backgroundColor: "#04081a" }}>
      {/* Circuit network animation background */}
      <CircuitBackground />

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
        <Reveal className="text-center mb-16">
          <Logo variant="dark" className="h-16 w-auto mx-auto mb-8" />
          <h2 className="text-3xl font-bold text-white sm:text-4xl lg:text-5xl tracking-tight">
            <TextReveal text="Prêt à simplifier" className="text-white" />
            {" "}
            <span className="text-blue-accent-dark">
              <TextReveal text="votre quotidien ?" className="text-blue-accent-dark" delay={0.2} />
            </span>
          </h2>
          <p className="mt-4 text-lg text-white/70 max-w-2xl mx-auto">
            Demandez votre audit gratuit. Nous vous rappelons sous 48h pour
            comprendre vos besoins et vous proposer la meilleure solution.
          </p>
        </Reveal>

        <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* Form */}
          <Reveal delay={0.1} className="lg:col-span-3">
            {submitted ? (
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, type: "spring" }}
                className="rounded-2xl bg-white/10 backdrop-blur-sm border border-white/10 p-10 text-center"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                  className="w-16 h-16 rounded-full bg-blue-accent/20 flex items-center justify-center mx-auto mb-4"
                >
                  <svg className="w-8 h-8 text-blue-accent-dark" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                  </svg>
                </motion.div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  Message envoyé !
                </h3>
                <p className="text-white/70">
                  Nous vous recontactons sous 48h.
                </p>
              </motion.div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 p-8"
              >
                <div className="space-y-5">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-white/80 mb-1.5">
                      Nom complet
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      className="w-full rounded-lg bg-white/10 border border-white/10 px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-blue-accent-dark/50 focus:border-transparent transition-all"
                      placeholder="Jean Dupont"
                    />
                  </div>
                  <div>
                    <label htmlFor="company" className="block text-sm font-medium text-white/80 mb-1.5">
                      Entreprise
                    </label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      className="w-full rounded-lg bg-white/10 border border-white/10 px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-blue-accent-dark/50 focus:border-transparent transition-all"
                      placeholder="Nom de votre entreprise"
                    />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-white/80 mb-1.5">
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        className="w-full rounded-lg bg-white/10 border border-white/10 px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-blue-accent-dark/50 focus:border-transparent transition-all"
                        placeholder="jean@entreprise.fr"
                      />
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-white/80 mb-1.5">
                        Téléphone
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        className="w-full rounded-lg bg-white/10 border border-white/10 px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-blue-accent-dark/50 focus:border-transparent transition-all"
                        placeholder="06 12 34 56 78"
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-white/80 mb-1.5">
                      Décrivez votre besoin
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      required
                      className="w-full rounded-lg bg-white/10 border border-white/10 px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-blue-accent-dark/50 focus:border-transparent transition-all resize-none"
                      placeholder="Votre besoin détaillé..."
                    />
                  </div>
                  <button
                    type="submit"
                    className="group relative w-full rounded-lg bg-blue-accent px-8 py-3.5 text-base font-semibold text-white overflow-hidden cursor-pointer"
                  >
                    <span className="absolute -inset-1 bg-gradient-to-r from-blue-accent via-blue-light to-blue-accent opacity-0 group-hover:opacity-30 blur-lg transition-opacity duration-500 animate-glow-pulse" />
                    <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                    <span className="relative">Envoyer ma demande d&apos;audit gratuit</span>
                  </button>
                </div>
              </form>
            )}
          </Reveal>

          {/* Contact info */}
          <Reveal delay={0.2} className="lg:col-span-2 flex flex-col justify-center">
            <div className="space-y-8">
              <motion.div whileHover={{ x: 4 }} transition={{ duration: 0.2 }}>
                <h4 className="text-sm font-semibold text-white/50 uppercase tracking-wider mb-3">
                  Email
                </h4>
                <a
                  href="mailto:contact@oxai.fr"
                  className="text-lg text-white hover:text-blue-accent-dark transition-colors duration-200 cursor-pointer"
                >
                  contact@oxai.fr
                </a>
              </motion.div>
              <motion.div whileHover={{ x: 4 }} transition={{ duration: 0.2 }}>
                <h4 className="text-sm font-semibold text-white/50 uppercase tracking-wider mb-3">
                  Téléphone
                </h4>
                <a
                  href="tel:+33649212365"
                  className="text-lg text-white hover:text-blue-accent-dark transition-colors duration-200 cursor-pointer"
                >
                  +33 6 49 21 23 65
                </a>
              </motion.div>
              <div>
                <h4 className="text-sm font-semibold text-white/50 uppercase tracking-wider mb-3">
                  Réponse garantie
                </h4>
                <p className="text-white/70">
                  Nous nous engageons à vous répondre sous 48 heures. Chaque
                  message est étudié avec attention pour vous proposer une
                  solution réellement adaptée à votre activité.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
      {/* Gradient transition to footer */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-b from-transparent to-[#060e1f] pointer-events-none z-10" />
    </section>
  );
}
