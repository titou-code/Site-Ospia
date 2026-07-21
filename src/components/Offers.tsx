"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Reveal, StaggerContainer, StaggerItem } from "./motion";

const offers = [
  {
    name: "Oxai Field",
    tagline: "L'assistant numérique pour les professionnels du terrain",
    targets: "Artisans BTP, paysagistes, techniciens SAV, prestataires terrain",
    problems: [
      "Comptes-rendus et devis chronophages",
      "Suivi de chantier désorganisé",
      "Planning et relances de paiement manuels",
      "Dossiers d'intervention éparpillés",
    ],
    accent: "from-blue-accent to-blue-deep",
  },
  {
    name: "Oxai Conformité+",
    tagline: "Zéro amende, zéro oubli réglementaire",
    targets:
      "Restauration, BTP, logistique, commerce, santé, industrie — toute entreprise soumise à obligations légales",
    problems: [
      "Échéances réglementaires oubliées",
      "Documents de conformité éparpillés",
      "Habilitations expirées sans alerte",
      "Aucune visibilité sur la conformité globale",
    ],
    accent: "from-navy to-blue-accent",
  },
  {
    name: "Oxai Automation",
    tagline: "Le pilotage sur-mesure de toutes vos opérations",
    targets: "PME industrielles, négoce, logistique, multi-activités",
    problems: [
      "Production, stocks et marges sur Excel",
      "Gestion commerciale non centralisée",
      "Aucun dashboard en temps réel",
      "Des tâches répétitives gérées à la main",
    ],
    accent: "from-blue-deep to-blue-light",
    featured: true,
  },
];

const popupData: Record<string, { preamble?: string; intro: string; examples: { title: string; desc: string }[]; closing: string }> = {
  "Oxai Field": {
    intro: "Concrètement, voici quelques exemples de ce qu'une solution comme celle-ci peut inclure :",
    examples: [
      { title: "Comptes-rendus automatiques", desc: "Après chaque intervention, un CR structuré est généré et envoyé au client à partir des informations saisies sur le terrain." },
      { title: "Devis & facturation", desc: "Création de devis en quelques clics, conversion automatique en facture, suivi du paiement." },
      { title: "Signature électronique", desc: "Le client signe directement sur tablette ou téléphone, PDF envoyé automatiquement." },
      { title: "Suivi de chantier & planning", desc: "Vue d'ensemble sur tous les chantiers en cours, avancement, équipes, photos avant/après." },
      { title: "Messages automatiques clients", desc: "Confirmations de passage, rappels de RDV, notifications d'avancement envoyés automatiquement." },
      { title: "Portail client", desc: "Accès sécurisé pour suivre l'intervention en direct et consulter les documents." },
    ],
    closing: "Chaque solution est entièrement façonnée après l'audit — ceci n'est qu'un aperçu de ce qui est possible, pas une liste figée.",
  },
  "Oxai Conformité+": {
    intro: "Concrètement, voici quelques exemples de ce qu'une solution comme celle-ci peut inclure :",
    examples: [
      { title: "Sécurité incendie", desc: "Suivi des extincteurs, alarmes, alertes automatiques avant chaque échéance." },
      { title: "DUERP & documents obligatoires", desc: "Création guidée et génération automatique, mise à jour annuelle rappelée." },
      { title: "Habilitations & formations", desc: "Suivi individuel par collaborateur, alerte avant expiration." },
      { title: "Contrôles périodiques", desc: "Suivi de toutes les vérifications obligatoires (électricité, ascenseurs, chauffage, etc.)." },
      { title: "Score de conformité", desc: "Indicateur visuel du niveau de conformité global en temps réel." },
      { title: "Export pour audits", desc: "Rapports exportables en un clic pour toute inspection." },
    ],
    closing: "Chaque solution est entièrement façonnée après l'audit — ceci n'est qu'un aperçu de ce qui est possible, pas une liste figée.",
  },
  "Oxai Automation": {
    preamble: "Ce n'est pas un CRM ni un ERP générique. C'est un logiciel de pilotage construit autour de votre métier et de vos process spécifiques.",
    intro: "Concrètement, voici quelques exemples de ce qu'une solution comme celle-ci peut inclure :",
    examples: [
      { title: "Pilotage de production", desc: "Suivi des étapes, calcul des stocks en temps réel, traçabilité complète." },
      { title: "CRM & gestion commerciale", desc: "Fiche client centralisée, pipeline de vente visuel, suivi des opportunités." },
      { title: "Génération de devis automatique", desc: "Un formulaire simple génère un devis personnalisé, envoyé en quelques clics." },
      { title: "Relances automatiques", desc: "Devis non signé, facture impayée, prospect inactif : relances déclenchées automatiquement." },
      { title: "Dashboard de pilotage unifié", desc: "Vue globale en temps réel : CA, marges, stocks, équipes, sur un seul écran." },
      { title: "Rapports automatiques", desc: "Synthèses hebdomadaires ou mensuelles envoyées automatiquement au dirigeant." },
    ],
    closing: "Chaque solution est entièrement façonnée après l'audit — ceci n'est qu'un aperçu de ce qui est possible, pas une liste figée.",
  },
};

export default function Offers() {
  const [activePopup, setActivePopup] = useState<string | null>(null);

  useEffect(() => {
    if (!activePopup) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActivePopup(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [activePopup]);

  return (
    <section id="offres" className="relative pt-0 pb-24 lg:pb-32 bg-bg-primary">
      {/* Gradient transition from bg-secondary to bg-primary */}
      <div className="h-32 bg-gradient-to-b from-bg-secondary to-bg-primary" />

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <Reveal className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-sm font-semibold text-blue-accent tracking-wide uppercase mb-3">
            Nos offres
          </p>
          <h2 className="text-3xl font-bold text-navy sm:text-4xl lg:text-5xl tracking-tight">
            Des solutions pensées pour{" "}
            <span className="text-blue-accent">votre réalité</span>
          </h2>
          <p className="mt-4 text-lg text-text-secondary">
            Pas un logiciel de plus. Un outil construit autour de vos vrais
            processus métier.
          </p>
        </Reveal>

        <StaggerContainer
          className="grid grid-cols-1 lg:grid-cols-3 gap-8"
          staggerDelay={0.12}
        >
          {offers.map((offer, i) => (
            <StaggerItem key={i}>
              <div
                className={`group relative flex flex-col rounded-2xl border bg-white overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-navy/10 cursor-default h-full ${
                  offer.featured
                    ? "border-blue-accent/30 shadow-lg shadow-blue-accent/5"
                    : "border-border hover:border-blue-accent/20"
                }`}
              >
                {/* Animated top gradient bar */}
                <div className={`h-1.5 bg-gradient-to-r ${offer.accent} relative overflow-hidden`}>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
                </div>

                {/* "En savoir +" detail button */}
                <button
                  onClick={() => setActivePopup(offer.name)}
                  className="absolute top-4 right-4 z-10 px-3 py-1 rounded-full bg-navy/5 hover:bg-blue-accent/15 text-xs font-medium text-navy/50 hover:text-blue-accent transition-all duration-200 cursor-pointer"
                  aria-label={`Voir le détail de ${offer.name}`}
                >
                  En savoir +
                </button>

                <div className="p-8 flex flex-col flex-1">
                  <div className="mb-4">
                    <h3 className="text-xl font-bold text-navy">{offer.name}</h3>
                    <p className="text-blue-accent font-medium text-sm mt-1">
                      {offer.tagline}
                    </p>
                  </div>

                  <p className="text-sm text-text-muted mb-6">
                    <span className="font-medium text-text-secondary">Cible :</span>{" "}
                    {offer.targets}
                  </p>

                  <div className="mb-8 flex-1">
                    <p className="text-xs font-semibold text-text-secondary uppercase tracking-wider mb-3">
                      Problèmes résolus
                    </p>
                    <ul className="space-y-2.5">
                      {offer.problems.map((problem, j) => (
                        <li key={j} className="flex items-start gap-3 text-sm text-text-secondary">
                          <svg
                            className="w-5 h-5 text-blue-accent flex-shrink-0 mt-0.5"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={2}
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="m4.5 12.75 6 6 9-13.5"
                            />
                          </svg>
                          {problem}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <a
                    href="#contact"
                    className="group/btn relative inline-flex items-center justify-center rounded-lg bg-navy px-6 py-3 text-sm font-semibold text-white overflow-hidden cursor-pointer w-full"
                  >
                    <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700" />
                    <span className="relative">Demander un audit pour ce besoin</span>
                  </a>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* 4 guarantees — no animations */}
        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-16 max-w-6xl mx-auto" staggerDelay={0.1}>
          {[
            {
              icon: (
                <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>
              ),
              title: "Audit gratuit & sans engagement",
              desc: "Vous ne payez rien tant que vous n'avez pas validé le devis.",
            },
            {
              icon: (
                <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>
              ),
              title: "Devis sous 48h",
              desc: "Un chiffrage détaillé et transparent, sans attente interminable.",
            },
            {
              icon: (
                <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
                </svg>
              ),
              title: "Propriété 100%",
              desc: "Le logiciel vous appartient. Pas de lock-in, pas de dépendance.",
            },
            {
              icon: (
                <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                </svg>
              ),
              title: "Solutions sur-mesure",
              desc: "Pour les besoins qu'aucun logiciel du marché ne couvre.",
            },
          ].map((g, i) => (
            <StaggerItem key={i}>
              <div className="text-center p-6">
                <div className="w-14 h-14 rounded-2xl bg-blue-accent/10 flex items-center justify-center text-blue-accent mx-auto mb-4">
                  {g.icon}
                </div>
                <h4 className="font-semibold text-navy mb-1">{g.title}</h4>
                <p className="text-sm text-text-secondary">{g.desc}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>

      {/* Popup modal */}
      <AnimatePresence>
        {activePopup && popupData[activePopup] && (() => {
          const data = popupData[activePopup];
          let staggerIndex = 0;
          const staggerItem = () => {
            const i = staggerIndex++;
            return {
              initial: { opacity: 0, y: 12 },
              animate: { opacity: 1, y: 0 },
              transition: { duration: 0.35, delay: 0.15 + i * 0.06, ease: [0.22, 1, 0.36, 1] },
            };
          };
          return (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
              onClick={() => setActivePopup(null)}
            >
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="absolute inset-0 bg-navy/60 backdrop-blur-sm"
              />
              <motion.div
                initial={{ scale: 0.92, opacity: 0, y: 24 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.96, opacity: 0 }}
                transition={{
                  enter: { type: "spring", damping: 22, stiffness: 280 },
                  exit: { duration: 0.15, ease: "easeOut" },
                  type: "spring", damping: 22, stiffness: 280,
                }}
                role="dialog"
                aria-modal="true"
                aria-label={activePopup}
                className="relative bg-white rounded-2xl border border-border shadow-2xl max-w-2xl w-full max-h-[85vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="sticky top-0 bg-white/95 backdrop-blur-sm border-b border-border/50 px-8 py-5 flex items-center justify-between rounded-t-2xl z-10">
                  <motion.h3 {...staggerItem()} className="text-xl font-bold text-navy">{activePopup}</motion.h3>
                  <button
                    onClick={() => setActivePopup(null)}
                    autoFocus
                    aria-label="Fermer"
                    className="w-8 h-8 rounded-full bg-navy/5 hover:bg-navy/10 flex items-center justify-center text-navy/50 hover:text-navy transition-colors duration-200 cursor-pointer"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                <div className="px-8 py-6 space-y-6">
                  {data.preamble && (
                    <motion.p {...staggerItem()} className="text-text-secondary font-medium leading-relaxed">
                      {data.preamble}
                    </motion.p>
                  )}

                  <motion.p {...staggerItem()} className="text-sm text-text-muted italic">
                    {data.intro}
                  </motion.p>

                  <div className="space-y-4">
                    {data.examples.map((ex, i) => (
                      <motion.div key={i} {...staggerItem()} className="flex items-start gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-accent mt-2 flex-shrink-0" />
                        <div>
                          <span className="font-semibold text-navy">{ex.title}</span>
                          <span className="text-text-secondary"> — {ex.desc}</span>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  <motion.p {...staggerItem()} className="text-sm text-text-muted italic border-t border-border/50 pt-5">
                    {data.closing}
                  </motion.p>
                </div>
              </motion.div>
            </motion.div>
          );
        })()}
      </AnimatePresence>
    </section>
  );
}
