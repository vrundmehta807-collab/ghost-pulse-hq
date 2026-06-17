import { createFileRoute } from "@tanstack/react-router";
import { team } from "@/data/paranormal";
import { OperativePortrait } from "@/components/GhostArt";
import { SectionHeader } from "./index";

export const Route = createFileRoute("/team")({
  head: () => ({
    meta: [
      { title: "Ghost Busters Team — Ghost Hunter HQ" },
      { name: "description", content: "Elite paranormal operatives. Profiles, equipment and experience levels." },
    ],
  }),
  component: TeamPage,
});

function TeamPage() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-12">
      <SectionHeader title="GHOST BUSTERS TEAM" sub="Elite operatives · Sector 7 division" />
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {team.map((m, i) => (
          <div key={m.name} className="holo rounded-lg p-4 relative overflow-hidden animate-rise" style={{ animationDelay: `${i * 80}ms` }}>
            <div className="absolute top-2 right-2 font-mono text-[9px] text-[var(--neon)]/70">OP-{String(i + 1).padStart(3, "0")}</div>
            <OperativePortrait gender={m.gender} name={m.name} />
            <div className="mt-3">
              <div className="font-display text-lg neon-text">{m.name}</div>
              <div className="font-mono text-[11px] text-[var(--blood)] tracking-widest">{m.role}</div>
              <div className="mt-3 grid grid-cols-2 gap-y-1 font-mono text-[11px]">
                <div className="text-[var(--ghost)]/50">AGE</div>
                <div className="text-right text-[var(--neon)]">{m.age}</div>
                <div className="text-[var(--ghost)]/50">ABILITY</div>
                <div className="text-right text-[var(--ghost)]/80 text-[10px]">{m.ability}</div>
                <div className="text-[var(--ghost)]/50">EQUIPMENT</div>
                <div className="text-right text-[var(--ghost)]/80 text-[10px]">{m.equipment}</div>
              </div>
              <div className="mt-3">
                <div className="flex justify-between font-mono text-[10px] mb-1">
                  <span className="text-[var(--ghost)]/50">EXPERIENCE</span>
                  <span className="text-[var(--neon)]">{m.exp}%</span>
                </div>
                <div className="h-1.5 w-full rounded-full bg-[var(--deep)] neon-border overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-[var(--neon)] to-[var(--blood)]" style={{ width: `${m.exp}%` }} />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
