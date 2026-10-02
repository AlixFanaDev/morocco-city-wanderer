import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import content from "@/content/site-content.json";

export type Lang = "es" | "en";

export type Localized = { es: string; en: string };

interface I18nValue {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: (value: Localized | string) => string;
}

const LanguageContext = createContext<I18nValue | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  // Server renders Spanish (the brand's default); the stored choice is
  // applied after hydration to avoid a hydration mismatch.
  const [lang, setLangState] = useState<Lang>("es");

  useEffect(() => {
    const stored = window.localStorage.getItem("musti-lang");
    if (stored === "es" || stored === "en") setLangState(stored);
  }, []);

  const setLang = (next: Lang) => {
    setLangState(next);
    window.localStorage.setItem("musti-lang", next);
    document.documentElement.lang = next;
  };

  const t = (value: Localized | string) => (typeof value === "string" ? value : value[lang]);

  return <LanguageContext.Provider value={{ lang, setLang, t }}>{children}</LanguageContext.Provider>;
}

export function useI18n(): I18nValue {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useI18n must be used inside <LanguageProvider>");
  return ctx;
}

export { content as siteContent };
