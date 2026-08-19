import { createServerFn } from "@tanstack/react-start";
import { getSql } from "@/lib/db";

const KEY = "7490.org";

export type SitePulse = {
  live: number;
  total: number;
};

export const pingSite = createServerFn({ method: "POST" })
  .validator((input: { session: string; count: boolean }) => {
    const session = input.session.trim().slice(0, 64);
    if (!session) throw new Error("Missing session");
    return { session, count: Boolean(input.count) };
  })
  .handler(async ({ data }): Promise<SitePulse> => {
    const sql = await getSql();
    await sql`
      create table if not exists site_hits (
        key text primary key,
        total integer not null default 0
      )
    `;
    await sql`
      create table if not exists site_live (
        id text primary key,
        seen_at timestamptz not null default now()
      )
    `;
    if (data.count) {
      await sql`
        insert into site_hits (key, total) values (${KEY}, 1)
        on conflict (key) do update set total = site_hits.total + 1
      `;
    }
    await sql`
      insert into site_live (id, seen_at) values (${data.session}, now())
      on conflict (id) do update set seen_at = now()
    `;
    await sql`
      delete from site_live
      where seen_at < now() - interval '90 seconds'
    `;
    const live = await sql<{ n: number }>`
      select count(*)::int as n from site_live
      where seen_at > now() - interval '75 seconds'
    `;
    const hits = await sql<{ total: number }>`
      select total from site_hits where key = ${KEY}
    `;
    return {
      live: live[0]?.n ?? 1,
      total: hits[0]?.total ?? 1,
    };
  });
