import { createServerFn } from "@tanstack/react-start";

export const DISCORD_INVITE = "https://discord.gg/SYtCwkn6AG";
const INVITE_CODE = "SYtCwkn6AG";
const GUILD_ID = "1365431629249777774";

export type DiscordPulse = {
  name: string;
  online: number;
  members: number;
  icon: string;
  invite: string;
};

const FALLBACK: DiscordPulse = {
  name: "GIFs Mafia",
  online: 565,
  members: 1705,
  icon: "/discord-mafia.gif",
  invite: DISCORD_INVITE,
};

type Box = { at: number; data: DiscordPulse };
const g = globalThis as unknown as { __discord?: Box };

export const fetchDiscord = createServerFn({ method: "GET" }).handler(
  async (): Promise<DiscordPulse> => {
    const now = Date.now();
    if (g.__discord && now - g.__discord.at < 20_000) return g.__discord.data;

    try {
      const ctrl = new AbortController();
      const t = setTimeout(() => ctrl.abort(), 7000);
      const res = await fetch(
        `https://discord.com/api/v9/invites/${INVITE_CODE}?with_counts=true&with_expiration=true`,
        {
          headers: { "user-agent": "Mozilla/5.0 7490-Nation" },
          signal: ctrl.signal,
        },
      );
      clearTimeout(t);
      if (!res.ok) throw new Error(String(res.status));
      const d = (await res.json()) as {
        guild?: { name?: string; id?: string; icon?: string };
        profile?: {
          name?: string;
          member_count?: number;
          online_count?: number;
          icon_hash?: string;
        };
        approximate_member_count?: number;
        approximate_presence_count?: number;
      };
      const guild = d.guild ?? {};
      const profile = d.profile ?? {};
      const hash = profile.icon_hash || guild.icon || "";
      const animated = hash.startsWith("a_");
      const icon = hash
        ? `https://cdn.discordapp.com/icons/${guild.id || GUILD_ID}/${hash}.${animated ? "gif" : "png"}?size=128`
        : FALLBACK.icon;
      const data: DiscordPulse = {
        name: profile.name || guild.name || FALLBACK.name,
        online: profile.online_count ?? d.approximate_presence_count ?? FALLBACK.online,
        members: profile.member_count ?? d.approximate_member_count ?? FALLBACK.members,
        icon,
        invite: DISCORD_INVITE,
      };
      g.__discord = { at: now, data };
      return data;
    } catch {
      return g.__discord?.data ?? FALLBACK;
    }
  },
);
