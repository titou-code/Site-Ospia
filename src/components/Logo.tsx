"use client";

import Image from "next/image";

interface LogoProps {
  variant?: "light" | "dark";
  className?: string;
}

export default function Logo({ variant = "light", className = "" }: LogoProps) {
  const src = variant === "dark" ? "/logo-dark.png" : "/logo-light.png";
  const alt = "Oxai";

  return (
    <Image
      src={src}
      alt={alt}
      width={130}
      height={70}
      className={className}
      priority
    />
  );
}
