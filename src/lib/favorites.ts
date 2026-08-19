import { createServerFn } from "@tanstack/react-start";
import { getSql } from "@/lib/db";
import { authMiddleware } from "@/lib/auth/middleware";
import { ACCOUNTS, TEAM } from "@/lib/network";

const handles = new Set([...ACCOUNTS, ...TEAM].map((a) => a.handle));

export const listSaved = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
    const sql = await getSql();
    const rows = await sql<{ handle: string }>`
      select handle from saved_pages
      where user_id = ${context.userId}
      order by created_at desc
    `;
    return rows.map((r) => r.handle);
  });

export const toggleSaved = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((handle: string) => {
    const trimmed = handle.trim();
    if (!handles.has(trimmed)) throw new Error("Unknown page");
    return trimmed;
  })
  .handler(async ({ context, data: handle }) => {
    const sql = await getSql();
    const existing = await sql<{ handle: string }>`
      select handle from saved_pages
      where user_id = ${context.userId} and handle = ${handle}
    `;
    if (existing.length) {
      await sql`
        delete from saved_pages
        where user_id = ${context.userId} and handle = ${handle}
      `;
      return { saved: false as const };
    }
    await sql`
      insert into saved_pages (user_id, handle)
      values (${context.userId}, ${handle})
    `;
    return { saved: true as const };
  });
