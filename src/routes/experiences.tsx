import { createFileRoute } from "@tanstack/react-router";
import camp from "@/assets/camp.jpg";
import kasbah from "@/assets/kasbah.jpg";
import gorge from "@/assets/gorge.jpg";
import coast from "@/assets/coast.jpg";
import chefchaouen from "@/assets/chefchaouen.jpg";
import { siteContent, useI18n } from "@/lib/i18n";
import { PageHero } from "@/components/SectionHeading";
import { CtaBanner } from "@/components/CtaBanner";
import { Reveal } from "@/components/Reveal";

const experienceImages = [camp, kasbah, gorge, coast, chefchaouen];

export const Route = createFileRoute("/experiences")({
  head: () => ({
    meta: [
      { title: "Experiencias — Musti Targui Morocco Tours" },
      {
        name: "description",
        content:
          "Noche en el desierto de Merzouga, Ruta de las Mil Kasbahs, Gargantas del Todra, costa atlántica y surf, Fez y Chefchaouen.",
      },
      { property: "og:title", content: "Experiencias — Musti Targui Morocco Tours" },
      {
        property: "og:description",
        content: "Momentos que no se olvidan: dunas, kasbahs, gargantas, olas y medinas.",
      },
    ],
  }),
  component: ExperiencesPage,
});

function ExperiencesPage() {
  const { t } = useI18n();

  return (
    <>
      <PageHero
        image={camp}
        eyebrow={t({ es: "Momentos que no se olvidan", en: "Moments you won't forget" })}
        title={t({ es: "Experiencias", en: "Experiences" })}
        sub={t({
          es: "Cada ruta guarda un momento que te acompañará para siempre. Estos son los nuestros.",
          en: "Every route holds a moment that will stay with you forever. These are ours.",
        })}
      />

      <section className="mx-auto max-w-5xl space-y-20 px-4 py-20 sm:py-24">
        {siteContent.experiences.map((exp, i) => (
          <Reveal key={i}>
            <div className={`grid items-center gap-8 md:grid-cols-2 ${i % 2 === 1 ? "md:[&>*:first-child]:order-2" : ""}`}>
              <img
                src={experienceImages[i]}
                alt={t(exp.title)}
                loading="lazy"
                width={1200}
                height={912}
                className="card-lift rounded-3xl object-cover shadow-lg"
              />
              <div>
                <span className="font-display text-5xl leading-none font-bold text-gold/40">{String(i + 1).padStart(2, "0")}</span>
                <h2 className="font-display mt-3 text-2xl font-bold sm:text-3xl">{t(exp.title)}</h2>
                <p className="mt-4 text-foreground/80">{t(exp.text)}</p>
              </div>
            </div>
          </Reveal>
        ))}
      </section>

      <CtaBanner />
    </>
  );
}
