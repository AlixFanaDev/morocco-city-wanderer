<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

## Conventions

- All site copy lives in `src/content/site-content.json` as `{ es, en }` objects, and components read it through `useI18n().t()` — one source keeps Spanish and English from drifting apart.
- Internal navigation links go through `navTarget()` in `src/lib/nav.ts`; the router's `to` union is strict, so a literal path string in `<Link to>` breaks the typecheck.
- Contact channels are declared once in `src/lib/contact.ts`. Any WhatsApp or email affordance must be gated on `whatsappIsDirect()` (or a non-empty value) so an unfilled placeholder never renders a dead link or a floating button that covers content.
- Tests drive the router (`createRouter(...).load()` and `state.matches`), not the DOM: the root route's `shellComponent` renders the whole `<html>` document, which cannot be mounted inside a testing-library container.
- Web fonts load from a `<link>` in the head of `src/routes/__root.tsx`, never via `@import` in `src/styles.css` — Tailwind v4's Lightning CSS build resolves `@import` from the filesystem only.
