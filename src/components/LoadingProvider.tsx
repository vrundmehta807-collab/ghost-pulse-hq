import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from "react";
import * as d3 from "d3";

type Ctx = { trigger: () => void };
const LoadingCtx = createContext<Ctx>({ trigger: () => {} });
export const useLoading = () => useContext(LoadingCtx);

export function LoadingProvider({ children }: { children: ReactNode }) {
  const [phase, setPhase] = useState<"idle" | "loading" | "scare">("idle");
  const [progress, setProgress] = useState(0);
  const radarRef = useRef<SVGSVGElement>(null);

  const trigger = () => {
    setPhase("loading");
    setProgress(0);
  };

  useEffect(() => {
    if (phase !== "loading") return;
    const start = Date.now();
    const id = setInterval(() => {
      const p = Math.min(100, ((Date.now() - start) / 3000) * 100);
      setProgress(p);
    }, 50);
    const t1 = setTimeout(() => setPhase("scare"), 3000);
    const t2 = setTimeout(() => setPhase("idle"), 5000);
    return () => { clearInterval(id); clearTimeout(t1); clearTimeout(t2); };
  }, [phase]);

  // D3 radar
  useEffect(() => {
    if (phase !== "loading" || !radarRef.current) return;
    const svg = d3.select(radarRef.current);
    svg.selectAll("*").remove();
    const size = 240, r = size / 2;
    const g = svg.attr("viewBox", `0 0 ${size} ${size}`).append("g").attr("transform", `translate(${r},${r})`);
    [0.25, 0.5, 0.75, 1].forEach((f) => {
      g.append("circle").attr("r", r * f).attr("fill", "none")
        .attr("stroke", "#00FFFF").attr("stroke-opacity", 0.3);
    });
    for (let i = 0; i < 8; i++) {
      const a = (i / 8) * Math.PI * 2;
      g.append("line").attr("x1", 0).attr("y1", 0)
        .attr("x2", Math.cos(a) * r).attr("y2", Math.sin(a) * r)
        .attr("stroke", "#00FFFF").attr("stroke-opacity", 0.2);
    }
    // sweep
    const grad = svg.append("defs").append("radialGradient").attr("id", "sweep");
    grad.append("stop").attr("offset", "0%").attr("stop-color", "#00FFFF").attr("stop-opacity", 0.8);
    grad.append("stop").attr("offset", "100%").attr("stop-color", "#00FFFF").attr("stop-opacity", 0);
    const sweep = g.append("path")
      .attr("d", d3.arc()({ innerRadius: 0, outerRadius: r, startAngle: 0, endAngle: Math.PI / 3 } as any))
      .attr("fill", "url(#sweep)");
    let a = 0;
    const timer = d3.timer(() => {
      a += 0.05;
      sweep.attr("transform", `rotate(${(a * 180 / Math.PI) % 360})`);
    });
    // blips
    const blips = d3.range(5).map(() => ({ a: Math.random() * Math.PI * 2, r: Math.random() * r * 0.85 }));
    g.selectAll("circle.blip").data(blips).enter().append("circle")
      .attr("class", "blip")
      .attr("cx", (d) => Math.cos(d.a) * d.r)
      .attr("cy", (d) => Math.sin(d.a) * d.r)
      .attr("r", 3).attr("fill", "#FF3131")
      .style("filter", "drop-shadow(0 0 6px #FF3131)");
    return () => { timer.stop(); };
  }, [phase]);

  return (
    <LoadingCtx.Provider value={{ trigger }}>
      {children}
      {phase === "loading" && (
        <div className="fixed inset-0 z-[100] bg-[#050505]/95 backdrop-blur-md grid place-items-center">
          <div className="scan-lines absolute inset-0" />
          <div className="relative flex flex-col items-center gap-6 px-4">
            <div className="relative">
              <svg ref={radarRef} className="h-60 w-60" />
              <div className="absolute inset-0 grid place-items-center text-[var(--neon)] font-display text-xs tracking-widest">
                SCANNING
              </div>
            </div>
            <div className="font-display text-sm tracking-[0.3em] neon-text animate-flicker">
              SCANNING PARANORMAL ACTIVITY...
            </div>
            <div className="w-80 max-w-[80vw]">
              <div className="h-1.5 w-full overflow-hidden rounded-full bg-[var(--deep)] neon-border">
                <div
                  className="h-full bg-gradient-to-r from-[var(--neon)] to-[var(--blood)] transition-[width] duration-100"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <div className="mt-2 flex justify-between font-mono text-[10px] text-[var(--neon)]/70">
                <span>FREQ 666.42 MHz</span>
                <span>{Math.floor(progress)}%</span>
              </div>
            </div>
          </div>
        </div>
      )}
      {phase === "scare" && <Jumpscare />}
    </LoadingCtx.Provider>
  );
}

function Jumpscare() {
  useEffect(() => {
    try {
      const AC = (window.AudioContext || (window as any).webkitAudioContext);
      if (!AC) return;
      const ctx = new AC();
      const o = ctx.createOscillator();
      const g = ctx.createGain();
      o.type = "sawtooth";
      o.frequency.setValueAtTime(80, ctx.currentTime);
      o.frequency.exponentialRampToValueAtTime(400, ctx.currentTime + 0.4);
      g.gain.setValueAtTime(0.25, ctx.currentTime);
      g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.5);
      o.connect(g).connect(ctx.destination);
      o.start();
      o.stop(ctx.currentTime + 1.5);
    } catch {}
  }, []);
  return (
    <div className="fixed inset-0 z-[110] bg-black grid place-items-center overflow-hidden animate-flicker">
      <div className="animate-jumpscare">
        <svg viewBox="0 0 200 200" className="h-[60vmin] w-[60vmin]"
          style={{ filter: "drop-shadow(0 0 40px #FF3131)" }}>
          <defs>
            <radialGradient id="ghostG" cx="50%" cy="40%">
              <stop offset="0%" stopColor="#F5F5F5" />
              <stop offset="70%" stopColor="#a78bdc" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#12051E" stopOpacity="0" />
            </radialGradient>
          </defs>
          <path d="M100,15 C50,15 35,60 35,110 L35,180 L55,160 L75,180 L100,160 L125,180 L145,160 L165,180 L165,110 C165,60 150,15 100,15 Z"
            fill="url(#ghostG)" />
          <ellipse cx="75" cy="90" rx="10" ry="16" fill="#FF3131" />
          <ellipse cx="125" cy="90" rx="10" ry="16" fill="#FF3131" />
          <path d="M70,130 Q100,165 130,130 Q115,150 100,140 Q85,150 70,130 Z" fill="#000" />
        </svg>
      </div>
      <div className="absolute inset-0 mix-blend-screen pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(255,49,49,0.4), transparent 60%)" }} />
    </div>
  );
}
