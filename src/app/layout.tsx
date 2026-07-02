import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Oxai — Un pilotage simplifié",
  description:
    "Oxai conçoit des applications métier sur-mesure et automatise vos processus. Audit gratuit, solution livrée en quelques semaines, vous en êtes propriétaire.",
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
    title: "Oxai — Un pilotage simplifié",
    description:
      "Applications métier sur-mesure et automatisation intelligente pour TPE et PME.",
    type: "website",
    locale: "fr_FR",
    url: "https://opai.fr",
  },
  twitter: {
    card: "summary_large_image",
    title: "Oxai — Un pilotage simplifié",
    description:
      "Applications métier sur-mesure et automatisation intelligente pour TPE et PME.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
