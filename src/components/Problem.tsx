"use client";

import { Reveal, StaggerContainer, StaggerItem, TextReveal } from "./motion";

const problems = [
  {
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.375 19.5h17.25m-17.25 0a1.125 1.125 0 0 1-1.125-1.125M3.375 19.5h7.5c.621 0 1.125-.504 1.125-1.125m-9.75 0V5.625m0 12.75v-1.5c0-.621.504-1.125 1.125-1.125m18.375 2.625V5.625m0 12.75c0 .621-.504 1.125-1.125 1.125m1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125m0 3.75h-7.5A1.125 1.125 0 0 1 12 18.375m9.75-12.75c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125m19.5 0v1.5c0 .621-.504 1.125-1.125 1.125M2.25 5.625v1.5c0 .621.504 1.125 1.125 1.125m0 0h17.25m-17.25 0h7.5c.621 0 1.125.504 1.125 1.125M3.375 8.25c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125m17.25-3.75h-7.5c-.621 0-1.125.504-1.125 1.125m8.625-1.125c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125m-17.25 0h7.5m-7.5 0c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125M12 10.875v-1.5m0 1.5c0 .621-.504 1.125-1.125 1.125M12 10.875c0 .621.504 1.125 1.125 1.125m-2.25 0c.621 0 1.125.504 1.125 1.125M13.125 12h7.5m-7.5 0c-.621 0-1.125.504-1.125 1.125M20.625 12c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125m-17.25 0h7.5M12 14.625v-1.5m0 1.5c0 .621-.504 1.125-1.125 1.125M12 14.625c0 .621.504 1.125 1.125 1.125m-2.25 0c.621 0 1.125.504 1.125 1.125m0 0v1.5c0 .621-.504 1.125-1.125 1.125" />
      </svg>
    ),
    title: "Excel partout, fiabilité nulle part",
    desc: "Vos données critiques vivent dans des fichiers dispersés, sans synchronisation, avec des erreurs de saisie à chaque étape.",
  },
  {
    icon: (
      <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" strokeWidth={1.5} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <path d="M10 4v4" />
        <path d="M2 8h20" />
        <path d="M6 4v4" />
      </svg>
    ),
    title: "Des logiciels faits pour tout le monde",
    desc: "Vous payez pour 200 fonctionnalités dont vous n'utilisez que 15. Et les 3 dont vous avez vraiment besoin n'existent pas.",
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
      </svg>
    ),
    title: "Des heures perdues en administratif",
    desc: "Ressaisir les mêmes infos dans 3 outils différents, relancer manuellement, vérifier chaque ligne — ce n'est pas votre métier.",
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 18.364A9 9 0 0 0 5.636 5.636m12.728 12.728A9 9 0 0 1 5.636 5.636m12.728 12.728L5.636 5.636" />
      </svg>
    ),
    title: "Pas de visibilité en temps réel",
    desc: "Impossible de savoir où en sont vos chantiers, vos stocks ou vos marges sans appeler 3 personnes et recouper 5 fichiers.",
  },
];

export default function Problem() {
  return (
    <section id="constat" className="py-24 lg:py-32 bg-bg-primary">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <Reveal className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-sm font-semibold text-blue-accent tracking-wide uppercase mb-3">
            Le constat
          </p>
          <h2 className="text-3xl font-bold text-navy sm:text-4xl lg:text-5xl tracking-tight">
            <TextReveal text="Vous méritez mieux que des outils" />
            {" "}
            <span className="text-blue-accent">
              <TextReveal text="qui ne vous ressemblent pas" delay={0.4} />
            </span>
          </h2>
          <p className="mt-4 text-lg text-text-secondary">
            La plupart des PME gèrent leur activité avec des outils inadaptés.
            Le résultat : du temps perdu, des erreurs, et de la frustration.
          </p>
        </Reveal>

        <StaggerContainer className="flex md:grid overflow-x-auto md:overflow-visible max-md:snap-x max-md:snap-mandatory no-scrollbar max-md:-mx-6 max-md:px-6 max-md:pb-4 md:grid-cols-2 gap-6 lg:gap-8" staggerDelay={0.12}>
          {problems.map((p, i) => (
            <StaggerItem key={i} className="h-full max-md:w-[82%] max-md:shrink-0 max-md:snap-center">
              <div className="group relative rounded-2xl border border-border bg-white p-8 hover:border-blue-accent/30 hover:shadow-xl hover:shadow-blue-accent/10 transition-all duration-300 cursor-default h-full">
                <div className="flex items-start gap-5">
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-navy/5 flex items-center justify-center text-navy group-hover:bg-blue-accent/10 group-hover:text-blue-accent transition-colors duration-300">
                    {p.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-navy mb-2">{p.title}</h3>
                    <p className="text-text-secondary leading-relaxed text-justify">{p.desc}</p>
                  </div>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
