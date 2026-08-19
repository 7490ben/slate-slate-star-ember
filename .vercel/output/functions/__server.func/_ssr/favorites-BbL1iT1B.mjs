import { i as createServerFn, t as TSS_SERVER_FUNCTION } from "./ssr.mjs";
import { c as getSql, t as ACCOUNTS } from "./network-B840CU3T.mjs";
import { t as authMiddleware } from "./middleware-DQF2SC1p.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/favorites-BbL1iT1B.js
var createServerRpc = (serverFnMeta, splitImportFn) => {
	const url = "/_serverFn/" + serverFnMeta.id;
	return Object.assign(splitImportFn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
var handles = new Set(ACCOUNTS.map((a) => a.handle));
var listSaved_createServerFn_handler = createServerRpc({
	id: "8ea045c06ce03fa8c675e49c0b07b09545583c1aadb75e77c0ad28d144dddea7",
	name: "listSaved",
	filename: "src/lib/favorites.ts"
}, (opts) => listSaved.__executeServer(opts));
var listSaved = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(listSaved_createServerFn_handler, async ({ context }) => {
	return (await (await getSql())`
      select handle from saved_pages
      where user_id = ${context.userId}
      order by created_at desc
    `).map((r) => r.handle);
});
var toggleSaved_createServerFn_handler = createServerRpc({
	id: "7f5018cd7d140ba52226a5505c62235879146850f28aed0e44e8c828f078c64d",
	name: "toggleSaved",
	filename: "src/lib/favorites.ts"
}, (opts) => toggleSaved.__executeServer(opts));
var toggleSaved = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((handle) => {
	const trimmed = handle.trim();
	if (!handles.has(trimmed)) throw new Error("Unknown page");
	return trimmed;
}).handler(toggleSaved_createServerFn_handler, async ({ context, data: handle }) => {
	const sql = await getSql();
	if ((await sql`
      select handle from saved_pages
      where user_id = ${context.userId} and handle = ${handle}
    `).length) {
		await sql`
        delete from saved_pages
        where user_id = ${context.userId} and handle = ${handle}
      `;
		return { saved: false };
	}
	await sql`
      insert into saved_pages (user_id, handle)
      values (${context.userId}, ${handle})
    `;
	return { saved: true };
});
//#endregion
export { listSaved_createServerFn_handler, toggleSaved_createServerFn_handler };
