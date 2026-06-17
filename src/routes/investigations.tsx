import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ghosts, reports, type Ghost } from "@/data/paranormal";
import { Scanner } from "@/components/d3/Charts";
import { GhostSilhouette } from "@/components/GhostArt";
import { SectionHeader, Panel } from "./index";

export const Route = createFileRoute("/investigations")({
  head: () => ({
    meta: [
      { title: "Investigation Center — Ghost Hunter HQ" },
      { name: "description", content: "Mission-control dashboard. Search, filter, scan, and encounter ghosts." },
    ],
  }),
  component: InvestigationsPage,
});

function InvestigationsPage() {
  const [q, setQ] = useState("");
  const [threat, setThreat] = useState<string>("ALL");
  const [type, setType] = useState<string>("ALL");
  const [minRating, setMinRating] = useState(0);
  const [encounter, setEncounter] = useState<Ghost | null>(null);

  const types = useMemo(() => Array.from(new Set(ghosts.map((g) => g.type))), []);
  const filtered = ghosts.filter((g) => {
    const matchQ = !q || [g.name, g.type, g.location].some((s) => s.toLowerCase().includes(q.toLowerCase()));
    const matchT = threat === "ALL" || g.threat === threat;
    const matchType = type === "ALL" || g.type === type;
    const matchR = g.rating >= minRating;
    return matchQ && matchT && matchType && matchR;
  });

  const playRoar = () => {
    try {
      const AC = (window.AudioContext || (window as any).webkitAudioContext);
      if (!AC) return;
      const ctx = new AC();
      const o = ctx.createOscillator();
      const g = ctx.createGain();
      o.type = "sawtooth";
      o.frequency.setValueAtTime(120, ctx.currentTime);
      o.frequency.exponentialRampToValueAtTime(60, ctx.currentTime + 0.8);
      g.gain.setValueAtTime(0.2, ctx.currentTime);
      g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.2);
      o.connect(g).connect(ctx.destination);
      o.start(); o.stop(ctx.currentTime + 1.2);
    } catch {}
  };

  const encounterRandom = () => {
    const g = ghosts[Math.floor(Math.random() * ghosts.length)];
    setEncounter(g);
    playRoar();
    setTimeout(() => setEncounter(null), 5000);
  };

  return (
    <section className="mx-auto max-w-7xl px-4 py-12">
      <SectionHeader title="INVESTIGATION CENTER" sub="Mission control · live operations" />

      {/* Top row */}
      <div className="grid lg:grid-cols-[1fr_1.4fr] gap-4 mb-4">
        <Panel title="PARANORMAL SCANNER" subtitle="Active sweep · 666.42 MHz">
          <Scanner />
          <div className="mt-3 font-mono text-[10px] text-[var(--neon)]/70 text-center">▓ DETECTING NEARBY SIGNALS ▓</div>
        </Panel>
        <Panel title="GHOST FILTERS" subtitle="Search · type · threat · rating">
          <div className="grid sm:grid-cols-2 gap-3">
            <Field label="SEARCH">
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="name / type / location"
                className="w-full bg-[var(--deep)] border border-[var(--neon)]/30 rounded-md px-3 py-2 text-sm text-[var(--ghost)] focus:outline-none focus:border-[var(--neon)]"
              />
            </Field>
            <Field label="THREAT">
              <select value={threat} onChange={(e) => setThreat(e.target.value)}
                className="w-full bg-[var(--deep)] border border-[var(--neon)]/30 rounded-md px-3 py-2 text-sm text-[var(--ghost)]">
                {["ALL", "MODERATE", "HIGH", "EXTREME"].map((t) => <option key={t}>{t}</option>)}
              </select>
            </Field>
            <Field label="TYPE">
              <select value={type} onChange={(e) => setType(e.target.value)}
                className="w-full bg-[var(--deep)] border border-[var(--neon)]/30 rounded-md px-3 py-2 text-sm text-[var(--ghost)]">
                <option>ALL</option>
                {types.map((t) => <option key={t}>{t}</option>)}
              </select>
            </Field>
            <Field label={`MIN RATING ${minRating}`}>
              <input type="range" min={0} max={5} step={0.5} value={minRating}
                onChange={(e) => setMinRating(Number(e.target.value))}
                className="w-full accent-[var(--neon)]" />
            </Field>
          </div>
          <div className="mt-4">
            <button
              onClick={encounterRandom}
              className="w-full blood-border rounded-md px-4 py-3 font-display text-xs tracking-widest text-[var(--blood)] hover:bg-[var(--blood)]/10 transition animate-pulse-neon"
              style={{ boxShadow: "0 0 18px rgba(255,49,49,0.4)" }}
            >
              ⚠ ENCOUNTER RANDOM GHOST ⚠
            </button>
          </div>
        </Panel>
      </div>

      {/* Results & reports */}
      <div className="grid lg:grid-cols-[1.5fr_1fr] gap-4">
        <Panel title={`FILTERED ENTITIES · ${filtered.length}`} subtitle="Live database query">
          <div className="grid sm:grid-cols-2 gap-3 max-h-[560px] overflow-y-auto pr-1">
            {filtered.map((g) => (
              <div key={g.name} className="border border-[var(--neon)]/20 rounded-md p-3 flex gap-3">
                <GhostSilhouette kind={g.silhouette || "male"} className="h-20 w-16 shrink-0 rounded" />
                <div className="min-w-0">
                  <div className="font-display text-sm neon-text truncate">{g.name}</div>
                  <div className="font-mono text-[10px] text-[var(--blood)]">{g.type}</div>
                  <div className="font-mono text-[10px] text-[var(--ghost)]/60">{g.location} · {g.threat}</div>
                </div>
              </div>
            ))}
            {filtered.length === 0 && (
              <div className="col-span-full text-center font-mono text-xs text-[var(--ghost)]/50 py-8">
                NO ENTITIES MATCH FILTERS
              </div>
            )}
          </div>
        </Panel>
        <Panel title="LIVE INVESTIGATION REPORTS" subtitle="Realtime field log" accent="blood">
          <div className="space-y-2">
            {reports.map((r) => (
              <div key={r.id} className="border border-[var(--blood)]/30 rounded-md p-3">
                <div className="flex items-center justify-between">
                  <div className="font-display text-sm blood-text">Investigation #{r.id}</div>
                  <span className="font-mono text-[9px] px-2 py-0.5 rounded-full border border-[var(--neon)]/40 text-[var(--neon)]">{r.status.toUpperCase()}</span>
                </div>
                <div className="font-mono text-[11px] text-[var(--ghost)]/70 mt-1">
                  LOCATION: <span className="text-[var(--neon)]">{r.location}</span>
                </div>
                <div className="font-mono text-[11px] text-[var(--ghost)]/70">
                  THREAT: <span className="text-[var(--blood)]">{r.threat}</span>
                </div>
              </div>
            ))}
          </div>
        </Panel>
      </div>

      {encounter && (
        <div className="fixed inset-0 z-[90] grid place-items-center bg-black/80 backdrop-blur-sm animate-flicker" onClick={() => setEncounter(null)}>
          <div className="holo rounded-lg p-6 max-w-sm text-center animate-rise">
            <div className="font-display text-xs blood-text mb-3">⚠ WARNING · ENTITY DETECTED ⚠</div>
            <GhostSilhouette kind={encounter.silhouette || "male"} className="mx-auto w-48 h-56" />
            <div className="mt-3 font-display text-lg neon-text">{encounter.name}</div>
            <div className="font-mono text-xs text-[var(--blood)]">{encounter.type} · {encounter.threat}</div>
            <div className="mt-2 font-mono text-[10px] text-[var(--ghost)]/60">{encounter.location}</div>
          </div>
        </div>
      )}
    </section>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <div className="font-mono text-[10px] text-[var(--neon)]/80 mb-1 tracking-widest">{label}</div>
      {children}
    </label>
  );
}
