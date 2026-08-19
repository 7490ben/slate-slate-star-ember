import { createServerFn } from "@tanstack/react-start";
import { ACCOUNTS, POSTS, TEAM, type Account, type VerifyType } from "@/lib/network";

export type LiveProfile = Pick<
  Account,
  | "handle"
  | "name"
  | "bio"
  | "followers"
  | "following"
  | "tweets"
  | "verified"
  | "verifyType"
>;

export type LiveSnapshot = {
  fetchedAt: string;
  profiles: Record<string, LiveProfile>;
  likes: Record<string, number>;
};

type CacheBox = { at: number; data: LiveSnapshot };
const g = globalThis as unknown as { __xLive?: CacheBox };

async function readJson(url: string): Promise<unknown> {
  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), 7000);
  try {
    const res = await fetch(url, {
      headers: { "user-agent": "Mozilla/5.0 7490-Nation" },
      signal: ctrl.signal,
    });
    if (!res.ok) throw new Error(String(res.status));
    return await res.json();
  } finally {
    clearTimeout(t);
  }
}

function verifyType(raw: unknown): VerifyType {
  if (!raw || typeof raw !== "object") return null;
  const v = raw as { verified?: boolean; type?: string };
  if (!v.verified) return null;
  if (v.type === "organization") return "organization";
  return "individual";
}

export const fetchLiveNetwork = createServerFn({ method: "GET" }).handler(
  async () => {
    const now = Date.now();
    if (g.__xLive && now - g.__xLive.at < 25_000) return g.__xLive.data;

    const profiles: Record<string, LiveProfile> = {};
    await Promise.all(
      [...ACCOUNTS, ...TEAM].map(async (a) => {
        try {
          const data = (await readJson(
            `https://api.fxtwitter.com/${a.handle}`,
          )) as { user?: Record<string, unknown> };
          const u = data.user;
          if (!u) return;
          const v = verifyType(u.verification);
          profiles[a.handle] = {
            handle: a.handle,
            name: String(u.name ?? a.name),
            bio: String(u.description ?? a.bio),
            followers: Number(u.followers ?? a.followers),
            following: Number(u.following ?? a.following),
            tweets: Number(u.tweets ?? a.tweets),
            verified: Boolean(v),
            verifyType: v,
          };
        } catch {
          /* keep static */
        }
      }),
    );

    const likes: Record<string, number> = {};
    const sample = POSTS.slice(0, 12);
    await Promise.all(
      sample.map(async (p) => {
        try {
          const data = (await readJson(
            `https://api.fxtwitter.com/${p.handle}/status/${p.id}`,
          )) as { tweet?: { likes?: number } };
          if (typeof data.tweet?.likes === "number") {
            likes[p.id] = data.tweet.likes;
          }
        } catch {
          /* keep static */
        }
      }),
    );

    const snap: LiveSnapshot = {
      fetchedAt: new Date().toISOString(),
      profiles,
      likes,
    };
    g.__xLive = { at: now, data: snap };
    return snap;
  },
);
