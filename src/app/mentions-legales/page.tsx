import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Mentions légales — Ospia",
  description: "Mentions légales du site Ospia.",
};

export default function MentionsLegales() {
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
            Mentions légales
          </h1>

          <div className="space-y-10 text-text-secondary leading-relaxed">
            <section>
              <h2 className="text-xl font-semibold text-navy mb-3">
                Éditeur du site
              </h2>
              <p>
                Le site ospia.fr est édité à titre individuel par Titouan
                Chinchole.
              </p>
              <ul className="mt-3 space-y-1.5 list-none">
                <li>Localisation : Carnac (56), France</li>
                <li>
                  Email :{" "}
                  <a
                    href="mailto:contact@ospia.fr"
                    className="text-blue-accent hover:underline"
                  >
                    contact@ospia.fr
                  </a>
                </li>
                <li>
                  Téléphone :{" "}
                  <a
                    href="tel:+33649212365"
                    className="text-blue-accent hover:underline"
                  >
                    +33 6 49 21 23 65
                  </a>
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-navy mb-3">
                Directeur de la publication
              </h2>
              <p>Titouan Chinchole</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-navy mb-3">
                Hébergement
              </h2>
              <p>
                Le site est hébergé par Netlify, Inc., 512 2nd Street, Suite
                200, San Francisco, CA 94107, États-Unis. Site :{" "}
                <a
                  href="https://www.netlify.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-accent hover:underline"
                >
                  https://www.netlify.com
                </a>
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-navy mb-3">
                Propriété intellectuelle
              </h2>
              <p>
                L&apos;ensemble des contenus présents sur ce site (textes,
                images, logos, identité visuelle) est la propriété exclusive
                d&apos;Ospia, sauf mention contraire. Toute reproduction,
                représentation, modification ou exploitation, totale ou
                partielle, sans autorisation préalable, est interdite.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-navy mb-3">
                Données personnelles
              </h2>
              <p>
                Les informations relatives à la collecte et au traitement de vos
                données personnelles sont détaillées dans notre{" "}
                <a
                  href="/politique-de-confidentialite/"
                  className="text-blue-accent hover:underline"
                >
                  politique de confidentialité
                </a>
                .
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
