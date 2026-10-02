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
  title: "Ospia — Un pilotage simplifié",
  description:
    "Ospia conçoit des applications métier sur-mesure et automatise vos processus. Audit gratuit, solution livrée en quelques semaines.",
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
    title: "Ospia — Un pilotage simplifié",
    description:
      "Applications métier sur-mesure et automatisation intelligente pour TPE et PME.",
    type: "website",
    locale: "fr_FR",
    url: "https://ospia.fr",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ospia — Un pilotage simplifié",
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
    <html lang="fr" className={`h-full antialiased ${jakarta.variable}`}>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
