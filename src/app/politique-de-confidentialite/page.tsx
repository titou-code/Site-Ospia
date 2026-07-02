import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Politique de confidentialité — Oxai",
  description: "Politique de confidentialité et protection des données personnelles du site Oxai.",
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
                Données personnelles
              </h2>
              <p>
                Dans le cadre de l&apos;utilisation du formulaire de contact,
                Oxai collecte les données suivantes : nom, entreprise, email,
                téléphone et description du besoin. Ces informations sont
                utilisées uniquement pour répondre à votre demande et établir,
                le cas échéant, un devis ou une proposition commerciale.
              </p>
              <p className="mt-3">
                Ces données sont conservées pendant une durée maximale de 3 ans
                à compter du dernier contact, et ne sont en aucun cas cédées,
                vendues ou transmises à des tiers.
              </p>
              <p className="mt-3">
                Conformément au Règlement Général sur la Protection des Données
                (RGPD) et à la loi Informatique et Libertés, vous disposez
                d&apos;un droit d&apos;accès, de rectification, de suppression
                et d&apos;opposition concernant vos données personnelles. Pour
                exercer ces droits, vous pouvez nous contacter à l&apos;adresse{" "}
                <a
                  href="mailto:contact@oxai.fr"
                  className="text-blue-accent hover:underline"
                >
                  contact@oxai.fr
                </a>
                . Vous disposez également du droit d&apos;introduire une
                réclamation auprès de la CNIL (
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
              <h2 className="text-xl font-semibold text-navy mb-3">Cookies</h2>
              <p>
                Ce site n&apos;utilise pas de cookies de suivi publicitaire ou
                de profilage. Seuls des cookies techniques, nécessaires au bon
                fonctionnement du site, peuvent être utilisés.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-navy mb-3">
                Responsabilité
              </h2>
              <p>
                Oxai ne saurait être tenu responsable des dommages directs ou
                indirects résultant de l&apos;accès ou de l&apos;utilisation de
                ce site, y compris l&apos;inaccessibilité, les pertes de données
                ou la présence de virus.
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
