import { Link } from "@tanstack/react-router";
import { MessageCircle } from "lucide-react";
import { siteContent, useI18n } from "@/lib/i18n";
import { whatsappHref, whatsappIsDirect } from "@/lib/contact";
import { Reveal } from "@/components/Reveal";

export function CtaBanner() {
  const { t, lang } = useI18n();
  const cta = siteContent.cta;

  return (
    <Reveal>
      <section className="band-dark relative overflow-hidden">
        <div className="mx-auto max-w-3xl px-4 py-20 text-center">
          <p className="font-script text-3xl text-gold-light/90">{t(siteContent.brand.tagline)}</p>
          <h2 className="font-display mt-4 text-3xl font-bold text-white sm:text-4xl">{t(cta.title)}</h2>
          <p className="mx-auto mt-4 max-w-xl text-white/75">{t(cta.text)}</p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link
              to="/contact"
              className="rounded-full bg-gold px-7 py-3 text-sm font-semibold text-night shadow-lg shadow-gold/30 transition-colors hover:bg-gold-light"
            >
              {t(cta.button)}
            </Link>
            {whatsappIsDirect() && (
              <a
                href={whatsappHref(
                  lang === "es"
                    ? "Hola Musti Targui, quiero diseñar mi ruta por Marruecos."
                    : "Hello Musti Targui, I'd like to design my route across Morocco.",
                )}
                className="inline-flex items-center gap-2 rounded-full border border-gold/50 px-7 py-3 text-sm font-semibold text-gold-light transition-colors hover:bg-gold/10"
              >
                <MessageCircle className="h-4 w-4" />
                WhatsApp
              </a>
            )}
          </div>
        </div>
      </section>
    </Reveal>
  );
}
