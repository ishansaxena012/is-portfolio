import { useState, useEffect } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

interface Metrics {
  cpu: number;
  memory: number;
  activeConnections: number;
  latencyP50: number;
  latencyP99: number;
}

interface LogEntry {
  time: string;
  method: string;
  path: string;
  status: string;
  cls: "ok" | "warn" | "err";
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

const nowTime = () => {
  const d = new Date();
  return [d.getHours(), d.getMinutes(), d.getSeconds()]
    .map((x) => x.toString().padStart(2, "0"))
    .join(":");
};

const ENDPOINTS = [
  "/api/v1/users",
  "/api/v1/auth/refresh",
  "/health",
  "/api/v1/orders",
  "/api/v1/orders/:id",
  "/api/v1/webhooks/stripe",
];
const METHODS = ["GET", "GET", "GET", "POST", "PATCH"];

// Weighted so failures are the exception, not one-in-six — that's what makes
// a log feel like a real service instead of a demo cycling through states.
const OUTCOME_WEIGHTS: { status: string; cls: LogEntry["cls"]; weight: number }[] = [
  { status: "200", cls: "ok", weight: 40 },
  { status: "201", cls: "ok", weight: 8 },
  { status: "304", cls: "ok", weight: 10 },
  { status: "404", cls: "warn", weight: 4 },
  { status: "429", cls: "warn", weight: 2 },
  { status: "500", cls: "err", weight: 1 },
];

const pick = <T,>(arr: T[]) => arr[Math.floor(Math.random() * arr.length)];

const pickWeighted = () => {
  const total = OUTCOME_WEIGHTS.reduce((s, o) => s + o.weight, 0);
  let r = Math.random() * total;
  for (const o of OUTCOME_WEIGHTS) {
    if ((r -= o.weight) <= 0) return o;
  }
  return OUTCOME_WEIGHTS[0];
};

// Exponential moving average toward a target, with small noise — reads as a
// system under real, slowly shifting load rather than a random number
// reroll on every tick.
const drift = (current: number, target: number, noise: number, pull = 0.15) => {
  const next = current + (target - current) * pull + (Math.random() - 0.5) * noise;
  return next;
};

const clamp = (n: number, min: number, max: number) => Math.max(min, Math.min(max, n));

// ─── Sub-components ───────────────────────────────────────────────────────────

const MetricBar = ({
  label,
  value,
  displayValue,
  pct,
  color,
}: {
  label: string;
  value: number;
  displayValue: string;
  pct: number;
  color: string;
}) => {
  const warnClass =
    value > 80 ? "text-red-400" : value > 60 ? "text-amber-400" : "text-zinc-100";
  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex justify-between items-baseline">
        <span className="text-[11px] font-medium uppercase tracking-widest text-zinc-500">
          {label}
        </span>
        <span
          className={`font-mono text-[13px] font-medium transition-colors duration-300 ${warnClass}`}
        >
          {displayValue}
        </span>
      </div>
      <div className="h-[3px] bg-zinc-800 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-1000 ease-out"
          style={{ width: `${pct}%`, background: color }}
        />
      </div>
    </div>
  );
};

const StatCard = ({
  label,
  value,
  sub,
}: {
  label: string;
  value: string;
  sub: React.ReactNode;
}) => (
  <div className="bg-zinc-900 rounded-lg p-3">
    <div className="text-[11px] uppercase tracking-widest text-zinc-600 font-medium mb-1">
      {label}
    </div>
    <div className="font-mono text-xl font-medium text-zinc-100 leading-tight">
      {value}
    </div>
    <div className="text-[11px] text-zinc-600 mt-0.5">{sub}</div>
  </div>
);

const LogLine = ({ entry }: { entry: LogEntry }) => {
  const statusColor =
    entry.cls === "ok"
      ? "text-emerald-400"
      : entry.cls === "warn"
        ? "text-amber-400"
        : "text-red-400";

  return (
    <div className="flex items-baseline gap-2 font-mono text-[11px] text-zinc-500 overflow-hidden animate-[slideIn_0.25s_ease-out]">
      <span className="text-zinc-700 shrink-0">{entry.time}</span>
      <span className={`font-medium shrink-0 w-11 ${statusColor}`}>{entry.method}</span>
      <span className="flex-1 overflow-hidden text-ellipsis whitespace-nowrap">
        {entry.path}
      </span>
      <span className={`shrink-0 ${statusColor}`}>{entry.status}</span>
    </div>
  );
};

// ─── Main Component ───────────────────────────────────────────────────────────

// Simulated load shifts every ~20-40s so the panel occasionally has a busier
// or quieter stretch, instead of hovering around one number forever.
const ServerMetrics = () => {
  const [metrics, setMetrics] = useState<Metrics>({
    cpu: 34,
    memory: 3.8,
    activeConnections: 842,
    latencyP50: 22,
    latencyP99: 61,
  });

  const [loadTarget, setLoadTarget] = useState(0.35); // 0-1, drives correlated metrics

  const [logs, setLogs] = useState<LogEntry[]>([
    { time: nowTime(), method: "GET", path: "/health", status: "200", cls: "ok" },
    { time: nowTime(), method: "POST", path: "/api/v1/auth/refresh", status: "200", cls: "ok" },
    { time: nowTime(), method: "GET", path: "/api/v1/orders", status: "200", cls: "ok" },
  ]);

  const [uptimeSeconds, setUptimeSeconds] = useState(9 * 86400 + 14 * 3600 + 7 * 60);

  // Occasionally shift the "load target" — this is what makes CPU, memory,
  // connections and latency move together like one system under one load,
  // rather than four independent random walks.
  useEffect(() => {
    const id = setInterval(() => {
      setLoadTarget(clamp(0.35 + (Math.random() - 0.5) * 0.5, 0.15, 0.85));
    }, 25000 + Math.random() * 15000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const id = setInterval(() => {
      setMetrics((prev) => {
        const cpu = clamp(drift(prev.cpu, 20 + loadTarget * 65, 3), 6, 97);
        const memory = clamp(drift(prev.memory, 2.5 + loadTarget * 8, 0.12), 1.2, 14.5);
        const activeConnections = Math.round(
          clamp(drift(prev.activeConnections, 300 + loadTarget * 4200, 40), 120, 7000)
        );
        const latencyP50 = Math.round(clamp(drift(prev.latencyP50, 14 + loadTarget * 45, 2.5), 6, 180));
        // p99 tracks p50 but keeps its own noise so it doesn't look like a formula
        const latencyP99 = Math.round(
          clamp(drift(prev.latencyP99, latencyP50 * 2.2 + loadTarget * 20, 6), latencyP50 + 4, 400)
        );
        return { cpu, memory, activeConnections, latencyP50, latencyP99 };
      });
    }, 1800);
    return () => clearInterval(id);
  }, [loadTarget]);

  // Log arrival rate also tracks load — busier system, more frequent lines.
  useEffect(() => {
    let cancelled = false;
    const scheduleNext = () => {
      const delay = clamp(2600 - loadTarget * 1800, 500, 4000) + Math.random() * 800;
      const id = setTimeout(() => {
        if (cancelled) return;
        const outcome = pickWeighted();
        const entry: LogEntry = {
          time: nowTime(),
          method: pick(METHODS),
          path: pick(ENDPOINTS),
          status: outcome.status,
          cls: outcome.cls,
        };
        setLogs((prev) => {
          const next = [...prev, entry];
          return next.length > 5 ? next.slice(next.length - 5) : next;
        });
        scheduleNext();
      }, delay);
      return id;
    };
    const timeoutId = scheduleNext();
    return () => {
      cancelled = true;
      clearTimeout(timeoutId);
    };
  }, [loadTarget]);

  // Tick uptime every second
  useEffect(() => {
    const id = setInterval(() => setUptimeSeconds((s) => s + 1), 1000);
    return () => clearInterval(id);
  }, []);

  const d = Math.floor(uptimeSeconds / 86400);
  const h = Math.floor((uptimeSeconds % 86400) / 3600);
  const m = Math.floor((uptimeSeconds % 3600) / 60);
  const uptime = `up ${d}d ${h}h ${m}m`;

  const memPct = (metrics.memory / 16) * 100;
  const healthy = metrics.cpu < 80;

  return (
    <div
      className="bg-zinc-950 border border-zinc-800/60 rounded-xl overflow-hidden shadow-2xl w-full"
      style={{ fontFamily: "'IBM Plex Sans', sans-serif" }}
    >
      {/* ── Header ── */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-zinc-800/60">
        <div className="flex items-center gap-2">
          <span
            className={`inline-block w-1.5 h-1.5 rounded-full ${healthy ? "bg-emerald-400" : "bg-amber-400"
              }`}
          />
          <span
            className="text-[13px] font-medium text-zinc-100 tracking-wide"
            style={{ fontFamily: "'IBM Plex Mono', monospace" }}
          >
            prod-api · ap-south-1
          </span>
        </div>
        <span
          className="text-[11px] text-zinc-500 bg-zinc-900 border border-zinc-800 rounded px-2 py-0.5"
          style={{ fontFamily: "'IBM Plex Mono', monospace" }}
        >
          {uptime}
        </span>
      </div>

      {/* ── Body ── */}
      <div className="flex flex-col gap-4 p-4">
        {/* CPU */}
        <MetricBar
          label="CPU Load"
          value={metrics.cpu}
          displayValue={`${metrics.cpu.toFixed(1)}%`}
          pct={metrics.cpu}
          color="#3b82f6"
        />

        {/* Memory */}
        <MetricBar
          label="Memory"
          value={memPct}
          displayValue={`${metrics.memory.toFixed(2)} / 16.00 GB`}
          pct={memPct}
          color="#10b981"
        />

        <hr className="border-zinc-800" />

        {/* Stat cards */}
        <div className="grid grid-cols-2 gap-2.5">
          <StatCard
            label="Connections"
            value={metrics.activeConnections.toLocaleString()}
            sub="active / max 10k"
          />
          <StatCard
            label="P50 / P99"
            value={`${metrics.latencyP50}ms`}
            sub={<>p99: <span>{metrics.latencyP99}ms</span></>}
          />
        </div>

        {/* Log area */}
        <div className="bg-zinc-900 rounded-lg p-3 flex flex-col gap-1 min-h-[116px] justify-end overflow-hidden">
          {logs.map((log, i) => (
            <LogLine key={i} entry={log} />
          ))}
        </div>
      </div>

      {/* Keyframes injected inline for portability */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500&family=IBM+Plex+Sans:wght@400;500&display=swap');
        @keyframes slideIn {
          from { opacity: 0; transform: translateY(4px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default ServerMetrics;