/** Map a navigation id to a concrete route path (type-safe for <Link to>). */
export function navTarget(id: string): "/" | "/routes" | "/experiences" | "/why-us" | "/gallery" | "/faq" | "/contact" {
  switch (id) {
    case "home":
      return "/";
    case "routes":
      return "/routes";
    case "experiences":
      return "/experiences";
    case "why":
      return "/why-us";
    case "gallery":
      return "/gallery";
    case "faq":
      return "/faq";
    default:
      return "/contact";
  }
}
