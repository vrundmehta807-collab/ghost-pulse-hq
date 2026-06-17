import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { AmbientFx } from "@/components/effects/AmbientFx";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { LoadingProvider } from "@/components/LoadingProvider";

function NotFoundComponent() {
  return (
    <div className="relative z-10 flex min-h-screen items-center justify-center px-4">
      <div className="holo max-w-md text-center p-8 rounded-lg">
        <h1 className="font-display text-7xl blood-text animate-flicker">404</h1>
        <h2 className="mt-4 font-display text-xl neon-text">SIGNAL LOST</h2>
        <p className="mt-2 font-mono text-xs text-[var(--ghost)]/60">
          This sector is unreachable. The spirits have severed the link.
        </p>
        <Link
          to="/"
          className="mt-6 inline-block neon-border rounded-md px-4 py-2 font-display text-xs tracking-widest text-[var(--neon)] hover:bg-[var(--neon)]/10"
        >
          RETURN TO HQ
        </Link>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="relative z-10 flex min-h-screen items-center justify-center px-4">
      <div className="holo max-w-md text-center p-8 rounded-lg">
        <h1 className="font-display text-xl blood-text">PARANORMAL INTERFERENCE</h1>
        <p className="mt-2 font-mono text-xs text-[var(--ghost)]/60">
          The signal collapsed. Recalibrate the scanners and retry.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => { router.invalidate(); reset(); }}
            className="neon-border rounded-md px-4 py-2 font-display text-xs tracking-widest text-[var(--neon)] hover:bg-[var(--neon)]/10"
          >
            RETRY
          </button>
          <a href="/" className="blood-border rounded-md px-4 py-2 font-display text-xs tracking-widest text-[var(--blood)] hover:bg-[var(--blood)]/10">
            HQ
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Ghost Hunter HQ — Paranormal Investigation Dashboard" },
      { name: "description", content: "Cyberpunk paranormal investigation HQ tracking ghosts, haunted locations, and threat levels in real time." },
      { name: "theme-color", content: "#050505" },
      { property: "og:title", content: "Ghost Hunter HQ" },
      { property: "og:description", content: "Tracking paranormal entities across the unknown." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Orbitron:wght@500;700;900&family=Share+Tech+Mono&display=swap" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <LoadingProvider>
        <AmbientFx />
        <div className="relative z-10 min-h-screen flex flex-col">
          <Navbar />
          <main className="flex-1">
            <Outlet />
          </main>
          <Footer />
        </div>
      </LoadingProvider>
    </QueryClientProvider>
  );
}
