"use client";

import { Reveal, StaggerContainer, StaggerItem } from "./motion";

const stats = [
  { value: "4 semaines", label: "De la première visio à la mise en production" },
  { value: "2-3x", label: "Moins cher qu'un ERP générique" },
  { value: "100%", label: "Des besoins métier couverts" },
];

export default function CaseStudy() {
  return (
    <section id="cas-client" className="py-24 lg:py-32 bg-bg-primary">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <Reveal className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-sm font-semibold text-blue-accent tracking-wide uppercase mb-3">
            Cas client
          </p>
          <h2 className="text-3xl font-bold text-navy sm:text-4xl lg:text-5xl tracking-tight">
            Recycle Logistique
          </h2>
        </Reveal>

        <div className="max-w-5xl mx-auto">
          <Reveal>
            <div className="rounded-2xl border border-border bg-white overflow-hidden">
              <div className="h-2 bg-gradient-to-r from-navy via-blue-accent to-blue-light" />
              <div className="p-8 lg:p-12">
                <div className="flex flex-col lg:flex-row gap-10">
                  {/* Story */}
                  <div className="flex-1">
                    <div className="inline-flex items-center rounded-full bg-navy/5 px-4 py-1.5 text-sm font-medium text-navy mb-6">
                      PME industrielle — Broyage de plastiques
                    </div>
                    <h3 className="text-xl font-bold text-navy mb-4">
                      Une application de pilotage construite de A à Z
                    </h3>
                    <div className="space-y-4 text-text-secondary leading-relaxed">
                      <p>
                        Recycle Logistique, PME spécialisée dans le broyage et le
                        recyclage de plastiques industriels, gérait sa production,
                        ses stocks et ses expéditions sur des tableurs Excel
                        dispersés.
                      </p>
                      <p>
                        En 4 semaines, Ospia a conçu et déployé une application
                        complète de pilotage de production et de gestion des
                        stocks — là où un ERP générique aurait coûté 2 à 3 fois
                        plus cher, avec des fonctionnalités inutiles et des mois
                        de paramétrage.
                      </p>
                      <p>
                        Résultat : une solution taillée pour leur métier, adoptée
                        immédiatement par les équipes, évolutive au fil de la
                        croissance.
                      </p>
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="lg:w-72 flex-shrink-0">
                    <StaggerContainer className="space-y-6" staggerDelay={0.15}>
                      {stats.map((stat, i) => (
                        <StaggerItem key={i}>
                          <div className="rounded-xl bg-bg-secondary border border-border p-6 text-center">
                            <p className="text-3xl font-extrabold text-navy mb-1">
                              {stat.value}
                            </p>
                            <p className="text-sm text-text-secondary">
                              {stat.label}
                            </p>
                          </div>
                        </StaggerItem>
                      ))}
                    </StaggerContainer>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
