import { Link } from "@tanstack/react-router";
import { MapPin } from "lucide-react";
import logo from "@/assets/logo.png.asset.json";
import { siteContent, useI18n } from "@/lib/i18n";
import { navTarget } from "@/lib/nav";

export function Footer() {
  const { t } = useI18n();

  const navItems = siteContent.navigation.filter((n) => n.id !== "contact");

  return (
    <footer className="band-dark border-t border-gold/20">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 md:grid-cols-3">
        <div>
          <div className="flex items-center gap-3">
            <img src={logo.url} alt={siteContent.brand.name} className="h-14 w-14 rounded-full shadow-md shadow-gold/30" />
            <div className="leading-tight">
              <div className="font-display text-lg font-bold text-gold-light">Musti Targui</div>
              <div className="text-[10px] tracking-[0.28em] text-white/60 uppercase">Morocco Tours</div>
            </div>
          </div>
          <p className="font-script mt-5 text-2xl text-gold-light/90">{t(siteContent.footer.text)}</p>
          <p className="mt-2 text-xs tracking-[0.2em] text-white/70 uppercase">{siteContent.brand.strapline}</p>
        </div>

        <div>
          <h3 className="text-xs font-semibold tracking-[0.25em] text-white/60 uppercase">
            {t({ es: "Navegación", en: "Navigation" })}
          </h3>
          <ul className="mt-4 space-y-2 text-sm">
            {navItems.map((item) => (
              <li key={item.id}>
                <Link to={navTarget(item.id)} className="text-white/75 transition-colors hover:text-gold-light">
                  {t(item.label)}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-xs font-semibold tracking-[0.25em] text-white/60 uppercase">
            {t({ es: "Contacto", en: "Contact" })}
          </h3>
          <p className="mt-4 flex items-start gap-2 text-sm text-white/75">
            <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
            {siteContent.contact.details.base}
          </p>
          <Link
            to="/contact"
            className="mt-6 inline-flex rounded-full bg-gold px-5 py-2.5 text-sm font-semibold text-night transition-colors hover:bg-gold-light"
          >
            {t(siteContent.cta.button)}
          </Link>
        </div>
      </div>
      <div className="border-t border-white/10 py-5 text-center text-xs text-white/65">
        {siteContent.footer.copyright}
      </div>
    </footer>
  );
}
