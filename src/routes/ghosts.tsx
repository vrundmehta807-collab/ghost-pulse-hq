import { createFileRoute } from "@tanstack/react-router";
import { ghosts, type Ghost } from "@/data/paranormal";
import { GhostSilhouette, NoImagePlaceholder } from "@/components/GhostArt";
import { SectionHeader } from "./index";

export const Route = createFileRoute("/ghosts")({
  head: () => ({
    meta: [
      { title: "Ghost Database — Ghost Hunter HQ" },
      { name: "description", content: "Identified paranormal entities with threat levels, locations and backstories." },
    ],
  }),
  component: GhostsPage,
});

function GhostsPage() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-12">
      <SectionHeader title="GHOST DATABASE" sub={`${ghosts.length} entities catalogued · classified entries`} />
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {ghosts.map((g, i) => (
          <GhostCard key={g.name} ghost={g} idx={i} />
        ))}
      </div>
    </section>
  );
}

const threatColor: Record<Ghost["threat"], string> = {
  LOW: "#7fff7f",
  MODERATE: "#ffd166",
  HIGH: "#ff8c42",
  EXTREME: "#FF3131",
};

function GhostCard({ ghost, idx }: { ghost: Ghost; idx: number }) {
  const t = threatColor[ghost.threat];
  return (
    <article
      className="holo rounded-lg overflow-hidden relative group animate-rise"
      style={{ animationDelay: `${idx * 60}ms` }}
    >
      <div className="absolute inset-0 scan-lines pointer-events-none opacity-50" />
      <div className="p-3">
        {ghost.noImage && ghost.name === "Mr. Deep Sir" ? (
          <NoImagePlaceholder />
        ) : ghost.noImage ? (
          <div className="relative aspect-[5/6] w-full overflow-hidden rounded-md holo grid place-items-center">
            <GhostSilhouette kind={ghost.silhouette || "female"} className="h-full w-full" />
            <div className="absolute bottom-2 left-2 right-2 text-center font-mono text-[10px] text-[var(--ghost)]/70">
              Image To Be Added By Admin
            </div>
          </div>
        ) : (
          <GhostSilhouette kind={ghost.silhouette || "male"} className="aspect-[5/6] w-full rounded-md" />
        )}
      </div>
      <div className="p-4 pt-0">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-display text-lg neon-text leading-tight">{ghost.name}</h3>
          <span className="shrink-0 font-mono text-[9px] px-2 py-0.5 rounded-full border" style={{ color: t, borderColor: t, boxShadow: `0 0 10px ${t}55` }}>
            {ghost.threat}
          </span>
        </div>
        <div className="mt-1 font-mono text-xs text-[var(--blood)] tracking-widest">{ghost.type}</div>
        <div className="mt-3 grid grid-cols-2 gap-2 font-mono text-[11px]">
          <div className="text-[var(--ghost)]/50">LOCATION</div>
          <div className="text-[var(--neon)] text-right">{ghost.location}</div>
          <div className="text-[var(--ghost)]/50">HAUNTED</div>
          <div className="text-right">{renderStars(ghost.rating)}</div>
        </div>
        <p className="mt-3 text-xs text-[var(--ghost)]/70 leading-relaxed border-t border-[var(--neon)]/15 pt-3">
          {ghost.backstory}
        </p>
      </div>
    </article>
  );
}

function renderStars(r: number) {
  const full = Math.floor(r);
  const half = r % 1 >= 0.5;
  return (
    <span className="text-[var(--blood)]" style={{ textShadow: "0 0 6px #FF3131" }}>
      {"★".repeat(full)}{half ? "⯨" : ""}{"☆".repeat(5 - full - (half ? 1 : 0))}
    </span>
  );
}
