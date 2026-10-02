import { createFileRoute } from "@tanstack/react-router";
import hero from "@/assets/hero-sahara.jpg";
import { useI18n } from "@/lib/i18n";
import { galleryImages } from "@/lib/images";
import { PageHero } from "@/components/SectionHeading";
import { CtaBanner } from "@/components/CtaBanner";
import { Reveal } from "@/components/Reveal";

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: "Galería — Musti Targui Morocco Tours" },
      {
        name: "description",
        content: "Dunas de Merzouga, kasbahs, gargantas, la costa de Essaouira y las calles azules de Chefchaouen.",
      },
      { property: "og:title", content: "Galería — Musti Targui Morocco Tours" },
      {
        property: "og:description",
        content: "Un vistazo a los paisajes y ciudades que cruzan nuestras rutas.",
      },
    ],
  }),
  component: GalleryPage,
});

function GalleryPage() {
  const { t } = useI18n();

  return (
    <>
      <PageHero
        image={hero}
        eyebrow={t({ es: "Paisajes que te roban el alma", en: "Landscapes that steal your soul" })}
        title={t({ es: "Galería", en: "Gallery" })}
        sub={t({
          es: "Un vistazo a lo que te espera: montañas, dunas, océano y ciudades milenarias.",
          en: "A glimpse of what awaits: mountains, dunes, ocean and thousand-year-old cities.",
        })}
      />

      <section className="mx-auto max-w-6xl px-4 py-16 sm:py-20">
        <div className="columns-1 gap-5 sm:columns-2 lg:columns-3 [&>figure]:mb-5">
          {galleryImages.map((img, i) => (
            <Reveal key={i} delayMs={(i % 3) * 80}>
              <figure className="group relative overflow-hidden rounded-2xl shadow-md">
                <img
                  src={img.src}
                  alt={t(img.alt)}
                  loading="lazy"
                  width={1200}
                  height={912}
                  className="w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-night/85 to-transparent p-4 pt-10 text-sm font-medium text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  {t(img.alt)}
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </section>

      <CtaBanner />
    </>
  );
}
