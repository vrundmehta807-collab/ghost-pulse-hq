import { Link } from "@tanstack/react-router";
import { useLoading } from "./LoadingProvider";
import { useState } from "react";

const links = [
  { to: "/", label: "Home" },
  { to: "/ghosts", label: "Ghost Database" },
  { to: "/locations", label: "Haunted Locations" },
  { to: "/team", label: "Ghost Busters" },
  { to: "/captured", label: "Captured Ghosts" },
  { to: "/investigations", label: "Investigations" },
  { to: "/contact", label: "Contact HQ" },
] as const;

export function Navbar() {
  const { trigger } = useLoading();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full">
      <div className="glass border-b border-[var(--neon)]/20">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
          <Link
            to="/"
            onClick={() => trigger()}
            className="flex items-center gap-2"
          >
            <div className="relative h-9 w-9">
              <div className="neon-border absolute inset-0 rounded-full animate-pulse-neon" />
              <div className="absolute inset-1 rounded-full bg-[var(--deep)] grid place-items-center text-[var(--neon)] font-display text-lg">
                👁
              </div>
            </div>
            <div className="leading-tight">
              <div className="font-display text-sm tracking-widest neon-text">GHOST HUNTER</div>
              <div className="font-mono text-[10px] text-[var(--blood)] tracking-[0.4em]">H Q · 2099</div>
            </div>
          </Link>
          <nav className="hidden lg:flex items-center gap-1">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => trigger()}
                className="group relative px-3 py-2 text-xs uppercase tracking-widest text-[var(--ghost)]/80 transition-colors hover:text-[var(--neon)]"
                activeProps={{ className: "text-[var(--neon)]" }}
              >
                <span className="relative z-10">{l.label}</span>
                <span className="absolute inset-0 rounded-md opacity-0 transition-opacity group-hover:opacity-100"
                  style={{ boxShadow: "inset 0 0 12px rgba(0,255,255,0.4), 0 0 12px rgba(0,255,255,0.3)" }} />
              </Link>
            ))}
          </nav>
          <button
            className="lg:hidden neon-border rounded-md px-3 py-2 text-xs text-[var(--neon)]"
            onClick={() => setOpen(!open)}
            aria-label="Menu"
          >
            {open ? "✕" : "☰"}
          </button>
        </div>
        {open && (
          <nav className="lg:hidden glass border-t border-[var(--neon)]/20 px-4 py-3 flex flex-col gap-1">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => { setOpen(false); trigger(); }}
                className="px-3 py-2 text-xs uppercase tracking-widest text-[var(--ghost)]/80 hover:text-[var(--neon)]"
                activeProps={{ className: "text-[var(--neon)]" }}
              >
                {l.label}
              </Link>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
}
