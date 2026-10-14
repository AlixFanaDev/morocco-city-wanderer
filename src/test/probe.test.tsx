import { QueryClient } from "@tanstack/react-query";
import { createMemoryHistory, createRouter } from "@tanstack/react-router";
import { describe, expect, it } from "vitest";

import { routeTree } from "@/routeTree.gen";

function makeRouter(path: string) {
  return createRouter({
    routeTree,
    context: { queryClient: new QueryClient() },
    history: createMemoryHistory({ initialEntries: [path] }),
  });
}

describe("probe load", () => {
  it("index resolves", async () => {
    const router = makeRouter("/");
    await router.load();
    console.log("IDX matches:", router.state.matches.map((m) => m.routeId).join(" > "));
    console.log("IDX pathname:", router.state.pathname, "status:", router.state.status);
  });

  it("unknown resolves", async () => {
    const router = makeRouter("/this-route-does-not-exist");
    await router.load();
    console.log("NF matches:", router.state.matches.map((m) => m.routeId).join(" > "));
    console.log("NF pathname:", router.state.pathname, "status:", router.state.status);
    console.log("NF last routeId:", router.state.matches[router.state.matches.length - 1]?.routeId);
  });

  it("route detail resolves", async () => {
    const router = makeRouter("/routes/kasbah-express-2d");
    await router.load();
    console.log("DT matches:", router.state.matches.map((m) => m.routeId).join(" > "));
  });
});
