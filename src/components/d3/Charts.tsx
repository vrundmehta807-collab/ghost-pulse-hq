import { useEffect, useRef } from "react";
import * as d3 from "d3";

export function Counter({ to, label, color = "#00FFFF" }: { to: number; label: string; color?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    if (!ref.current) return;
    const node = ref.current;
    const i = d3.interpolateNumber(0, to);
    const t = d3.transition().duration(1800).ease(d3.easeCubicOut);
    d3.select(node).transition(t).tween("text", () => (tt) => {
      node.textContent = String(Math.floor(i(tt)));
    });
  }, [to]);
  return (
    <div className="holo rounded-lg p-4 sm:p-5 relative overflow-hidden">
      <div className="absolute inset-0 scan-lines pointer-events-none" />
      <div className="font-display text-3xl sm:text-4xl" style={{ color, textShadow: `0 0 12px ${color}` }}>
        <span ref={ref}>0</span>
      </div>
      <div className="mt-1 font-mono text-[10px] sm:text-xs uppercase tracking-widest text-[var(--ghost)]/60">
        {label}
      </div>
    </div>
  );
}

export function RadarChart() {
  const ref = useRef<SVGSVGElement>(null);
  useEffect(() => {
    if (!ref.current) return;
    const svg = d3.select(ref.current);
    svg.selectAll("*").remove();
    const size = 320, r = size / 2 - 20;
    svg.attr("viewBox", `0 0 ${size} ${size}`);
    const g = svg.append("g").attr("transform", `translate(${size / 2},${size / 2})`);
    const axes = ["EMF", "Temp", "Audio", "Visual", "Psychic", "Energy"];
    const data = [0.7, 0.5, 0.9, 0.6, 0.85, 0.75];
    const angle = (i: number) => (i / axes.length) * Math.PI * 2 - Math.PI / 2;

    [0.25, 0.5, 0.75, 1].forEach((f) => {
      g.append("circle").attr("r", r * f).attr("fill", "none")
        .attr("stroke", "#00FFFF").attr("stroke-opacity", 0.2);
    });
    axes.forEach((a, i) => {
      const x = Math.cos(angle(i)) * r, y = Math.sin(angle(i)) * r;
      g.append("line").attr("x2", x).attr("y2", y).attr("stroke", "#00FFFF").attr("stroke-opacity", 0.25);
      g.append("text").attr("x", x * 1.15).attr("y", y * 1.15)
        .attr("text-anchor", "middle").attr("dy", "0.35em")
        .attr("fill", "#00FFFF").attr("font-size", 10).attr("font-family", "monospace")
        .text(a);
    });
    const pts = data.map((d, i) => [Math.cos(angle(i)) * r * d, Math.sin(angle(i)) * r * d] as [number, number]);
    const line = d3.line().curve(d3.curveLinearClosed);
    g.append("path").attr("d", line(pts)!)
      .attr("fill", "#FF3131").attr("fill-opacity", 0.2)
      .attr("stroke", "#FF3131").attr("stroke-width", 2)
      .style("filter", "drop-shadow(0 0 8px #FF3131)");
    pts.forEach(([x, y]) => {
      g.append("circle").attr("cx", x).attr("cy", y).attr("r", 3)
        .attr("fill", "#00FFFF").style("filter", "drop-shadow(0 0 6px #00FFFF)");
    });
  }, []);
  return <svg ref={ref} className="w-full h-auto max-w-md mx-auto" />;
}

export function Heatmap() {
  const ref = useRef<SVGSVGElement>(null);
  useEffect(() => {
    if (!ref.current) return;
    const svg = d3.select(ref.current);
    svg.selectAll("*").remove();
    const W = 360, H = 180, cols = 24, rows = 7;
    svg.attr("viewBox", `0 0 ${W} ${H}`);
    const cw = W / cols, ch = (H - 30) / rows;
    const color = d3.scaleSequential([0, 1], (t) => d3.interpolateRgb("#12051E", "#FF3131")(t));
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const v = Math.abs(Math.sin(r * 0.7 + c * 0.4) * 0.5 + Math.random() * 0.5);
        svg.append("rect")
          .attr("x", c * cw + 2).attr("y", r * ch + 2)
          .attr("width", cw - 3).attr("height", ch - 3)
          .attr("fill", color(v)).attr("rx", 2)
          .style("filter", v > 0.7 ? "drop-shadow(0 0 4px #FF3131)" : "");
      }
    }
    ["00","04","08","12","16","20"].forEach((h, i) => {
      svg.append("text").attr("x", (i / 5) * (W - 20) + 10).attr("y", H - 8)
        .attr("fill", "#00FFFF").attr("font-size", 9).attr("font-family", "monospace").text(h + ":00");
    });
  }, []);
  return <svg ref={ref} className="w-full h-auto" />;
}

export function ThreatGraph() {
  const ref = useRef<SVGSVGElement>(null);
  useEffect(() => {
    if (!ref.current) return;
    const svg = d3.select(ref.current);
    svg.selectAll("*").remove();
    const W = 400, H = 180;
    svg.attr("viewBox", `0 0 ${W} ${H}`);
    const data = d3.range(40).map((i) => ({ x: i, y: 30 + Math.sin(i / 3) * 20 + Math.random() * 30 + i }));
    const x = d3.scaleLinear([0, 39], [10, W - 10]);
    const y = d3.scaleLinear([0, 100], [H - 20, 10]);
    const area = d3.area<{ x: number; y: number }>().x((d) => x(d.x)).y0(H - 20).y1((d) => y(d.y)).curve(d3.curveMonotoneX);
    const line = d3.line<{ x: number; y: number }>().x((d) => x(d.x)).y((d) => y(d.y)).curve(d3.curveMonotoneX);
    const grad = svg.append("defs").append("linearGradient").attr("id", "tg").attr("x1", "0").attr("x2", "0").attr("y1", "0").attr("y2", "1");
    grad.append("stop").attr("offset", "0%").attr("stop-color", "#FF3131").attr("stop-opacity", 0.6);
    grad.append("stop").attr("offset", "100%").attr("stop-color", "#FF3131").attr("stop-opacity", 0);
    svg.append("path").datum(data).attr("d", area).attr("fill", "url(#tg)");
    svg.append("path").datum(data).attr("d", line).attr("fill", "none").attr("stroke", "#00FFFF").attr("stroke-width", 2)
      .style("filter", "drop-shadow(0 0 6px #00FFFF)");
  }, []);
  return <svg ref={ref} className="w-full h-auto" />;
}

export function GhostDistribution({ data }: { data: { label: string; value: number }[] }) {
  const ref = useRef<SVGSVGElement>(null);
  useEffect(() => {
    if (!ref.current) return;
    const svg = d3.select(ref.current);
    svg.selectAll("*").remove();
    const W = 400, H = 200, m = { l: 80, r: 10, t: 10, b: 20 };
    svg.attr("viewBox", `0 0 ${W} ${H}`);
    const y = d3.scaleBand(data.map((d) => d.label), [m.t, H - m.b]).padding(0.25);
    const x = d3.scaleLinear([0, d3.max(data, (d) => d.value) || 1], [m.l, W - m.r]);
    svg.selectAll("rect").data(data).enter().append("rect")
      .attr("x", m.l).attr("y", (d) => y(d.label)!)
      .attr("height", y.bandwidth()).attr("width", 0)
      .attr("fill", "#00FFFF").attr("opacity", 0.8).attr("rx", 2)
      .style("filter", "drop-shadow(0 0 4px #00FFFF)")
      .transition().duration(1200).attr("width", (d) => x(d.value) - m.l);
    svg.selectAll("text.l").data(data).enter().append("text").attr("class", "l")
      .attr("x", m.l - 8).attr("y", (d) => y(d.label)! + y.bandwidth() / 2 + 4)
      .attr("text-anchor", "end").attr("font-size", 10).attr("font-family", "monospace")
      .attr("fill", "#F5F5F5").text((d) => d.label);
    svg.selectAll("text.v").data(data).enter().append("text").attr("class", "v")
      .attr("x", (d) => x(d.value) + 4).attr("y", (d) => y(d.label)! + y.bandwidth() / 2 + 4)
      .attr("font-size", 10).attr("font-family", "monospace").attr("fill", "#FF3131").text((d) => d.value);
  }, [data]);
  return <svg ref={ref} className="w-full h-auto" />;
}

export function Scanner() {
  const ref = useRef<SVGSVGElement>(null);
  useEffect(() => {
    if (!ref.current) return;
    const svg = d3.select(ref.current);
    svg.selectAll("*").remove();
    const size = 320, r = size / 2 - 10;
    svg.attr("viewBox", `0 0 ${size} ${size}`);
    const g = svg.append("g").attr("transform", `translate(${size / 2},${size / 2})`);
    [0.25, 0.5, 0.75, 1].forEach((f) =>
      g.append("circle").attr("r", r * f).attr("fill", "none").attr("stroke", "#00FFFF").attr("stroke-opacity", 0.25)
    );
    for (let i = 0; i < 12; i++) {
      const a = (i / 12) * Math.PI * 2;
      g.append("line").attr("x2", Math.cos(a) * r).attr("y2", Math.sin(a) * r)
        .attr("stroke", "#00FFFF").attr("stroke-opacity", 0.15);
    }
    const grad = svg.append("defs").append("radialGradient").attr("id", "scan-sweep");
    grad.append("stop").attr("offset", "0%").attr("stop-color", "#00FFFF").attr("stop-opacity", 0.7);
    grad.append("stop").attr("offset", "100%").attr("stop-color", "#00FFFF").attr("stop-opacity", 0);
    const sweep = g.append("path")
      .attr("d", d3.arc()({ innerRadius: 0, outerRadius: r, startAngle: 0, endAngle: Math.PI / 4 } as any))
      .attr("fill", "url(#scan-sweep)");
    const blips = d3.range(7).map(() => ({
      a: Math.random() * Math.PI * 2,
      r: 20 + Math.random() * (r - 30),
      t: Math.random() * 100,
    }));
    const blipSel = g.selectAll("circle.blip").data(blips).enter().append("circle")
      .attr("class", "blip").attr("r", 3).attr("fill", "#FF3131")
      .style("filter", "drop-shadow(0 0 8px #FF3131)");
    let a = 0;
    const timer = d3.timer((elapsed) => {
      a += 0.04;
      sweep.attr("transform", `rotate(${(a * 180 / Math.PI) % 360})`);
      blipSel
        .attr("cx", (d) => Math.cos(d.a) * d.r)
        .attr("cy", (d) => Math.sin(d.a) * d.r)
        .attr("opacity", (d) => 0.3 + 0.7 * Math.abs(Math.sin(elapsed / 600 + d.t)));
    });
    return () => { timer.stop(); };
  }, []);
  return <svg ref={ref} className="w-full max-w-sm mx-auto h-auto" />;
}
