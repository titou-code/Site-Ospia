"use client";

import { Reveal, StaggerContainer, StaggerItem } from "./motion";

const guarantees = [
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
];

export default function Pricing() {
  return (
    <section id="tarifs" className="py-24 lg:py-32 bg-bg-secondary">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <Reveal className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-sm font-semibold text-blue-accent tracking-wide uppercase mb-3">
            Modèle économique
          </p>
          <h2 className="text-3xl font-bold text-navy sm:text-4xl lg:text-5xl tracking-tight">
            Un modèle{" "}
            <span className="text-blue-accent">simple et transparent</span>
          </h2>
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto mb-16">
          <Reveal delay={0.1}>
            <div className="rounded-2xl border border-border bg-white p-8 lg:p-10 h-full">
              <div className="w-12 h-12 rounded-xl bg-navy/5 flex items-center justify-center text-navy mb-6">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-navy mb-2">Développement</h3>
              <p className="text-sm text-text-muted mb-4">Paiement unique après validation du devis</p>
              <p className="text-4xl font-extrabold text-navy">
                3 000 € <span className="text-lg font-medium text-text-muted">à</span> 10 000 €{" "}
                <span className="text-base font-medium text-text-muted">HT</span>
              </p>
              <p className="mt-4 text-text-secondary leading-relaxed">
                Selon la complexité du projet. Vous êtes propriétaire à 100% du
                code source et de la solution livrée.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="rounded-2xl border border-blue-accent/20 bg-white p-8 lg:p-10 shadow-lg shadow-blue-accent/5 h-full">
              <div className="w-12 h-12 rounded-xl bg-blue-accent/10 flex items-center justify-center text-blue-accent mb-6">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-navy mb-2">Abonnement mensuel</h3>
              <p className="text-sm text-text-muted mb-4">Hébergement, maintenance & support</p>
              <p className="text-4xl font-extrabold text-navy">
                99 € <span className="text-lg font-medium text-text-muted">à</span> 299 €{" "}
                <span className="text-base font-medium text-text-muted">HT/mois</span>
              </p>
              <ul className="mt-4 space-y-2">
                {[
                  "Hébergement cloud sécurisé en France",
                  "Maintenance corrective incluse",
                  "Support avec réponse garantie sous 48h",
                  "Évolutions mineures incluses (1-2h/mois)",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm text-text-secondary">
                    <svg className="w-4 h-4 text-blue-accent flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>

        {/* Guarantees */}
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto" staggerDelay={0.1}>
          {guarantees.map((g, i) => (
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
    </section>
  );
}
