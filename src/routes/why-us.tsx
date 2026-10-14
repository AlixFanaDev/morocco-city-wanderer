import { createFileRoute } from "@tanstack/react-router";
import { BedDouble, Car, Compass, ShieldCheck, UtensilsCrossed, type LucideIcon } from "lucide-react";
import marrakech from "@/assets/marrakech.jpg";
import { siteContent, useI18n } from "@/lib/i18n";
import { PageHero, SectionHeading } from "@/components/SectionHeading";
import { CtaBanner } from "@/components/CtaBanner";
import { Reveal } from "@/components/Reveal";

const whyIcons = [Compass, ShieldCheck, Car, UtensilsCrossed];

const includedIcons: Record<string, LucideIcon> = {
  car: Car,
  bed: BedDouble,
  food: UtensilsCrossed,
  guide: Compass,
  shield: ShieldCheck,
};

export const Route = createFileRoute("/why-us")({
  head: () => ({
    meta: [
      { title: "Por qué nosotros — Musti Targui Morocco Tours" },
      {
        name: "description",
        content:
          "Guías locales que viven el desierto, rutas a tu medida, privado o en grupo y autenticidad por encima del turismo de masas.",
      },
      { property: "og:title", content: "Por qué nosotros — Musti Targui Morocco Tours" },
      {
        property: "og:description",
        content: "Guías locales, rutas a tu medida y experiencias auténticas desde Merzouga y Marrakech.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: WhyUsPage,
});

function WhyUsPage() {
  const { t } = useI18n();

  return (
    <>
      <PageHero
        image={marrakech}
        eyebrow={t({ es: "Nuestra promesa", en: "Our promise" })}
        title={t({ es: "Por qué nosotros", en: "Why us" })}
        sub={t({
          es: "No vendemos circuitos: compartimos el Marruecos que vivimos cada día.",
          en: "We don't sell circuits: we share the Morocco we live every day.",
        })}
      />

      <section className="mx-auto max-w-6xl px-4 py-20 sm:py-24">
        <div className="grid gap-6 sm:grid-cols-2">
          {siteContent.why.map((w, i) => {
            const Icon = whyIcons[i] ?? Compass;
            return (
              <Reveal key={i} delayMs={i * 80}>
                <div className="card-lift flex h-full gap-5 rounded-2xl border border-border bg-card p-7 shadow-sm">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gold/15 text-gold-deep">
                    <Icon className="h-6 w-6" />
                  </span>
                  <div>
                    <h2 className="font-display text-xl font-bold">{t(w.title)}</h2>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{t(w.text)}</p>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>

      <section className="border-y border-border bg-secondary/60 py-16">
        <div className="mx-auto max-w-6xl px-4">
          <SectionHeading title={t(siteContent.included.title)} />
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
            {siteContent.included.items.map((item, i) => {
              const Icon = includedIcons[item.icon] ?? Compass;
              return (
                <Reveal key={item.icon} delayMs={i * 70}>
                  <div className="h-full rounded-2xl border border-border bg-card p-5 text-center">
                    <span className="mx-auto flex h-11 w-11 items-center justify-center rounded-full bg-gold/15 text-gold-deep">
                      <Icon className="h-5 w-5" />
                    </span>
                    <h3 className="mt-3 text-sm font-semibold">{t(item.label)}</h3>
                    {"note" in item && item.note && <p className="mt-1 text-xs text-muted-foreground">{t(item.note)}</p>}
                  </div>
                </Reveal>
              );
            })}
          </div>
          <Reveal className="mt-6 text-center">
            <p className="text-sm text-muted-foreground">{t(siteContent.included.disclaimer)}</p>
          </Reveal>
        </div>
      </section>

      <CtaBanner />
    </>
  );
}
