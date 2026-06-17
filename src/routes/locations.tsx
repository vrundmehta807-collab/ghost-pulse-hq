import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import { locations } from "@/data/paranormal";
import { SectionHeader, Panel } from "./index";

export const Route = createFileRoute("/locations")({
  head: () => ({
    meta: [
      { title: "Haunted Locations — Ghost Hunter HQ" },
      { name: "description", content: "Interactive threat map of haunted zones across sector 7." },
    ],
  }),
  component: LocationsPage,
});

function LocationsPage() {
  const [hover, setHover] = useState<typeof locations[number] | null>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current) return;
    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();
    const W = 800, H = 500;
    svg.attr("viewBox", `0 0 ${W} ${H}`);
    // Grid
    const grid = svg.append("g").attr("opacity", 0.25);
    for (let i = 0; i < 20; i++) grid.append("line").attr("x1", i * (W / 20)).attr("x2", i * (W / 20)).attr("y1", 0).attr("y2", H).attr("stroke", "#00FFFF").attr("stroke-opacity", 0.2);
    for (let i = 0; i < 12; i++) grid.append("line").attr("y1", i * (H / 12)).attr("y2", i * (H / 12)).attr("x1", 0).attr("x2", W).attr("stroke", "#00FFFF").attr("stroke-opacity", 0.2);
    // landmass
    svg.append("path")
      .attr("d", "M50,400 C100,200 250,150 400,200 C550,250 700,150 750,300 C780,420 600,470 400,450 C200,470 80,470 50,400 Z")
      .attr("fill", "rgba(0,255,255,0.05)")
      .attr("stroke", "#00FFFF").attr("stroke-opacity", 0.4).attr("stroke-dasharray", "6 4");

    const colorScale = d3.scaleOrdinal<number, string>()
      .domain([1, 2, 3, 4, 5])
      .range(["#7fff7f", "#ffd166", "#ff8c42", "#FF3131", "#FF3131"]);

    const g = svg.append("g");
    locations.forEach((loc) => {
      const cx = (loc.x / 100) * W;
      const cy = (loc.y / 100) * H;
      const c = colorScale(loc.threat as any);
      // pulse rings
      g.append("circle").attr("cx", cx).attr("cy", cy).attr("r", 6).attr("fill", "none").attr("stroke", c).attr("stroke-opacity", 0.6)
        .style("transform-origin", `${cx}px ${cy}px`)
        .append("animate").attr("attributeName", "r").attr("from", 6).attr("to", 30).attr("dur", "2s").attr("repeatCount", "indefinite");
      g.append("circle").attr("cx", cx).attr("cy", cy).attr("r", 6).attr("fill", c).style("filter", `drop-shadow(0 0 10px ${c})`)
        .style("cursor", "pointer")
        .on("mouseenter", () => setHover(loc))
        .on("mouseleave", () => setHover(null));
      g.append("text").attr("x", cx + 10).attr("y", cy - 8).attr("fill", "#F5F5F5").attr("font-size", 10).attr("font-family", "monospace").text(loc.name);
    });
  }, []);

  return (
    <section className="mx-auto max-w-7xl px-4 py-12">
      <SectionHeader title="HAUNTED LOCATIONS" sub="Interactive threat map · hover markers for intel" />
      <div className="grid lg:grid-cols-[2fr_1fr] gap-4">
        <Panel title="THREAT MAP" subtitle="Sector 7 · classified zones">
          <div className="relative">
            <svg ref={svgRef} className="w-full h-auto" />
            {hover && (
              <div className="absolute top-2 left-2 holo rounded-md p-3 max-w-xs">
                <div className="font-display text-sm neon-text">{hover.name}</div>
                <div className="font-mono text-[10px] text-[var(--blood)]">THREAT LV {hover.threat} · {hover.ghosts} GHOST{hover.ghosts > 1 ? "S" : ""}</div>
                <p className="mt-1 text-xs text-[var(--ghost)]/70">{hover.report}</p>
              </div>
            )}
            <Legend />
          </div>
        </Panel>
        <Panel title="LOCATION INDEX" subtitle="All catalogued zones">
          <div className="space-y-2 max-h-[480px] overflow-y-auto pr-1">
            {locations.map((l) => (
              <div key={l.name} className="border border-[var(--neon)]/20 rounded-md p-3 hover:bg-[var(--neon)]/5 transition">
                <div className="flex items-center justify-between">
                  <div className="font-display text-sm neon-text">{l.name}</div>
                  <span className="font-mono text-[10px] px-2 py-0.5 rounded-full"
                    style={{ color: ["#7fff7f","#ffd166","#ff8c42","#FF3131","#FF3131"][l.threat - 1] }}>
                    LV{l.threat}
                  </span>
                </div>
                <div className="font-mono text-[10px] text-[var(--ghost)]/60 mt-1">{l.ghosts} ghost(s) · {l.report.slice(0, 60)}...</div>
              </div>
            ))}
          </div>
        </Panel>
      </div>
    </section>
  );
}

function Legend() {
  const items = [
    ["Safe", "#7fff7f"],
    ["Moderate", "#ffd166"],
    ["Dangerous", "#ff8c42"],
    ["Extreme", "#FF3131"],
  ];
  return (
    <div className="absolute bottom-2 right-2 holo rounded-md p-2 flex gap-3">
      {items.map(([l, c]) => (
        <div key={l} className="flex items-center gap-1 font-mono text-[10px]" style={{ color: c }}>
          <span className="h-2 w-2 rounded-full" style={{ background: c, boxShadow: `0 0 8px ${c}` }} />
          {l}
        </div>
      ))}
    </div>
  );
}
