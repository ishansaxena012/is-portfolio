import { useState, useEffect, useRef } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

interface Metrics {
  cpu: number;
  memory: number;
  activeConnections: number;
  latency: number;
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
  "/api/v1/auth",
  "/health",
  "/metrics",
  "/api/v1/data",
  "/api/v1/orders",
];
const METHODS = ["GET", "GET", "GET", "POST", "POST", "PUT"];
const OUTCOMES: { status: string; cls: LogEntry["cls"] }[] = [
  { status: "200", cls: "ok" },
  { status: "200", cls: "ok" },
  { status: "201", cls: "ok" },
  { status: "200", cls: "ok" },
  { status: "404", cls: "warn" },
  { status: "500", cls: "err" },
];

const pick = <T,>(arr: T[]) => arr[Math.floor(Math.random() * arr.length)];

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
          className="h-full rounded-full transition-all duration-700"
          style={{ width: `${pct}%`, background: color, transitionTimingFunction: "cubic-bezier(0.4,0,0.2,1)" }}
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
  const methodColor =
    entry.cls === "ok"
      ? "text-emerald-400"
      : entry.cls === "warn"
      ? "text-amber-400"
      : "text-red-400";

  return (
    <div className="flex items-baseline gap-2 font-mono text-[11px] text-zinc-500 overflow-hidden animate-[slideIn_0.25s_ease-out]">
      <span className="text-zinc-700 shrink-0">{entry.time}</span>
      <span className={`font-medium shrink-0 ${methodColor}`}>{entry.method}</span>
      <span className="flex-1 overflow-hidden text-ellipsis whitespace-nowrap">
        {entry.path}
      </span>
      <span className={`shrink-0 ${statusColor}`}>{entry.status}</span>
    </div>
  );
};

// ─── Main Component ───────────────────────────────────────────────────────────

const ServerMetrics = () => {
  const [metrics, setMetrics] = useState<Metrics>({
    cpu: 45,
    memory: 2.1,
    activeConnections: 1024,
    latency: 12,
  });

  const [logs, setLogs] = useState<LogEntry[]>([
    { time: nowTime(), method: "GET",  path: "/health",       status: "200", cls: "ok" },
    { time: nowTime(), method: "POST", path: "/api/v1/auth",  status: "200", cls: "ok" },
    { time: nowTime(), method: "GET",  path: "/api/v1/users", status: "200", cls: "ok" },
  ]);

  const [uptimeSeconds, setUptimeSeconds] = useState(
    12 * 86400 + 4 * 3600 + 33 * 60
  );

  // Tick metrics every 1.5s
  useEffect(() => {
    const id = setInterval(() => {
      setMetrics((prev) => ({
        cpu: Math.max(8, Math.min(96, prev.cpu + (Math.random() * 16 - 8))),
        memory: Math.max(1.2, Math.min(14.5, prev.memory + (Math.random() * 0.3 - 0.15))),
        activeConnections: Math.max(
          600,
          Math.min(8000, prev.activeConnections + Math.round(Math.random() * 60 - 30))
        ),
        latency: Math.max(4, Math.min(120, prev.latency + Math.round(Math.random() * 8 - 4))),
      }));
    }, 1500);
    return () => clearInterval(id);
  }, []);

  // Add log entries every 2.4s
  useEffect(() => {
    const id = setInterval(() => {
      const outcome = pick(OUTCOMES);
      const entry: LogEntry = {
        time: nowTime(),
        method: pick(METHODS),
        path: pick(ENDPOINTS),
        ...outcome,
      };
      setLogs((prev) => {
        const next = [...prev, entry];
        return next.length > 5 ? next.slice(next.length - 5) : next;
      });
    }, 2400);
    return () => clearInterval(id);
  }, []);

  // Tick uptime every second
  useEffect(() => {
    const id = setInterval(() => setUptimeSeconds((s) => s + 1), 1000);
    return () => clearInterval(id);
  }, []);

  // Format uptime
  const d = Math.floor(uptimeSeconds / 86400);
  const h = Math.floor((uptimeSeconds % 86400) / 3600);
  const m = Math.floor((uptimeSeconds % 3600) / 60);
  const uptime = `up ${d}d ${h}h ${m}m`;

  const memPct = (metrics.memory / 16) * 100;
  const p99 = Math.round(metrics.latency * 1.6);

  return (
    <div
      className="bg-zinc-950 border border-zinc-800/60 rounded-xl overflow-hidden shadow-2xl w-full"
      style={{ fontFamily: "'IBM Plex Sans', sans-serif" }}
    >
      {/* ── Header ── */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-zinc-800/60">
        <div className="flex items-center gap-2">
          <span
            className="inline-block w-2 h-2 rounded-full bg-emerald-400"
            style={{ animation: "pulse 2s ease-in-out infinite" }}
          />
          <span
            className="text-[13px] font-medium text-zinc-100 tracking-wide"
            style={{ fontFamily: "'IBM Plex Mono', monospace" }}
          >
            prod-cluster-01
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
          value={(metrics.memory / 16) * 100}
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
            label="P95 Latency"
            value={`${metrics.latency}ms`}
            sub={<>p99: <span>{p99}ms</span></>}
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