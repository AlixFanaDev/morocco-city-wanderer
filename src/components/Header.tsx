import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import logo from "@/assets/logo.png.asset.json";
import { siteContent, useI18n } from "@/lib/i18n";
import { navTarget } from "@/lib/nav";
import { cn } from "@/lib/utils";

export function Header() {
  const { lang, setLang, t } = useI18n();
  const [open, setOpen] = useState(false);

  const navItems = siteContent.navigation.filter((n) => n.id !== "home");

  return (
    <header className="sticky top-0 z-40 border-b border-gold/15 bg-night/95 text-white backdrop-blur supports-[backdrop-filter]:bg-night/85">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:h-18">
        <Link to="/" className="flex shrink-0 items-center gap-3" onClick={() => setOpen(false)}>
          <img src={logo.url} alt={siteContent.brand.name} className="h-10 w-10 rounded-full shadow-md shadow-gold/30 sm:h-12 sm:w-12" />
          <span className="hidden flex-col leading-tight min-[420px]:flex">
            <span className="font-display text-base font-bold text-gold-light sm:text-lg">Musti Targui</span>
            <span className="text-[10px] tracking-[0.28em] text-white/70 uppercase">Morocco Tours</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-6 lg:flex">
          {navItems.map((item) => (
            <Link
              key={item.id}
              to={navTarget(item.id)}
              className="text-sm font-medium text-white/80 transition-colors hover:text-gold-light"
              activeProps={{ className: "text-gold-light" }}
            >
              {t(item.label)}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <div className="flex items-center rounded-full border border-gold/30 p-0.5 text-xs font-semibold" role="group" aria-label="Language">
            {(["es", "en"] as const).map((l) => (
              <button
                key={l}
                onClick={() => setLang(l)}
                className={cn(
                  "rounded-full px-2.5 py-1 uppercase transition-colors",
                  lang === l ? "bg-gold text-night" : "text-white/70 hover:text-gold-light",
                )}
              >
                {l}
              </button>
            ))}
          </div>
          <Link
            to="/contact"
            className="hidden rounded-full bg-gold px-4 py-2 text-sm font-semibold text-night shadow-md shadow-gold/30 transition-colors hover:bg-gold-light sm:inline-flex"
          >
            {t(siteContent.navigation[siteContent.navigation.length - 1]!.label)}
          </Link>
          <button
            className="inline-flex h-10 w-10 items-center justify-center rounded-full text-white/80 hover:text-gold-light lg:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label="Menu"
            aria-expanded={open}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <nav className="border-t border-gold/15 bg-night px-4 pb-5 lg:hidden">
          <div className="mx-auto flex max-w-6xl flex-col">
            {siteContent.navigation.map((item) => (
              <Link
                key={item.id}
                to={navTarget(item.id)}
                className={cn(
                  "border-b border-white/5 py-3 text-sm font-medium",
                  item.cta ? "mt-3 text-gold-light" : "text-white/85",
                )}
                onClick={() => setOpen(false)}
                activeProps={{ className: "text-gold-light" }}
              >
                {t(item.label)}
              </Link>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}
