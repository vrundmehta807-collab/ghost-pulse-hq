type Kind = NonNullable<import("@/data/paranormal").Ghost["silhouette"]>;

const palette = {
  bg: "url(#ghBg)",
  body: "url(#ghBody)",
  eye: "#FF3131",
};

export function GhostSilhouette({ kind = "male", className }: { kind?: Kind; className?: string }) {
  return (
    <svg viewBox="0 0 200 240" className={className} style={{ filter: "drop-shadow(0 0 12px rgba(0,255,255,0.5))" }}>
      <defs>
        <radialGradient id="ghBg" cx="50%" cy="40%">
          <stop offset="0%" stopColor="#1a0a2e" />
          <stop offset="100%" stopColor="#050505" />
        </radialGradient>
        <radialGradient id="ghBody" cx="50%" cy="40%">
          <stop offset="0%" stopColor="#a78bdc" stopOpacity="0.8" />
          <stop offset="70%" stopColor="#12051E" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#12051E" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="200" height="240" fill={palette.bg} />
      {/* Scan lines */}
      <g opacity="0.15">
        {Array.from({ length: 60 }).map((_, i) => (
          <line key={i} x1="0" y1={i * 4} x2="200" y2={i * 4} stroke="#00FFFF" strokeWidth="0.5" />
        ))}
      </g>
      {renderShape(kind)}
      {/* Frame */}
      <rect x="2" y="2" width="196" height="236" fill="none" stroke="#00FFFF" strokeOpacity="0.4" strokeDasharray="4 4" />
    </svg>
  );
}

function renderShape(kind: Kind) {
  switch (kind) {
    case "female":
      return (
        <g>
          <path d="M100,40 C70,40 60,70 65,100 C50,110 50,150 70,180 L70,220 L130,220 L130,180 C150,150 150,110 135,100 C140,70 130,40 100,40 Z" fill={palette.body} />
          <circle cx="85" cy="95" r="4" fill={palette.eye} />
          <circle cx="115" cy="95" r="4" fill={palette.eye} />
          <path d="M65,70 Q100,30 135,70" stroke="#a78bdc" strokeWidth="2" fill="none" opacity="0.7" />
        </g>
      );
    case "child":
      return (
        <g>
          <circle cx="100" cy="90" r="40" fill={palette.body} />
          <path d="M70,120 L70,220 L130,220 L130,120 Z" fill={palette.body} />
          <circle cx="88" cy="85" r="3" fill={palette.eye} />
          <circle cx="112" cy="85" r="3" fill={palette.eye} />
        </g>
      );
    case "soldier":
      return (
        <g>
          <path d="M70,60 L130,60 L140,90 L140,220 L60,220 L60,90 Z" fill={palette.body} />
          <line x1="60" y1="60" x2="140" y2="60" stroke="#FF3131" strokeWidth="3" />
          <path d="M80,40 Q100,30 120,40" stroke="#FF3131" strokeWidth="2" fill="none" />
        </g>
      );
    case "doctor":
      return (
        <g>
          <path d="M100,40 C75,40 65,70 70,100 L60,180 L70,220 L130,220 L140,180 L130,100 C135,70 125,40 100,40 Z" fill={palette.body} />
          <circle cx="85" cy="95" r="4" fill={palette.eye} />
          <circle cx="115" cy="95" r="4" fill={palette.eye} />
          <path d="M85,140 L115,140 M100,125 L100,155" stroke="#FF3131" strokeWidth="2" />
        </g>
      );
    case "nun":
      return (
        <g>
          <path d="M60,90 Q100,30 140,90 L150,220 L50,220 Z" fill={palette.body} />
          <circle cx="88" cy="100" r="4" fill={palette.eye} />
          <circle cx="112" cy="100" r="4" fill={palette.eye} />
          <path d="M100,130 L100,180 M85,150 L115,150" stroke="#F5F5F5" strokeWidth="2" opacity="0.6" />
        </g>
      );
    case "bride":
      return (
        <g>
          <path d="M100,40 C70,40 60,70 65,100 L40,220 L160,220 L135,100 C140,70 130,40 100,40 Z" fill={palette.body} />
          <path d="M65,60 L135,60 L155,30 L45,30 Z" fill="#F5F5F5" opacity="0.7" />
          <circle cx="88" cy="100" r="4" fill={palette.eye} />
          <circle cx="112" cy="100" r="4" fill={palette.eye} />
          <path d="M70,160 Q100,180 130,160" stroke="#FF3131" strokeWidth="2" fill="none" />
        </g>
      );
    case "shadow":
      return (
        <g>
          <path d="M100,30 C60,30 50,70 60,110 L50,220 L150,220 L140,110 C150,70 140,30 100,30 Z" fill="#050505" opacity="0.95" />
          <circle cx="88" cy="90" r="5" fill={palette.eye} />
          <circle cx="112" cy="90" r="5" fill={palette.eye} />
        </g>
      );
    case "male":
    default:
      return (
        <g>
          <path d="M100,40 C75,40 65,70 70,100 C55,110 55,150 75,180 L75,220 L125,220 L125,180 C145,150 145,110 130,100 C135,70 125,40 100,40 Z" fill={palette.body} />
          <circle cx="85" cy="95" r="4" fill={palette.eye} />
          <circle cx="115" cy="95" r="4" fill={palette.eye} />
          <path d="M85,140 Q100,155 115,140" stroke="#FF3131" strokeWidth="2" fill="none" />
        </g>
      );
  }
}

export function NoImagePlaceholder() {
  return (
    <div className="relative aspect-[5/6] w-full overflow-hidden rounded-md grid-bg holo grid place-items-center">
      <div className="text-center">
        <div className="font-display text-[var(--blood)] text-lg animate-flicker">SIGNAL LOST</div>
        <div className="mt-2 font-mono text-[10px] uppercase tracking-widest text-[var(--ghost)]/60 max-w-[80%] mx-auto">
          Image To Be Added By Admin
        </div>
        <div className="mt-3 font-mono text-[10px] text-[var(--neon)]/70">▓▒░ NO VISUAL DATA ░▒▓</div>
      </div>
      <div className="absolute inset-0 scan-lines" />
    </div>
  );
}

export function OperativePortrait({ gender, name }: { gender: "male" | "female"; name: string }) {
  const initials = name.split(" ").map((s) => s[0]).join("").slice(0, 2);
  return (
    <div className="relative aspect-square w-full overflow-hidden rounded-md holo grid place-items-center">
      <svg viewBox="0 0 200 200" className="w-full h-full">
        <defs>
          <radialGradient id={`p-${name}`} cx="50%" cy="40%">
            <stop offset="0%" stopColor={gender === "female" ? "#ff8fbc" : "#7fe3ff"} stopOpacity="0.5" />
            <stop offset="100%" stopColor="#12051E" stopOpacity="0" />
          </radialGradient>
        </defs>
        <rect width="200" height="200" fill="#0a0512" />
        <g opacity="0.2">
          {Array.from({ length: 50 }).map((_, i) => (
            <line key={i} x1="0" y1={i * 4} x2="200" y2={i * 4} stroke="#00FFFF" strokeWidth="0.4" />
          ))}
        </g>
        <circle cx="100" cy="80" r="40" fill={`url(#p-${name})`} stroke="#00FFFF" strokeOpacity="0.6" />
        <path
          d={
            gender === "female"
              ? "M50,200 C50,140 80,120 100,120 C120,120 150,140 150,200 Z"
              : "M55,200 C55,150 80,130 100,130 C120,130 145,150 145,200 Z"
          }
          fill={`url(#p-${name})`}
          stroke="#00FFFF"
          strokeOpacity="0.6"
        />
        <text x="100" y="92" textAnchor="middle" fill="#00FFFF" fontSize="22" fontFamily="monospace" fontWeight="bold">
          {initials}
        </text>
      </svg>
      <div className="absolute inset-0 scan-lines pointer-events-none" />
      <div className="absolute top-2 left-2 font-mono text-[9px] text-[var(--neon)]">ID-{Math.abs(hash(name)) % 9999}</div>
      <div className="absolute top-2 right-2 font-mono text-[9px] text-[var(--blood)]">●REC</div>
    </div>
  );
}

function hash(s: string) {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0;
  return h;
}
