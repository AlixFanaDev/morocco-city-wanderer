import { createFileRoute } from "@tanstack/react-router";
import kasbah from "@/assets/kasbah.jpg";
import { siteContent, useI18n } from "@/lib/i18n";
import { RouteCard } from "@/components/RouteCard";
import { PageHero } from "@/components/SectionHeading";
import { CtaBanner } from "@/components/CtaBanner";
import { Reveal } from "@/components/Reveal";

export const Route = createFileRoute("/routes")({
  head: () => ({
    meta: [
      { title: "Rutas — Musti Targui Morocco Tours" },
      {
        name: "description",
        content:
          "Todas nuestras rutas desde Marrakech: de 2 a 8 días por kasbahs, el Atlas, el Sahara de Merzouga, la costa atlántica, Fez y Chefchaouen.",
      },
      { property: "og:title", content: "Rutas — Musti Targui Morocco Tours" },
      {
        property: "og:description",
        content: "8 rutas de 2 a 8 días desde Marrakech: kasbahs, desierto, costa atlántica y ciudades imperiales.",
      },
    ],
  }),
  component: RoutesPage,
});

function RoutesPage() {
  const { t } = useI18n();

  return (
    <>
      <PageHero
        image={kasbah}
        eyebrow={t({ es: "Tu ruta. Tu ritmo.", en: "Your route. Your rhythm." })}
        title={t({ es: "Rutas", en: "Routes" })}
        sub={t({
          es: "Ocho maneras de cruzar Marruecos. Privadas o en grupo, y siempre ajustables a tu medida.",
          en: "Eight ways to cross Morocco. Private or in group, always adjustable to you.",
        })}
      />

      <section className="mx-auto max-w-6xl px-4 py-16 sm:py-20">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {siteContent.routes.map((route, i) => (
            <Reveal key={route.slug} delayMs={(i % 3) * 90}>
              <RouteCard route={route} />
            </Reveal>
          ))}
        </div>
      </section>

      <CtaBanner />
    </>
  );
}
