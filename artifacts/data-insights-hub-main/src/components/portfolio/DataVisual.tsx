const NODES = [
  { x: 20, y: 30 },
  { x: 52, y: 18 },
  { x: 80, y: 38 },
  { x: 34, y: 62 },
  { x: 66, y: 72 },
  { x: 14, y: 82 },
  { x: 88, y: 76 },
];

const EDGES: [number, number][] = [
  [0, 1],
  [1, 2],
  [0, 3],
  [3, 4],
  [4, 2],
  [3, 5],
  [4, 6],
  [1, 3],
];

const BARS = [38, 62, 46, 78, 55, 90];

export function DataVisual() {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-md">
      <div className="glass float-soft absolute inset-0 rounded-[2rem] p-6">
        <svg viewBox="0 0 100 100" className="h-full w-full" role="img" aria-label="Abstract network of connected data points">
          <defs>
            <linearGradient id="edge" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.7" />
              <stop offset="100%" stopColor="var(--violet)" stopOpacity="0.5" />
            </linearGradient>
          </defs>
          {EDGES.map(([a, b], i) => (
            <line
              key={i}
              x1={NODES[a]!.x}
              y1={NODES[a]!.y}
              x2={NODES[b]!.x}
              y2={NODES[b]!.y}
              stroke="url(#edge)"
              strokeWidth="0.4"
            />
          ))}
          {NODES.map((n, i) => (
            <g key={i}>
              <circle cx={n.x} cy={n.y} r="3.2" fill="var(--primary)" opacity="0.18">
                <animate
                  attributeName="r"
                  values="3.2;5.2;3.2"
                  dur={`${4 + (i % 4)}s`}
                  repeatCount="indefinite"
                />
              </circle>
              <circle cx={n.x} cy={n.y} r="1.5" fill="var(--primary)" />
            </g>
          ))}
        </svg>
      </div>

      <div className="glass absolute -bottom-4 -left-4 rounded-2xl p-4 shadow-[var(--shadow-card)] sm:-left-8">
        <p className="font-mono text-[10px] tracking-widest text-muted-foreground uppercase">
          insights
        </p>
        <div className="mt-3 flex h-16 items-end gap-1.5">
          {BARS.map((h, i) => (
            <span
              key={i}
              className="w-3 rounded-t-sm"
              style={{
                height: `${h}%`,
                background: "var(--gradient-brand)",
                opacity: 0.55 + i * 0.07,
              }}
            />
          ))}
        </div>
      </div>

      <div className="glass absolute -top-3 -right-2 rounded-2xl px-4 py-3 sm:-right-6">
        <p className="font-mono text-[10px] tracking-widest text-muted-foreground uppercase">
          model
        </p>
        <p className="font-display text-sm text-primary">Python · SQL · ML</p>
      </div>
    </div>
  );
}
