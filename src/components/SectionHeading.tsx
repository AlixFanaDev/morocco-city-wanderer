import type { ReactNode } from "react";
import { Reveal } from "@/components/Reveal";

export function SectionHeading({
  eyebrow,
  title,
  sub,
  onDark = false,
}: {
  eyebrow?: string;
  title: string;
  sub?: string;
  onDark?: boolean;
}) {
  return (
    <Reveal className="mx-auto max-w-2xl text-center">
      {eyebrow && (
        <p className={`font-script text-2xl sm:text-3xl ${onDark ? "text-gold-light/90" : "text-gold-deep"}`}>{eyebrow}</p>
      )}
      <h2 className={`font-display mt-2 text-3xl font-bold sm:text-4xl ${onDark ? "text-white" : "text-foreground"}`}>
        {title}
      </h2>
      {sub && <p className={`mt-3 ${onDark ? "text-white/70" : "text-muted-foreground"}`}>{sub}</p>}
      <span className={`gold-divider mt-5 text-xs ${onDark ? "text-gold" : "text-gold-deep"}`}>◆</span>
    </Reveal>
  );
}

export function PageHero({
  image,
  eyebrow,
  title,
  sub,
  children,
}: {
  image: string;
  eyebrow?: string;
  title: string;
  sub?: string;
  children?: ReactNode;
}) {
  return (
    <section className="relative flex min-h-[46vh] items-center justify-center overflow-hidden">
      <img src={image} alt="" width={1920} height={1088} className="absolute inset-0 h-full w-full object-cover" />
      <div className="hero-overlay absolute inset-0" />
      <div className="relative mx-auto max-w-3xl px-4 py-20 text-center">
        {eyebrow && <p className="font-script text-2xl text-gold-light sm:text-3xl">{eyebrow}</p>}
        <h1 className="text-gold-gradient font-display mt-2 text-4xl font-bold sm:text-5xl">{title}</h1>
        {sub && <p className="mx-auto mt-4 max-w-xl text-white/80">{sub}</p>}
        {children}
      </div>
    </section>
  );
}
