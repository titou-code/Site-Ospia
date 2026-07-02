"use client";

import Logo from "./Logo";
import { Reveal } from "./motion";

const navLinks = [
  { href: "#constat", label: "Constat" },
  { href: "#process", label: "Méthode" },
  { href: "#offres", label: "Offres" },
  { href: "#pourquoi", label: "Pourquoi Oxai" },
  { href: "#contact", label: "Contact" },
];

export default function Footer() {
  return (
    <footer className="bg-[#060e1f] border-t border-white/5">
      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
        <Reveal>
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="flex flex-col items-center lg:items-start gap-4">
              <Logo variant="dark" className="h-10 w-auto" />
              <p className="text-sm text-white/40 max-w-xs text-center lg:text-left">
                L&apos;operating system IA des PME.
                <br />
                Applications métier sur-mesure.
              </p>
            </div>

            <nav className="flex flex-wrap justify-end gap-6">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="relative text-sm text-white/50 hover:text-white transition-colors duration-200 cursor-pointer group"
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-px bg-white/40 group-hover:w-full transition-all duration-300" />
                </a>
              ))}
            </nav>
          </div>
        </Reveal>

        <div className="mt-8 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/30">
            &copy; {new Date().getFullYear()} Oxai. Tous droits réservés.
          </p>
          {/* Liens mentions légales masqués temporairement */}
        </div>
      </div>
    </footer>
  );
}
