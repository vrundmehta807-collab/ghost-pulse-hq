import { createFileRoute } from "@tanstack/react-router";
import { captured } from "@/data/paranormal";
import { GhostSilhouette } from "@/components/GhostArt";
import { SectionHeader } from "./index";

export const Route = createFileRoute("/captured")({
  head: () => ({
    meta: [
      { title: "Captured Ghosts — Containment Facility" },
      { name: "description", content: "Containment chambers and status of captured paranormal entities." },
    ],
  }),
  component: CapturedPage,
});

const statusColor: Record<string, string> = {
  STABLE: "#7fff7f",
  VOLATILE: "#ff8c42",
  CONTAINED: "#00FFFF",
  CRITICAL: "#FF3131",
};

function CapturedPage() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-12">
      <SectionHeader title="CONTAINMENT FACILITY" sub={`${captured.length} entities under classified holding`} />
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {captured.map((c, i) => {
          const col = statusColor[c.status] || "#00FFFF";
          return (
            <div key={c.name} className="holo rounded-lg overflow-hidden relative animate-rise" style={{ animationDelay: `${i * 60}ms` }}>
              {/* Chamber */}
              <div className="relative aspect-square overflow-hidden">
                <div className="absolute inset-0" style={{
                  background: "radial-gradient(circle at 50% 60%, rgba(0,255,255,0.15), transparent 70%)",
                }} />
                <GhostSilhouette kind={(["male","female","child","shadow","doctor","nun","bride","soldier"][i % 8]) as any} className="absolute inset-0 w-full h-full opacity-90" />
                {/* Bars */}
                <div className="absolute inset-0 pointer-events-none">
                  {Array.from({ length: 7 }).map((_, j) => (
                    <div key={j} className="absolute top-0 bottom-0 w-px bg-[var(--neon)]/40"
                      style={{ left: `${(j + 1) * 12.5}%`, boxShadow: "0 0 6px rgba(0,255,255,0.5)" }} />
                  ))}
                </div>
                {/* Glass reflection */}
                <div className="absolute inset-0" style={{
                  background: "linear-gradient(135deg, rgba(255,255,255,0.06) 0%, transparent 40%, rgba(0,255,255,0.05) 100%)",
                }} />
                <div className="absolute top-2 left-2 font-mono text-[9px] text-[var(--neon)] flex items-center gap-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-[var(--blood)] animate-pulse" />
                  CHAMBER-{String(i + 1).padStart(2, "0")}
                </div>
                <div className="absolute top-2 right-2 font-mono text-[9px] px-2 py-0.5 rounded-full border"
                  style={{ color: col, borderColor: col, boxShadow: `0 0 8px ${col}55` }}>
                  {c.status}
                </div>
              </div>
              <div className="p-3 border-t border-[var(--neon)]/15">
                <div className="font-display text-sm neon-text leading-tight">{c.name}</div>
                <div className="mt-2 grid grid-cols-2 gap-y-1 font-mono text-[10px]">
                  <div className="text-[var(--ghost)]/50">CAPTURED</div>
                  <div className="text-right text-[var(--ghost)]/80">{c.date}</div>
                  <div className="text-[var(--ghost)]/50">THREAT</div>
                  <div className="text-right text-[var(--blood)]">{c.threat}</div>
                  <div className="text-[var(--ghost)]/50">METHOD</div>
                  <div className="text-right text-[var(--neon)]">{c.method}</div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
