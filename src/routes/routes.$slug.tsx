import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, BedDouble, CalendarDays, Car, Compass, MoonStar, ShieldCheck, UsersRound, UtensilsCrossed, type LucideIcon } from "lucide-react";
import { siteContent, useI18n } from "@/lib/i18n";
import { routeImages } from "@/lib/images";
import { CtaBanner } from "@/components/CtaBanner";
import { Reveal } from "@/components/Reveal";

const includedIcons: Record<string, LucideIcon> = {
  car: Car,
  bed: BedDouble,
  food: UtensilsCrossed,
  guide: Compass,
  shield: ShieldCheck,
};

export const Route = createFileRoute("/routes/$slug")({
  loader: ({ params }) => {
    const route = siteContent.routes.find((r) => r.slug === params.slug);
    if (!route) throw notFound();
    return { route };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "Ruta no encontrada — Musti Targui Morocco Tours" }, { name: "robots", content: "noindex" }],
      };
    }
    return {
      meta: [
        { title: `${loaderData.route.name.es} — Musti Targui Morocco Tours` },
        { name: "description", content: loaderData.route.tagline.es },
        { property: "og:title", content: `${loaderData.route.name.es} — Musti Targui Morocco Tours` },
        { property: "og:description", content: loaderData.route.tagline.es },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  component: RouteDetail,
});

function RouteDetail() {
  const { route } = Route.useLoaderData();
  const { t, lang } = useI18n();
  const image = routeImages[route.slug] ?? routeImages["kasbah-express-2d"]!;

  const typeLabel = (siteContent.routeTypes as Record<string, { es: string; en: string } | string>)[route.type];
  const typeText = typeof typeLabel === "string" ? typeLabel : (typeLabel?.[lang] ?? route.type);
  const priceKnown = route.price && !route.price.includes("[");

  return (
    <>
      {/* Route hero */}
      <section className="relative flex min-h-[60vh] items-end overflow-hidden">
        <img src={image} alt={t(route.name)} width={1920} height={1088} className="absolute inset-0 h-full w-full object-cover" />
        <div className="hero-overlay absolute inset-0" />
        <div className="relative mx-auto w-full max-w-4xl px-4 pt-28 pb-14 text-center">
          <div className="flex flex-wrap items-center justify-center gap-2">
            <span className={`chip-${route.type} rounded-full px-3 py-1 text-[11px] font-semibold tracking-wide uppercase`}>{typeText}</span>
            <span className="rounded-full border border-white/30 px-3 py-1 text-[11px] font-semibold tracking-wide text-white/85 uppercase">
              {route.code} · {route.days}d / {route.nights}n
            </span>
          </div>
          <h1 className="text-gold-gradient font-display mt-4 text-4xl font-bold sm:text-5xl">{t(route.name)}</h1>
          <p className="font-script mt-3 text-2xl text-gold-light sm:text-3xl">{t(route.tagline)}</p>
          <p className="mt-4 text-sm tracking-wide text-white/80">{route.route}</p>
        </div>
      </section>

      {/* Itinerary */}
      <section className="mx-auto max-w-3xl px-4 py-16 sm:py-20">
        <Reveal>
          <h2 className="font-display text-center text-3xl font-bold">
            {t({ es: "Itinerario día a día", en: "Day-by-day itinerary" })}
          </h2>
          <span className="gold-divider mt-4 flex justify-center text-xs text-gold-deep">◆</span>
        </Reveal>

        <ol className="relative mt-14 space-y-12 before:absolute before:top-2 before:bottom-2 before:left-[19px] before:w-px before:bg-gradient-to-b before:from-gold before:via-gold-deep/40 before:to-transparent sm:before:left-[23px]">
          {route.itinerary.map((day, i) => (
            <Reveal key={day.day} delayMs={i * 60}>
              <li className="relative flex gap-5 sm:gap-7">
                <span className="font-display z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gold text-base font-bold text-night shadow-md shadow-gold/40 sm:h-12 sm:w-12 sm:text-lg">
                  {day.day}
                </span>
                <div className="pt-0.5">
                  <h3 className="font-display text-lg font-bold sm:text-xl">{t(day.title)}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-foreground/80 sm:text-base">{t(day.description)}</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {day.stops.map((stop) => (
                      <span key={stop} className="rounded-full bg-secondary px-3 py-1 text-xs font-medium text-foreground/75">
                        {stop}
                      </span>
                    ))}
                  </div>
                </div>
              </li>
            </Reveal>
          ))}
        </ol>

        <Reveal className="mt-16 text-center">
          <p className="font-script text-3xl text-gold-deep sm:text-4xl">“{t(route.closing)}”</p>
        </Reveal>

        <Reveal className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <div className="flex items-center gap-2 rounded-full bg-secondary px-4 py-2 text-sm font-medium">
            <CalendarDays className="h-4 w-4 text-gold-deep" />
            {priceKnown ? route.price : t({ es: "Precio a consultar", en: "Price on request" })}
          </div>
          {route.modes.map((mode) => (
            <div key={mode} className="flex items-center gap-2 rounded-full bg-secondary px-4 py-2 text-sm font-medium">
              <UsersRound className="h-4 w-4 text-gold-deep" />
              {mode === "private" ? t({ es: "Privado", en: "Private" }) : t({ es: "En grupo", en: "Group" })}
            </div>
          ))}
        </Reveal>

        <Reveal className="mt-8 text-center">
          <Link
            to="/contact"
            search={{ route: route.slug }}
            className="inline-flex rounded-full bg-gold px-8 py-3.5 text-sm font-semibold text-night shadow-lg shadow-gold/30 transition-colors hover:bg-gold-light"
          >
            {t({ es: `Reservar: ${route.name.es}`, en: `Book: ${route.name.en}` })}
          </Link>
          <div className="mt-5">
            <Link to="/routes" className="inline-flex items-center gap-1.5 text-sm font-semibold text-gold-deep hover:text-kasbah">
              <ArrowLeft className="h-4 w-4" />
              {t({ es: "Todas las rutas", en: "All routes" })}
            </Link>
          </div>
        </Reveal>
      </section>

      {/* What's included */}
      <section className="border-y border-border bg-secondary/60 py-16">
        <div className="mx-auto max-w-6xl px-4">
          <Reveal className="text-center">
            <h2 className="font-display text-3xl font-bold">{t(siteContent.included.title)}</h2>
            <p className="mt-2 text-sm text-muted-foreground">{t(siteContent.included.disclaimer)}</p>
          </Reveal>
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
        </div>
      </section>

      <CtaBanner />
    </>
  );
}

function RouteNotFound() {
  const { t } = useI18n();
  return (
    <section className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
      <p className="font-script text-4xl text-gold-deep">{t({ es: "Ruta no encontrada", en: "Route not found" })}</p>
      <h1 className="font-display mt-3 text-3xl font-bold">{t({ es: "Esta ruta no existe", en: "This route doesn't exist" })}</h1>
      <p className="mt-2 max-w-md text-muted-foreground">
        {t({ es: "Puede que el enlace haya cambiado. Explora todas nuestras rutas desde Marrakech.", en: "The link may have changed. Explore all our routes from Marrakech." })}
      </p>
      <Link to="/routes" className="mt-8 rounded-full bg-gold px-7 py-3 text-sm font-semibold text-night hover:bg-gold-light">
        {t({ es: "Ver rutas", en: "See routes" })}
      </Link>
    </section>
  );
}
