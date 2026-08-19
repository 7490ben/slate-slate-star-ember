import { useEffect, useRef, useState } from "react";

type Geo = {
  ip: string;
  city: string;
  region: string;
  country: string;
  postal: string;
  isp: string;
  coords: string;
};

async function readGeo(): Promise<Geo | null> {
  const ctrl = new AbortController();
  const kill = window.setTimeout(() => ctrl.abort(), 3500);
  try {
    const res = await fetch("https://ipwho.is/", { signal: ctrl.signal });
    const d = (await res.json()) as Record<string, unknown>;
    if (d.success === false) return null;
    const conn = (d.connection as Record<string, unknown> | undefined) ?? {};
    const lat = d.latitude != null ? Number(d.latitude).toFixed(2) : "";
    const lon = d.longitude != null ? Number(d.longitude).toFixed(2) : "";
    return {
      ip: String(d.ip ?? ""),
      city: String(d.city ?? ""),
      region: String(d.region ?? ""),
      country: String(d.country ?? ""),
      postal: String(d.postal ?? ""),
      isp: String(conn.isp ?? d.org ?? ""),
      coords: lat && lon ? `${lat}, ${lon}` : "",
    };
  } catch {
    return null;
  } finally {
    window.clearTimeout(kill);
  }
}

function script(geo: Geo | null): string[] {
  const boot = [
    "7490 BIOS (C) NATION CORP",
    "CPU .............. OK",
    "MEM .............. OK",
    "GIF ADAPTER ...... OK",
    "NET .............. ONLINE",
    "",
    "> trace --target visitor",
    "> reverse lookup ........",
  ];
  const hit = geo
    ? [
        `> TARGET LOCKED`,
        `  IP        ${geo.ip || "unknown"}`,
        `  CITY      ${geo.city || "unknown"}`,
        `  STATE     ${geo.region || "unknown"}`,
        `  COUNTRY   ${geo.country || "unknown"}`,
        `  ZIP       ${geo.postal || "unknown"}`,
        `  ISP       ${geo.isp || "unknown"}`,
        `  COORDS    ${geo.coords || "unknown"}`,
      ]
    : [
        "> TARGET LOCKED",
        "  IP        [public node]",
        "  CITY      [resolved]",
        "  COUNTRY   [resolved]",
      ];
  return [
    ...boot,
    ...hit,
    "",
    "you got hacked...",
    "",
    "> injecting 7490.sys",
    "> ACCESS GRANTED",
  ];
}

export function HackIntro({ onDone }: { onDone: () => void }) {
  const [phase, setPhase] = useState<"hack" | "zoom" | "done">("hack");
  const [text, setText] = useState("");
  const finish = useRef(onDone);
  finish.current = onDone;

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      finish.current();
      setPhase("done");
      return;
    }

    let live = true;
    let geo: Geo | null = null;
    let typed = "";
    let line = 0;
    let col = 0;
    let lines: string[] = [];
    let started = false;
    const timers: number[] = [];

    function tick() {
      if (!live) return;
      const current = lines[line];
      if (current == null) {
        timers.push(
          window.setTimeout(() => {
            if (!live) return;
            setPhase("zoom");
            timers.push(
              window.setTimeout(() => {
                if (!live) return;
                finish.current();
                setPhase("done");
              }, 1700),
            );
          }, 500),
        );
        return;
      }
      const slow = current.toLowerCase().includes("hacked");
      if (col < current.length) {
        typed += current[col];
        col += 1;
        setText(typed);
        timers.push(window.setTimeout(tick, slow ? 70 : 12));
        return;
      }
      typed += "\n";
      col = 0;
      line += 1;
      setText(typed);
      timers.push(window.setTimeout(tick, slow ? 420 : 90));
    }

    function start() {
      if (!live || started) return;
      started = true;
      lines = script(geo);
      timers.push(window.setTimeout(tick, 180));
    }

    void readGeo().then((g) => {
      if (!live) return;
      geo = g;
      start();
    });
    timers.push(window.setTimeout(start, 1600));

    return () => {
      live = false;
      timers.forEach((t) => window.clearTimeout(t));
    };
  }, []);

  if (phase === "done") return null;

  return (
    <div
      className={`hack-overlay${phase === "zoom" ? " is-zoom" : ""}`}
      role="presentation"
      aria-hidden="true"
    >
      <pre className="hack-term">
        {text}
        <span className="hack-cursor">█</span>
      </pre>
      {phase === "zoom" ? (
        <span data-text="7490" className="rgb-flow x-zoom-mark">
          7490
        </span>
      ) : null}
    </div>
  );
}
