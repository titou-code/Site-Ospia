import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Génère un site 100% statique dans out/ (déployable par FTP sur OVH mutualisé, sans serveur Node)
  output: "export",
  // L'optimiseur d'images de Next nécessite un serveur : on le désactive pour l'export statique
  images: {
    unoptimized: true,
  },
  // Chaque route devient un dossier avec index.html (ex: mentions-legales/index.html)
  // -> servi nativement par Apache/OVH sans configuration ni risque de 404
  trailingSlash: true,
};

export default nextConfig;
