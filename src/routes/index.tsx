import { createFileRoute, Link } from "@tanstack/react-router";
import { Counter, GhostDistribution, Heatmap, RadarChart, ThreatGraph } from "@/components/d3/Charts";
import { useLoading } from "@/components/LoadingProvider";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Ghost Hunter HQ — Command Center" },
      { name: "description", content: "Live paranormal stats, threat radar, and ghost distribution from the field." },
    ],
  }),
  component: Home,
});

function Home() {
  const { trigger } = useLoading();
  return (
    <div className="relative">
      {/* HERO */}
      <section className="relative overflow-hidden border-b border-[var(--neon)]/15">
        <HauntedBackdrop />
        <div className="relative mx-auto max-w-7xl px-4 py-20 sm:py-28">
          <div className="font-mono text-xs text-[var(--neon)] mb-4 animate-flicker">// LIVE FEED · SECTOR 7 · {new Date().toUTCString().slice(5, 22)}</div>
          <h1 className="font-display text-5xl sm:text-7xl lg:text-8xl font-black tracking-tight">
            <span className="neon-text">GHOST</span>{" "}
            <span className="blood-text">HUNTER</span>{" "}
            <span className="neon-text">HQ</span>
          </h1>
          <p className="mt-6 max-w-2xl font-mono text-sm sm:text-base text-[var(--ghost)]/80">
            Tracking paranormal entities across the unknown. A cyberpunk command center for elite spirit hunters.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/ghosts" onClick={() => trigger()} className="neon-border rounded-md px-5 py-3 font-display text-xs tracking-widest text-[var(--neon)] hover:bg-[var(--neon)]/10 transition">
              EXPLORE DATABASE →
            </Link>
            <Link to="/investigations" onClick={() => trigger()} className="blood-border rounded-md px-5 py-3 font-display text-xs tracking-widest text-[var(--blood)] hover:bg-[var(--blood)]/10 transition">
              START INVESTIGATION ◉
            </Link>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="relative mx-auto max-w-7xl px-4 py-12">
        <SectionHeader title="LIVE PARANORMAL STATS" sub="Real-time telemetry from active sensors" />
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          <Counter to={42} label="Ghosts Identified" />
          <Counter to={18} label="Ghosts Captured" color="#FF3131" />
          <Counter to={12} label="Active Investigations" />
          <Counter to={8} label="Haunted Locations" color="#a78bdc" />
        </div>
      </section>

      {/* DASHBOARD */}
      <section className="relative mx-auto max-w-7xl px-4 py-12">
        <SectionHeader title="PARANORMAL ACTIVITY DASHBOARD" sub="D3 telemetry · Live feed" />
        <div className="grid lg:grid-cols-2 gap-4">
          <Panel title="THREAT RADAR" subtitle="Sensor channels">
            <RadarChart />
          </Panel>
          <Panel title="THREAT LEVEL TIMELINE" subtitle="Past 40 hours">
            <ThreatGraph />
          </Panel>
          <Panel title="ACTIVITY HEATMAP" subtitle="By hour of day · 7 days">
            <Heatmap />
          </Panel>
          <Panel title="GHOST DISTRIBUTION" subtitle="By type">
            <GhostDistribution
              data={[
                { label: "Apparition", value: 12 },
                { label: "Shadow", value: 8 },
                { label: "Wraith", value: 6 },
                { label: "Phantom", value: 9 },
                { label: "Sentient", value: 7 },
              ]}
            />
          </Panel>
        </div>
      </section>
    </div>
  );
}

function HauntedBackdrop() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* Trees silhouette */}
      <svg viewBox="0 0 1200 400" preserveAspectRatio="none" className="absolute bottom-0 left-0 w-full h-2/3 opacity-70">
        <defs>
          <linearGradient id="treesG" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#12051E" />
            <stop offset="100%" stopColor="#050505" />
          </linearGradient>
        </defs>
        <path d="M0,400 L0,260 L40,200 L60,240 L90,180 L120,230 L160,150 L200,220 L240,170 L280,240 L320,160 L360,230 L400,140 L440,220 L480,170 L520,240 L560,160 L600,230 L640,150 L680,220 L720,170 L760,240 L800,160 L840,230 L880,140 L920,220 L960,170 L1000,240 L1040,160 L1080,230 L1120,180 L1160,240 L1200,200 L1200,400 Z" fill="url(#treesG)" />
      </svg>
      {/* Bats */}
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          className="absolute text-[var(--ghost)] opacity-60 animate-float-ghost"
          style={{
            top: `${10 + (i * 13) % 40}%`,
            left: `${(i * 17) % 90}%`,
            animationDelay: `${i * 1.2}s`,
            fontSize: `${12 + (i % 3) * 4}px`,
          }}
        >
          🦇
        </div>
      ))}
      {/* Moon */}
      <div className="absolute top-10 right-10 h-32 w-32 rounded-full"
        style={{
          background: "radial-gradient(circle, #f5f5f5 0%, #a78bdc 40%, transparent 70%)",
          boxShadow: "0 0 60px rgba(167,139,220,0.6)",
        }}
      />
    </div>
  );
}

export function SectionHeader({ title, sub }: { title: string; sub?: string }) {
  return (
    <div className="mb-6 flex items-end justify-between gap-4 flex-wrap">
      <div>
        <div className="font-mono text-[10px] text-[var(--blood)] tracking-[0.3em]">// SYSTEM</div>
        <h2 className="font-display text-2xl sm:text-3xl neon-text">{title}</h2>
        {sub && <div className="font-mono text-xs text-[var(--ghost)]/50">{sub}</div>}
      </div>
      <div className="font-mono text-[10px] text-[var(--neon)]/60 hidden sm:block">
        ▓▒░ DATA STREAM ░▒▓
      </div>
    </div>
  );
}

export function Panel({ title, subtitle, children, accent }: { title: string; subtitle?: string; children: React.ReactNode; accent?: "blood" }) {
  return (
    <div className="holo rounded-lg p-4 sm:p-5 relative overflow-hidden animate-rise">
      <div className="flex items-center justify-between mb-3">
        <div>
          <div className={"font-display text-xs tracking-widest " + (accent === "blood" ? "blood-text" : "neon-text")}>{title}</div>
          {subtitle && <div className="font-mono text-[10px] text-[var(--ghost)]/50">{subtitle}</div>}
        </div>
        <div className="flex gap-1">
          <span className="h-2 w-2 rounded-full bg-[var(--blood)] animate-pulse" />
          <span className="h-2 w-2 rounded-full bg-[var(--neon)] animate-pulse" style={{ animationDelay: "0.3s" }} />
          <span className="h-2 w-2 rounded-full bg-[#a78bdc] animate-pulse" style={{ animationDelay: "0.6s" }} />
        </div>
      </div>
      <div className="relative">{children}</div>
    </div>
  );
}
