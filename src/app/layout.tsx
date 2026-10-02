import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
  variable: "--font-jakarta",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://ospia.fr"),
  title: {
    default: "Ospia — Logiciels métier sur-mesure pour TPE et PME",
    template: "%s — Ospia",
  },
  description:
    "Ospia conçoit des logiciels métier sur-mesure pour les TPE et PME : audit gratuit, devis sous 48h, solution livrée en 2 à 4 semaines. Applications terrain, conformité réglementaire, pilotage et automatisation.",
  applicationName: "Ospia",
  keywords: [
    "Ospia",
    "logiciel métier sur-mesure",
    "application métier PME",
    "automatisation PME",
    "logiciel de conformité réglementaire",
    "application terrain artisans",
  ],
  alternates: { canonical: "/" },
  icons: [
    {
      rel: "icon",
      url: "/favicon-light.png",
      media: "(prefers-color-scheme: light)",
    },
    {
      rel: "icon",
      url: "/favicon-dark.png",
      media: "(prefers-color-scheme: dark)",
    },
  ],
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "https://ospia.fr",
    siteName: "Ospia",
    title: "Ospia — Logiciels métier sur-mesure pour TPE et PME",
    description:
      "Audit gratuit, devis sous 48h, solution sur-mesure livrée en 2 à 4 semaines. Ospia construit l'outil autour de votre métier.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Ospia — Un pilotage simplifié",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ospia — Logiciels métier sur-mesure pour TPE et PME",
    description:
      "Audit gratuit, devis sous 48h, solution sur-mesure livrée en 2 à 4 semaines.",
    images: ["/og-image.png"],
  },
  robots: { index: true, follow: true },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://ospia.fr/#organization",
      name: "Ospia",
      url: "https://ospia.fr",
      logo: "https://ospia.fr/logo-light.png",
      email: "contact@ospia.fr",
      telephone: "+33649212365",
      slogan: "Un pilotage simplifié",
      description:
        "Ospia conçoit des logiciels métier sur-mesure pour les TPE et PME, en construisant l'outil autour du métier du client.",
      founder: { "@type": "Person", name: "Titouan Chinchole" },
      address: {
        "@type": "PostalAddress",
        addressLocality: "Carnac",
        postalCode: "56340",
        addressCountry: "FR",
      },
      areaServed: { "@type": "Country", name: "France" },
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "sales",
        email: "contact@ospia.fr",
        telephone: "+33649212365",
        availableLanguage: "fr",
      },
    },
    {
      "@type": "WebSite",
      "@id": "https://ospia.fr/#website",
      url: "https://ospia.fr",
      name: "Ospia",
      publisher: { "@id": "https://ospia.fr/#organization" },
      inLanguage: "fr-FR",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`h-full antialiased ${jakarta.variable}`}>
      <body className="min-h-full flex flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
