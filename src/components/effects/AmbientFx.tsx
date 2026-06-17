import { useEffect, useRef } from "react";

export function AmbientFx() {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${e.clientX - 100}px, ${e.clientY - 100}px)`;
      }
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <>
      {/* Cursor glow */}
      <div
        ref={cursorRef}
        className="pointer-events-none fixed top-0 left-0 z-[60] h-[200px] w-[200px] rounded-full opacity-60 mix-blend-screen"
        style={{
          background:
            "radial-gradient(circle, rgba(0,255,255,0.25) 0%, rgba(0,255,255,0) 70%)",
        }}
      />
      {/* Fog layers */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div
          className="absolute -inset-x-1/4 top-0 h-1/2 animate-fog opacity-30"
          style={{
            background:
              "radial-gradient(ellipse at 30% 50%, rgba(0,255,255,0.12), transparent 60%), radial-gradient(ellipse at 70% 30%, rgba(255,49,49,0.08), transparent 60%)",
            filter: "blur(40px)",
          }}
        />
        <div
          className="absolute -inset-x-1/4 bottom-0 h-1/2 animate-fog opacity-40"
          style={{
            animationDirection: "alternate-reverse",
            background:
              "radial-gradient(ellipse at 60% 50%, rgba(167,139,220,0.15), transparent 60%)",
            filter: "blur(60px)",
          }}
        />
      </div>
      {/* Grid */}
      <div className="grid-bg pointer-events-none fixed inset-0 z-0 opacity-30" />
      {/* Scan lines */}
      <div className="scan-lines pointer-events-none fixed inset-0 z-0" />
      {/* Lightning flash */}
      <div className="animate-lightning pointer-events-none fixed inset-0 z-0 bg-white/10" />
      {/* Floating ghost particles */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        {Array.from({ length: 14 }).map((_, i) => (
          <div
            key={i}
            className="animate-float-ghost absolute rounded-full"
            style={{
              left: `${(i * 73) % 100}%`,
              top: `${(i * 41) % 100}%`,
              width: `${4 + (i % 4) * 3}px`,
              height: `${4 + (i % 4) * 3}px`,
              background: i % 3 === 0 ? "rgba(255,49,49,0.5)" : "rgba(0,255,255,0.5)",
              boxShadow: i % 3 === 0 ? "0 0 12px #FF3131" : "0 0 12px #00FFFF",
              animationDelay: `${i * 0.7}s`,
              animationDuration: `${6 + (i % 5)}s`,
            }}
          />
        ))}
      </div>
    </>
  );
}
