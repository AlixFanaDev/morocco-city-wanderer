import { QueryClient } from "@tanstack/react-query";
import { createMemoryHistory, createRouter } from "@tanstack/react-router";
import { describe, expect, it } from "vitest";

import { routeTree } from "@/routeTree.gen";

// The root route ships a shellComponent that renders the whole <html> document,
// which cannot be mounted inside a test container. So these assert on the
// router's own resolution instead of DOM paint: routes are rewritten as the app
// is built and this must keep passing.
function makeRouter(path: string) {
  return createRouter({
    routeTree,
    context: { queryClient: new QueryClient() },
    history: createMemoryHistory({ initialEntries: [path] }),
  });
}

async function matchedRouteIds(path: string) {
  const router = makeRouter(path);
  await router.load();
  return router.state.matches.map((m) => m.routeId);
}

describe("App routing", () => {
  it("resolves the index route", async () => {
    expect(await matchedRouteIds("/")).toEqual(["__root__", "/"]);
  });

  it("resolves a route detail page", async () => {
    expect(await matchedRouteIds("/routes/kasbah-express-2d")).toEqual(["__root__", "/routes/$slug"]);
  });

  it("falls back to the root not-found route for unknown paths", async () => {
    expect(await matchedRouteIds("/this-route-does-not-exist")).toEqual(["__root__"]);
  });
});
