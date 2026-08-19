import { useEffect, useState } from "react";
import { pingSite, type SitePulse } from "@/lib/site-views";
import { formatCount } from "@/lib/utils";

function sessionId() {
  const key = "7490-visit";
  let id = sessionStorage.getItem(key);
  if (!id) {
    id = `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;
    sessionStorage.setItem(key, id);
  }
  return id;
}

export function SitePulse({ connecting }: { connecting: boolean }) {
  const [pulse, setPulse] = useState<SitePulse | null>(null);

  useEffect(() => {
    const id = sessionId();
    let counted = sessionStorage.getItem("7490-counted") === "1";
    let alive = true;

    async function beat(count: boolean) {
      try {
        const next = await pingSite({ data: { session: id, count } });
        if (alive) setPulse(next);
        if (count) sessionStorage.setItem("7490-counted", "1");
      } catch {
        /* keep last */
      }
    }

    void beat(!counted);
    counted = true;
    const t = window.setInterval(() => void beat(false), 20000);
    return () => {
      alive = false;
      window.clearInterval(t);
    };
  }, []);

  return (
    <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2">
      <p className="live-dot">
        <i />
        {connecting ? "Connecting to X" : "Live from X"}
      </p>
      <p className="live-dot">
        <i />
        <span className="normal-case tracking-normal text-muted">
          <a href="https://7490.org" className="hover:text-fg">
            7490.org
          </a>
          {" · "}
          {pulse ? `${pulse.live} live` : "— live"}
          {" · "}
          {pulse ? `${formatCount(pulse.total)} views` : "views"}
        </span>
      </p>
    </div>
  );
}
