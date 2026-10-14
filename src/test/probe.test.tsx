import { QueryClient } from "@tanstack/react-query";
import { createMemoryHistory, createRouter, RouterProvider } from "@tanstack/react-router";
import { render, waitFor } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { routeTree } from "@/routeTree.gen";

function makeRouter(path: string) {
  const queryClient = new QueryClient();
  return createRouter({
    routeTree,
    context: { queryClient },
    history: createMemoryHistory({ initialEntries: [path] }),
  });
}

describe("probe", () => {
  it("A: render into document.body", async () => {
    const router = makeRouter("/");
    render(<RouterProvider router={router} />, { container: document.body });
    await new Promise((r) => setTimeout(r, 400));
    console.log("A body html length:", document.body.innerHTML.length);
    console.log("A body text:", document.body.textContent?.slice(0, 120));
  });

  it("B: router state after load", async () => {
    const router = makeRouter("/");
    render(<RouterProvider router={router} />);
    await waitFor(() => expect(router.state.status).toBe("success"));
    console.log("B matched:", router.state.routes.map((r) => r.id).join(" > "));
  });

  it("C: not-found router state", async () => {
    const router = makeRouter("/nope-does-not-exist");
    render(<RouterProvider router={router} />);
    await waitFor(() => expect(router.state.status).toBe("success"));
    console.log("C matched:", router.state.routes.map((r) => r.id).join(" > "));
  });
});
