import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Building2,
  Camera,
  Compass,
  Landmark,
  Mountain,
  Palmtree,
  Sparkles,
  Sunset,
  Tent,
  UsersRound,
  Waves,
  Waypoints,
  MessageCircle,
  ArrowRight,
  type LucideIcon,
} from "lucide-react";
import hero from "@/assets/hero-sahara.jpg";
import kasbah from "@/assets/kasbah.jpg";
import coast from "@/assets/coast.jpg";
import { siteContent, useI18n } from "@/lib/i18n";
import { RouteCard } from "@/components/RouteCard";
import { SectionHeading, } from "@/components/SectionHeading";
import { CtaBanner } from "@/components/CtaBanner";
import { Reveal } from "@/components/Reveal";
import { whatsappHref, whatsappIsDirect } from "@/lib/contact";

const highlightIcons: Record<string, LucideIcon> = {
  mountain: Mountain,
  kasbah: Landmark,
  palm: Palmtree,
  camel: Tent,
  surf: Waves,
  city: Building2,
  camera: Camera,
  sunset: Sunset,
};

const experienceIcons: LucideIcon[] = [Tent, Landmark, Mountain, Waves, Building2];

const whyIcons: Record<string, LucideIcon> = {
  0: Compass,
  1: Waypoints,
  2: UsersRound,
  3: Sparkles,
};

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Musti Targui Morocco Tours | Tours privados desde Marrakech al Sahara" },
      {
        name: "description",
        content:
          "Circuitos de 2 a 8 días desde Marrakech: Ruta de las Kasbahs, Sahara en Merzouga, costa atlántica, Fez y Chefchaouen. Guías locales, privado o en grupo.",
      },
      { property: "og:title", content: "Musti Targui Morocco Tours — Tu ruta. Tu ritmo. Tu Marruecos." },
      {
        property: "og:description",
        content:
          "Kasbahs, Atlas, Sahara y costa atlántica con guías locales que viven el desierto. Rutas privadas o en grupo desde Marrakech.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  const { t, lang } = useI18n();
  const previewRoutes = siteContent.routes.slice(0, 3);

  return (
    <>
      {/* Hero */}
      <section className="relative flex min-h-[92vh] items-center justify-center overflow-hidden">
        <img
          src={hero}
          alt={t({ es: "Caravana de camellos al atardecer en el Sahara", en: "Camel caravan at sunset in the Sahara" })}
          width={1920}
          height={1088}
          className="ken-burns absolute inset-0 h-full w-full object-cover"
        />
        <div className="hero-overlay absolute inset-0" />
        <div className="relative mx-auto max-w-3xl px-4 py-28 text-center">
          <Reveal>
            <p className="text-xs font-semibold tracking-[0.35em] text-gold-light uppercase">
              {siteContent.brand.strapline}
            </p>
            <h1 className="font-display mt-5 text-4xl leading-tight font-bold sm:text-5xl md:text-6xl">
              <span className="text-gold-gradient">{t(siteContent.brand.tagline)}</span>
            </h1>
            <p className="mx-auto mt-6 max-w-xl text-base text-white/85 sm:text-lg">
              {t(siteContent.hero.subtitle)}
            </p>
            <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
              <Link
                to="/routes"
                className="rounded-full bg-gold px-8 py-3.5 text-sm font-semibold text-night shadow-xl shadow-gold/30 transition-colors hover:bg-gold-light"
              >
                {t(siteContent.hero.primaryCta.label)}
              </Link>
              <a
                href={whatsappHref(
                  lang === "es"
                    ? "Hola Musti Targui, me gustaría reservar una ruta."
                    : "Hello Musti Targui, I'd like to book a route.",
                )}
                {...(whatsappIsDirect() ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className="inline-flex items-center gap-2 rounded-full border border-white/40 px-8 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition-colors hover:border-gold-light hover:text-gold-light"
              >
                <MessageCircle className="h-4 w-4" />
                {t(siteContent.hero.secondaryCta.label)}
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Highlights */}
      <section className="border-y border-border bg-secondary">
        <div className="mx-auto max-w-6xl px-4 py-10">
          <ul className="grid grid-cols-2 gap-x-4 gap-y-6 sm:grid-cols-4 lg:grid-cols-8">
            {siteContent.highlights.map((h, i) => {
              const Icon = highlightIcons[h.icon] ?? Camera;
              return (
                <li key={h.icon} className="flex flex-col items-center gap-2 text-center">
                  <span className="flex h-11 w-11 items-center justify-center rounded-full border border-gold-deep/30 bg-card text-gold-deep">
                    <Icon className="h-5 w-5" />
                  </span>
                  <span className="text-xs font-medium text-foreground/80">{t(h.label)}</span>
                  <span className="sr-only">{i}</span>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* About */}
      <section className="mx-auto max-w-6xl px-4 py-20 sm:py-24">
        <div className="grid items-center gap-10 md:grid-cols-2">
          <Reveal>
            <div className="relative">
              <img
                src={kasbah}
                alt={t({ es: "Kasbah de Aït Ben Haddou", en: "Aït Ben Haddou kasbah" })}
                loading="lazy"
                width={1200}
                height={912}
                className="rounded-3xl object-cover shadow-xl"
              />
              <p className="font-script absolute -bottom-5 left-6 rounded-2xl bg-night px-5 py-3 text-2xl text-gold-light shadow-lg">
                {t({ es: "Desde Merzouga, con amor", en: "From Merzouga, with love" })}
              </p>
            </div>
          </Reveal>
          <Reveal delayMs={120}>
            <p className="font-script text-3xl text-gold-deep">{t({ es: "Nuestra historia", en: "Our story" })}</p>
            <h2 className="font-display mt-2 text-3xl font-bold sm:text-4xl">{t(siteContent.about.title)}</h2>
            <div className="mt-6 space-y-4 text-foreground/80">
              {siteContent.about.text.map((p, i) => (
                <p key={i}>{t(p)}</p>
              ))}
            </div>
            <Link
              to="/why-us"
              className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-gold-deep hover:text-kasbah"
            >
              {t({ es: "Por qué viajar con nosotros", en: "Why travel with us" })}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* Routes preview */}
      <section className="bg-secondary/60 py-20 sm:py-24">
        <div className="mx-auto max-w-6xl px-4">
          <SectionHeading
            eyebrow={t({ es: "Elige tu camino", en: "Choose your path" })}
            title={t({ es: "Rutas desde Marrakech", en: "Routes from Marrakech" })}
            sub={t({
              es: "De 2 a 8 días: kasbahs, valles, dunas y costa. Todas privadas o en grupo, y ajustables a tu ritmo.",
              en: "From 2 to 8 days: kasbahs, valleys, dunes and coast. All private or in group, and adjustable to your pace.",
            })}
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {previewRoutes.map((route, i) => (
              <Reveal key={route.slug} delayMs={i * 100}>
                <RouteCard route={route} />
              </Reveal>
            ))}
          </div>
          <Reveal className="mt-10 text-center">
            <Link
              to="/routes"
              className="inline-flex items-center gap-2 rounded-full border border-gold-deep/40 px-7 py-3 text-sm font-semibold text-gold-deep transition-colors hover:bg-gold/10"
            >
              {t({ es: "Ver todas las rutas", en: "See all routes" })}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* Experiences strip */}
      <section className="band-dark relative overflow-hidden">
        <img src={coast} alt="" loading="lazy" width={1200} height={912} className="absolute inset-0 h-full w-full object-cover opacity-15" />
        <div className="relative mx-auto max-w-6xl px-4 py-20 sm:py-24">
          <SectionHeading
            onDark
            eyebrow={t({ es: "Momentos que no se olvidan", en: "Moments you won't forget" })}
            title={t({ es: "Experiencias", en: "Experiences" })}
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {siteContent.experiences.map((exp, i) => {
              const Icon = experienceIcons[i] ?? Camera;
              return (
                <Reveal key={i} delayMs={i * 80}>
                  <div className="h-full rounded-2xl border border-gold/20 bg-night/60 p-6 backdrop-blur-sm">
                    <span className="flex h-11 w-11 items-center justify-center rounded-full bg-gold/15 text-gold-light">
                      <Icon className="h-5 w-5" />
                    </span>
                    <h3 className="font-display mt-4 text-lg font-bold text-gold-light">{t(exp.title)}</h3>
                    <p className="mt-2 text-sm text-white/70">{t(exp.text)}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why us */}
      <section className="mx-auto max-w-6xl px-4 py-20 sm:py-24">
        <SectionHeading
          eyebrow={t({ es: "Nuestra promesa", en: "Our promise" })}
          title={t({ es: "Por qué nosotros", en: "Why us" })}
        />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {siteContent.why.map((w, i) => {
            const Icon = whyIcons[i] ?? Sparkles;
            return (
              <Reveal key={i} delayMs={i * 80}>
                <div className="card-lift h-full rounded-2xl border border-border bg-card p-6 text-center shadow-sm">
                  <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-gold/15 text-gold-deep">
                    <Icon className="h-6 w-6" />
                  </span>
                  <h3 className="font-display mt-4 text-lg font-bold">{t(w.title)}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{t(w.text)}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>

      <CtaBanner />
    </>
  );
}
