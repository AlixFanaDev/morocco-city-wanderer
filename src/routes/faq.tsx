import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronDown } from "lucide-react";
import coast from "@/assets/coast.jpg";
import { siteContent, useI18n } from "@/lib/i18n";
import { PageHero } from "@/components/SectionHeading";
import { Reveal } from "@/components/Reveal";

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "FAQ — Musti Targui Morocco Tours" },
      {
        name: "description",
        content: "Preguntas frecuentes sobre nuestras rutas: salidas desde Marrakech, privado o grupo, qué llevar al desierto y cómo reservar.",
      },
      { property: "og:title", content: "FAQ — Musti Targui Morocco Tours" },
      {
        property: "og:description",
        content: "Todo lo que necesitas saber antes de viajar con nosotros.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: FaqPage,
});

function FaqPage() {
  const { t } = useI18n();

  return (
    <>
      <PageHero
        image={coast}
        eyebrow={t({ es: "Antes de partir", en: "Before you go" })}
        title="FAQ"
        sub={t({
          es: "Las respuestas a las preguntas que más nos llegan. Si falta la tuya, escríbenos.",
          en: "Answers to the questions we get most. If yours is missing, write to us.",
        })}
      />

      <section className="mx-auto max-w-3xl px-4 py-16 sm:py-20">
        <div className="space-y-4">
          {siteContent.faq.map((item, i) => {
            const incomplete = t(item.a).includes("[");
            return (
              <Reveal key={i} delayMs={i * 50}>
                <details className="group rounded-2xl border border-border bg-card shadow-sm open:shadow-md">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-5 font-semibold text-foreground marker:hidden [&::-webkit-details-marker]:hidden">
                    <span>{t(item.q)}</span>
                    <ChevronDown className="h-5 w-5 shrink-0 text-gold-deep transition-transform group-open:rotate-180" />
                  </summary>
                  <p className="px-5 pb-5 text-sm leading-relaxed text-foreground/80">
                    {incomplete
                      ? t({
                          es: "Primavera (marzo-mayo) y otoño (septiembre-noviembre) son ideales para el sur; el verano es perfecto para la costa atlántica. Escríbenos y te aconsejamos según tu ruta.",
                          en: "Spring (March-May) and autumn (September-November) are ideal for the south; summer is perfect for the Atlantic coast. Write to us and we'll advise you for your route.",
                        })
                      : t(item.a)}
                  </p>
                </details>
              </Reveal>
            );
          })}
        </div>

        <Reveal className="mt-12 rounded-3xl border border-gold/30 bg-gold/10 p-8 text-center">
          <p className="font-script text-3xl text-gold-deep">{t(siteContent.cta.title)}</p>
          <p className="mt-2 text-sm text-foreground/75">{t(siteContent.cta.text)}</p>
          <Link
            to="/contact"
            className="mt-5 inline-flex rounded-full bg-gold px-7 py-3 text-sm font-semibold text-night shadow-lg shadow-gold/25 transition-colors hover:bg-gold-light"
          >
            {t(siteContent.cta.button)}
          </Link>
        </Reveal>
      </section>
    </>
  );
}
