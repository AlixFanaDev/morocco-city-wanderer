import { Link } from "@tanstack/react-router";
import { ArrowRight, MoonStar } from "lucide-react";
import { siteContent, useI18n } from "@/lib/i18n";
import type { Localized } from "@/lib/i18n";
import { routeImages } from "@/lib/images";

type RouteItem = (typeof siteContent.routes)[number];

export function RouteCard({ route, delayMs }: { route: RouteItem; delayMs?: number }) {
  const { t } = useI18n();
  const image = routeImages[route.slug] ?? routeImages["kasbah-express-2d"]!;

  const typeLabel: Record<string, Localized | string> = siteContent.routeTypes;
  const type = typeLabel[route.type] ?? route.type;

  const priceKnown = route.price && !route.price.includes("[");

  return (
    <Link
      to="/routes/$slug"
      params={{ slug: route.slug }}
      className="card-lift group flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm"
    >
      <div className="relative h-48 overflow-hidden sm:h-52">
        <img
          src={image}
          alt={t(route.name)}
          loading="lazy"
          width={1200}
          height={912}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <span className={`chip-${route.type} absolute top-3 left-3 rounded-full px-3 py-1 text-[11px] font-semibold tracking-wide uppercase`}>
          {typeof type === "string" && type === "Signature" ? "Signature" : t(type as Localized)}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-center justify-between gap-2 text-[11px] font-semibold tracking-[0.2em] text-muted-foreground uppercase">
          <span>{route.code}</span>
          <span className="flex items-center gap-1">
            <MoonStar className="h-3.5 w-3.5 text-gold-deep" />
            {route.days}d · {route.nights}n
          </span>
        </div>
        <h3 className="font-display mt-2 text-xl font-bold text-foreground">{t(route.name)}</h3>
        <p className="font-script mt-1 text-lg text-gold-deep">{t(route.tagline)}</p>
        <p className="mt-3 flex-1 text-sm text-muted-foreground">{route.route}</p>

        <div className="mt-4 flex items-center justify-between border-t border-border pt-4">
          <span className="text-sm font-semibold text-foreground">
            {priceKnown ? route.price : t({ es: "Precio a consultar", en: "Price on request" })}
          </span>
          <span className="inline-flex items-center gap-1 text-sm font-semibold text-gold-deep transition-transform group-hover:translate-x-1">
            {t({ es: "Itinerario", en: "Itinerary" })}
            <ArrowRight className="h-4 w-4" />
          </span>
        </div>
      </div>
    </Link>
  );
}
