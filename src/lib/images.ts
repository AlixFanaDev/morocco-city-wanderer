import hero from "@/assets/hero-sahara.jpg";
import kasbah from "@/assets/kasbah.jpg";
import coast from "@/assets/coast.jpg";
import gorge from "@/assets/gorge.jpg";
import camp from "@/assets/camp.jpg";
import chefchaouen from "@/assets/chefchaouen.jpg";
import fez from "@/assets/fez.jpg";
import marrakech from "@/assets/marrakech.jpg";

export const routeImages: Record<string, string> = {
  "kasbah-express-2d": kasbah,
  "atlantic-coast-3d": coast,
  "sahara-express-4d": hero,
  "kasbah-route-4d": gorge,
  "kasbah-route-5d": camp,
  "desert-to-fez-5d": fez,
  "kasbah-route-6d": marrakech,
  "signature-8d": chefchaouen,
};

export const galleryImages = [
  { src: hero, alt: { es: "Caravana de camellos al atardecer en las dunas de Merzouga", en: "Camel caravan at sunset over the Merzouga dunes" } },
  { src: kasbah, alt: { es: "Kasbah de Aït Ben Haddou al atardecer", en: "Aït Ben Haddou kasbah at sunset" } },
  { src: coast, alt: { es: "Puerto y murallas de Essaouira", en: "Essaouira harbour and ramparts" } },
  { src: gorge, alt: { es: "Gargantas del Todra", en: "Todra Gorge" } },
  { src: camp, alt: { es: "Campamento en el desierto bajo las estrellas", en: "Desert camp under the stars" } },
  { src: chefchaouen, alt: { es: "Calles azules de Chefchaouen", en: "Blue streets of Chefchaouen" } },
  { src: fez, alt: { es: "Zoco de la medina de Fez", en: "Souk in the Fez medina" } },
  { src: marrakech, alt: { es: "Marrakech al atardecer desde Jemaa el-Fna", en: "Marrakech at dusk from Jemaa el-Fna" } },
];

export type GalleryImage = (typeof galleryImages)[number];
