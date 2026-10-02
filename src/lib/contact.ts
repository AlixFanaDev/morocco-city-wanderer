/**
 * Contact channels. Fill these in when the business provides them —
 * the WhatsApp button falls back to the /contact page while empty.
 */
export const WHATSAPP_NUMBER = ""; // international format, digits only, e.g. 212612345678
export const CONTACT_EMAIL = ""; // e.g. bookings@mustitargui.com
export const INSTAGRAM_URL = ""; // e.g. https://instagram.com/mustitargui

export function whatsappHref(message?: string): string {
  if (!WHATSAPP_NUMBER) return "/contact";
  const text = message ? `?text=${encodeURIComponent(message)}` : "";
  return `https://wa.me/${WHATSAPP_NUMBER}${text}`;
}

export function whatsappIsDirect(): boolean {
  return Boolean(WHATSAPP_NUMBER);
}
