import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Politique de confidentialité",
  description: "Politique de confidentialité et protection des données personnelles du site Ospia.",
  alternates: { canonical: "/politique-de-confidentialite/" },
};

export default function PolitiqueDeConfidentialite() {
  return (
    <>
      <Navbar />
      <main className="pt-32 pb-24 bg-bg-primary">
        <div className="mx-auto max-w-3xl px-6 lg:px-8">
          <a
            href="/"
            className="inline-flex items-center gap-2 text-sm text-blue-accent hover:text-blue-accent-dark transition-colors duration-200 mb-8"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
            </svg>
            Retour au site
          </a>
          <h1 className="text-3xl font-bold text-navy mb-12 sm:text-4xl">
            Politique de confidentialité
          </h1>

          <div className="space-y-10 text-text-secondary leading-relaxed">
            <section>
              <h2 className="text-xl font-semibold text-navy mb-3">
                Responsable du traitement
              </h2>
              <p>
                Le responsable du traitement des données collectées sur ce site
                est Titouan Chinchole, éditeur du site ospia.fr, joignable à
                l&apos;adresse{" "}
                <a
                  href="mailto:contact@ospia.fr"
                  className="text-blue-accent hover:underline"
                >
                  contact@ospia.fr
                </a>
                .
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-navy mb-3">
                Données collectées
              </h2>
              <p>
                Lorsque vous remplissez le formulaire de contact, nous
                collectons les informations suivantes : nom complet, nom de
                votre entreprise, adresse email, numéro de téléphone et
                description de votre besoin. Ces données sont nécessaires pour
                répondre à votre demande et, le cas échéant, vous proposer un
                audit ou un devis.
              </p>
              <p className="mt-3">
                La base légale de ce traitement est l&apos;exécution de mesures
                précontractuelles prises à votre demande (article 6.1.b du
                RGPD).
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-navy mb-3">
                Durée de conservation
              </h2>
              <p>
                Vos données sont conservées pendant 3 ans à compter de notre
                dernier échange, puis supprimées.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-navy mb-3">
                Destinataires et sous-traitants
              </h2>
              <p>
                Vos données sont traitées uniquement par l&apos;éditeur du site.
                Elles ne sont ni vendues, ni cédées, ni transmises à des tiers à
                des fins commerciales.
              </p>
              <p className="mt-3">
                Le formulaire de contact est opéré par notre hébergeur Netlify,
                Inc. (États-Unis), qui stocke les soumissions pour nous les
                transmettre. Netlify adhère au Data Privacy Framework
                UE–États-Unis, qui encadre ce transfert conformément au RGPD.
                Vous pouvez consulter sa politique de confidentialité à
                l&apos;adresse{" "}
                <a
                  href="https://www.netlify.com/privacy/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-accent hover:underline"
                >
                  https://www.netlify.com/privacy/
                </a>
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-navy mb-3">Cookies</h2>
              <p>
                Ce site ne dépose aucun cookie et n&apos;utilise aucun outil de
                mesure d&apos;audience ni de suivi publicitaire. Aucun bandeau
                de consentement n&apos;est donc nécessaire.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-navy mb-3">
                Vos droits
              </h2>
              <p>
                Conformément au Règlement Général sur la Protection des Données
                (RGPD) et à la loi Informatique et Libertés, vous disposez
                d&apos;un droit d&apos;accès, de rectification,
                d&apos;effacement, de limitation, d&apos;opposition et de
                portabilité de vos données. Pour exercer ces droits,
                écrivez-nous à{" "}
                <a
                  href="mailto:contact@ospia.fr"
                  className="text-blue-accent hover:underline"
                >
                  contact@ospia.fr
                </a>
                . Nous vous répondons sous un mois.
              </p>
              <p className="mt-3">
                Si vous estimez que vos droits ne sont pas respectés, vous
                pouvez introduire une réclamation auprès de la CNIL (
                <a
                  href="https://www.cnil.fr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-accent hover:underline"
                >
                  www.cnil.fr
                </a>
                ).
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-navy mb-3">
                Mise à jour
              </h2>
              <p>
                Cette politique peut être modifiée pour suivre l&apos;évolution
                du site ou de la réglementation. Dernière mise à jour : octobre
                2026.
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
