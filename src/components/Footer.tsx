export function Footer() {
  return (
    <footer className="relative z-10 mt-20 border-t border-[var(--neon)]/20 glass">
      <div className="mx-auto max-w-7xl px-4 py-8 grid gap-6 sm:grid-cols-3">
        <div>
          <div className="font-display neon-text">GHOST HUNTER HQ</div>
          <p className="mt-2 text-xs text-[var(--ghost)]/60">
            Tracking paranormal entities across the unknown since 2099.
          </p>
        </div>
        <div className="font-mono text-xs text-[var(--ghost)]/60">
          <div className="text-[var(--neon)] mb-1">// STATUS</div>
          <div>SYSTEM: <span className="text-green-400">ONLINE</span></div>
          <div>SECTORS: <span className="text-[var(--neon)]">8 / 8</span></div>
          <div>THREAT: <span className="text-[var(--blood)]">ELEVATED</span></div>
        </div>
        <div className="font-mono text-xs text-[var(--ghost)]/60">
          <div className="text-[var(--neon)] mb-1">// HQ</div>
          <div>Sector 7 · ITC MOGRI</div>
          <div>FREQ 666.42 MHz</div>
          <div>contact@ghosthunter.hq</div>
        </div>
      </div>
      <div className="border-t border-[var(--neon)]/10 py-3 text-center font-mono text-[10px] text-[var(--ghost)]/40">
        © 2099 GHOST HUNTER HQ · ALL SPIRITS RESERVED
      </div>
    </footer>
  );
}
