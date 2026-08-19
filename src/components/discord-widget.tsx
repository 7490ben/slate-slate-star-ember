import { useEffect, useState } from "react";
import { fetchDiscord, DISCORD_INVITE, type DiscordPulse } from "@/lib/discord";
import { formatCount } from "@/lib/utils";

const SEED: DiscordPulse = {
  name: "GIFs Mafia",
  online: 565,
  members: 1705,
  icon: "/discord-mafia.gif",
  invite: DISCORD_INVITE,
};

export function DiscordWidget() {
  const [guild, setGuild] = useState<DiscordPulse>(SEED);

  useEffect(() => {
    let alive = true;
    async function pull() {
      try {
        const next = await fetchDiscord();
        if (alive) setGuild(next);
      } catch {
        /* keep last */
      }
    }
    void pull();
    const t = window.setInterval(pull, 30000);
    return () => {
      alive = false;
      window.clearInterval(t);
    };
  }, []);

  return (
    <a
      href={guild.invite}
      target="_blank"
      rel="noreferrer"
      className="discord-card"
    >
      <img src={guild.icon} alt="" className="discord-icon" />
      <div className="min-w-0 flex-1">
        <p className="truncate text-lg font-medium leading-tight text-fg">
          {guild.name}
        </p>
        <p className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted">
          <span className="inline-flex items-center gap-1.5">
            <i className="discord-online" />
            {formatCount(guild.online)} Online
          </span>
          <span className="inline-flex items-center gap-1.5">
            <i className="discord-members" />
            {formatCount(guild.members)} Members
          </span>
        </p>
      </div>
      <svg
        className="discord-mark"
        viewBox="0 0 127.14 96.36"
        aria-hidden="true"
      >
        <path
          fill="currentColor"
          d="M107.7 8.07A105.15 105.15 0 0 0 81.47 0a72.06 72.06 0 0 0-3.36 6.91 97.68 97.68 0 0 0-29.11 0A72.37 72.37 0 0 0 45.64 0a105.89 105.89 0 0 0-26.25 8.09C2.79 32.65-1.71 56.6.54 80.21A105.73 105.73 0 0 0 32.71 96.36a77.7 77.7 0 0 0 6.89-11.25 68.42 68.42 0 0 1-10.85-5.22c.91-.66 1.8-1.35 2.65-2.07a75.57 75.57 0 0 0 64.32 0c.87.71 1.76 1.39 2.65 2.07a68.68 68.68 0 0 1-10.87 5.22 77 77 0 0 0 6.89 11.25 105.25 105.25 0 0 0 32.22-16.1c2.64-27.38-4.51-51.11-18.9-72.14ZM42.45 65.69C36.18 65.69 31 59.9 31 52.76s4.95-13 11.43-13 11.58 5.82 11.46 13-5.04 12.93-11.44 12.93Zm42.24 0C78.41 65.69 73.26 59.9 73.26 52.76s4.94-13 11.43-13 11.58 5.82 11.46 13-4.99 12.93-11.41 12.93Z"
        />
      </svg>
      <span className="discord-join">Join</span>
    </a>
  );
}
