import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { MapPin, MessageCircle, Send } from "lucide-react";
import marrakech from "@/assets/marrakech.jpg";
import { siteContent, useI18n } from "@/lib/i18n";
import { CONTACT_EMAIL, WHATSAPP_NUMBER, whatsappIsDirect } from "@/lib/contact";
import { PageHero } from "@/components/SectionHeading";
import { Reveal } from "@/components/Reveal";

export const Route = createFileRoute("/contact")({
  validateSearch: (search: Record<string, unknown>) => ({
    route: typeof search.route === "string" ? search.route : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Reservar — Musti Targui Morocco Tours" },
      {
        name: "description",
        content: "Cuéntanos tus fechas y qué te gustaría ver. Diseñamos tu ruta por Marruecos y te respondemos con propuesta y precio.",
      },
      { property: "og:title", content: "Reservar — Musti Targui Morocco Tours" },
      {
        property: "og:description",
        content: "Solicita tu presupuesto: fechas, ruta, nº de viajeros y privado o en grupo.",
      },
    ],
  }),
  component: ContactPage,
});

type FormState = {
  name: string;
  email: string;
  phone: string;
  route: string;
  date: string;
  travelers: string;
  mode: string;
  message: string;
};

function ContactPage() {
  const { t, lang } = useI18n();
  const search = Route.useSearch();
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    phone: "",
    route: search.route ?? "",
    date: "",
    travelers: "2",
    mode: "private",
    message: "",
  });
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (search.route) setForm((f) => ({ ...f, route: search.route! }));
  }, [search.route]);

  const set = (key: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [key]: e.target.value }));

  const buildMessage = () => {
    const routeName = siteContent.routes.find((r) => r.slug === form.route);
    const routeText = routeName ? t(routeName.name) : "—";
    return lang === "es"
      ? `Hola Musti Targui, soy ${form.name}. Me interesa la ruta: ${routeText}. Fecha aproximada: ${form.date || "por definir"}. Viajeros: ${form.travelers}. Modo: ${form.mode === "private" ? "privado" : "grupo"}. ${form.message}`
      : `Hello Musti Targui, I'm ${form.name}. I'm interested in the route: ${routeText}. Approximate date: ${form.date || "to be decided"}. Travellers: ${form.travelers}. Mode: ${form.mode}. ${form.message}`;
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !/^\S+@\S+\.\S+$/.test(form.email)) {
      setError(lang === "es" ? "Revisa tu nombre y tu email." : "Please check your name and email.");
      return;
    }
    setError("");
    setSent(true);
    const text = buildMessage();
    if (whatsappIsDirect()) {
      window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`, "_blank", "noopener");
    } else if (CONTACT_EMAIL) {
      window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent("Musti Targui — booking")}&body=${encodeURIComponent(text)}`;
    }
  };

  const routeLabel = siteContent.routes.find((r) => r.slug === form.route);

  return (
    <>
      <PageHero
        image={marrakech}
        eyebrow={t({ es: "Hablemos de tu viaje", en: "Let's talk about your trip" })}
        title={t({ es: "Reservar", en: "Book" })}
        sub={t(siteContent.cta.text)}
      />

      <section className="mx-auto max-w-4xl px-4 py-16 sm:py-20">
        <Reveal>
          <div className="rounded-3xl border border-border bg-card p-6 shadow-sm sm:p-10">
            {sent ? (
              <div className="py-8 text-center">
                <p className="font-script text-4xl text-gold-deep">
                  {t({ es: "¡Gracias!", en: "Thank you!" })}
                </p>
                <h2 className="font-display mt-3 text-2xl font-bold">
                  {t({ es: "Hemos recibido tu solicitud", en: "We've received your request" })}
                </h2>
                {routeLabel && (
                  <p className="mt-2 text-sm text-muted-foreground">
                    {t({ es: "Ruta elegida:", en: "Chosen route:" })} {t(routeLabel.name)}
                  </p>
                )}
                <p className="mx-auto mt-3 max-w-md text-sm text-muted-foreground">
                  {whatsappIsDirect() || CONTACT_EMAIL
                    ? t({ es: "Se ha abierto tu mensajería con el resumen. Si no, cópialo y escríbenos.", en: "Your messaging app has opened with the summary. If not, copy it and send it to us." })
                    : t({
                        es: "Muy pronto activaremos WhatsApp y el email aquí. Mientras tanto, guárdanos esta página y escríbenos en cuanto esté listo.",
                        en: "We'll connect WhatsApp and email here very soon. Meanwhile, keep this page handy and reach out once it's ready.",
                      })}
                </p>
                <p className="mx-auto mt-5 max-w-lg rounded-xl bg-secondary p-4 text-left text-sm whitespace-pre-line text-foreground/80">
                  {buildMessage()}
                </p>
                <button
                  onClick={() => setSent(false)}
                  className="mt-6 text-sm font-semibold text-gold-deep hover:text-kasbah"
                >
                  {t({ es: "Enviar otra solicitud", en: "Send another request" })}
                </button>
              </div>
            ) : (
              <form onSubmit={submit} noValidate>
                <h2 className="font-display text-2xl font-bold">
                  {t({ es: "Solicita tu presupuesto", en: "Request your quote" })}
                </h2>
                <div className="mt-6 grid gap-5 sm:grid-cols-2">
                  <label className="block">
                    <span className="text-sm font-medium">{t({ es: "Nombre", en: "Name" })} *</span>
                    <input
                      value={form.name}
                      onChange={set("name")}
                      className="mt-1.5 w-full rounded-xl border border-input bg-background px-4 py-2.5 text-sm outline-none focus:border-gold focus:ring-2 focus:ring-gold/30"
                    />
                  </label>
                  <label className="block">
                    <span className="text-sm font-medium">Email *</span>
                    <input
                      type="email"
                      value={form.email}
                      onChange={set("email")}
                      className="mt-1.5 w-full rounded-xl border border-input bg-background px-4 py-2.5 text-sm outline-none focus:border-gold focus:ring-2 focus:ring-gold/30"
                    />
                  </label>
                  <label className="block">
                    <span className="text-sm font-medium">{t({ es: "Teléfono / WhatsApp", en: "Phone / WhatsApp" })}</span>
                    <input
                      value={form.phone}
                      onChange={set("phone")}
                      className="mt-1.5 w-full rounded-xl border border-input bg-background px-4 py-2.5 text-sm outline-none focus:border-gold focus:ring-2 focus:ring-gold/30"
                    />
                  </label>
                  <label className="block">
                    <span className="text-sm font-medium">{t({ es: "Ruta de interés", en: "Route of interest" })}</span>
                    <select
                      value={form.route}
                      onChange={set("route")}
                      className="mt-1.5 w-full rounded-xl border border-input bg-background px-4 py-2.5 text-sm outline-none focus:border-gold focus:ring-2 focus:ring-gold/30"
                    >
                      <option value="">{t({ es: "Sin preferencia", en: "No preference" })}</option>
                      {siteContent.routes.map((r) => (
                        <option key={r.slug} value={r.slug}>
                          {t(r.name)}
                        </option>
                      ))}
                    </select>
                  </label>
                  <label className="block">
                    <span className="text-sm font-medium">{t({ es: "Fecha aproximada", en: "Approximate date" })}</span>
                    <input
                      type="date"
                      value={form.date}
                      onChange={set("date")}
                      className="mt-1.5 w-full rounded-xl border border-input bg-background px-4 py-2.5 text-sm outline-none focus:border-gold focus:ring-2 focus:ring-gold/30"
                    />
                  </label>
                  <label className="block">
                    <span className="text-sm font-medium">{t({ es: "Nº de viajeros", en: "Travellers" })}</span>
                    <input
                      type="number"
                      min={1}
                      value={form.travelers}
                      onChange={set("travelers")}
                      className="mt-1.5 w-full rounded-xl border border-input bg-background px-4 py-2.5 text-sm outline-none focus:border-gold focus:ring-2 focus:ring-gold/30"
                    />
                  </label>
                  <label className="block">
                    <span className="text-sm font-medium">{t({ es: "Privado o grupo", en: "Private or group" })}</span>
                    <select
                      value={form.mode}
                      onChange={set("mode")}
                      className="mt-1.5 w-full rounded-xl border border-input bg-background px-4 py-2.5 text-sm outline-none focus:border-gold focus:ring-2 focus:ring-gold/30"
                    >
                      <option value="private">{t({ es: "Privado", en: "Private" })}</option>
                      <option value="group">{t({ es: "En grupo", en: "Group" })}</option>
                    </select>
                  </label>
                  <label className="block sm:col-span-2">
                    <span className="text-sm font-medium">{t({ es: "Mensaje", en: "Message" })}</span>
                    <textarea
                      rows={4}
                      value={form.message}
                      onChange={set("message")}
                      className="mt-1.5 w-full rounded-xl border border-input bg-background px-4 py-2.5 text-sm outline-none focus:border-gold focus:ring-2 focus:ring-gold/30"
                    />
                  </label>
                </div>
                {error && <p className="mt-4 text-sm font-medium text-destructive">{error}</p>}
                <button
                  type="submit"
                  className="mt-7 inline-flex items-center gap-2 rounded-full bg-gold px-8 py-3.5 text-sm font-semibold text-night shadow-lg shadow-gold/30 transition-colors hover:bg-gold-light"
                >
                  <Send className="h-4 w-4" />
                  {t({ es: "Enviar solicitud", en: "Send request" })}
                </button>
              </form>
            )}
          </div>
        </Reveal>

        <Reveal className="mt-10 grid gap-5 sm:grid-cols-2" delayMs={100}>
          <div className="rounded-2xl border border-border bg-card p-6 text-center">
            <MessageCircle className="mx-auto h-6 w-6 text-gold-deep" />
            <h3 className="font-display mt-3 font-bold">WhatsApp</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              {whatsappIsDirect()
                ? t({ es: "Escríbenos directamente desde el botón verde.", en: "Message us directly from the green button." })
                : t({ es: "Número en camino — mientras tanto, usa el formulario.", en: "Number coming soon — meanwhile, use the form." })}
            </p>
          </div>
          <div className="rounded-2xl border border-border bg-card p-6 text-center">
            <MapPin className="mx-auto h-6 w-6 text-gold-deep" />
            <h3 className="font-display mt-3 font-bold">{t({ es: "Base", en: "Base" })}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{siteContent.contact.details.base}</p>
            <p className="mt-3 text-xs text-muted-foreground">
              {t({
                es: "Todas las rutas salen de Marrakech. Consulta otros puntos de salida.",
                en: "All routes start in Marrakech. Ask about other pick-up points.",
              })}
            </p>
          </div>
        </Reveal>

        <Reveal className="mt-10 text-center" delayMs={150}>
          <Link to="/faq" className="text-sm font-semibold text-gold-deep hover:text-kasbah">
            {t({ es: "¿Preguntas? Mira el FAQ", en: "Questions? Check the FAQ" })}
          </Link>
        </Reveal>
      </section>
    </>
  );
}
