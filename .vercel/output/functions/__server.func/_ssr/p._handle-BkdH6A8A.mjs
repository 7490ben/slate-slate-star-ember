import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { v as Link, x as require_jsx_runtime, y as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { i as createServerFn, o as getServerFnById, t as TSS_SERVER_FUNCTION } from "./ssr.mjs";
import { t as ACCOUNTS, u as postsFor } from "./network-B840CU3T.mjs";
import { t as authMiddleware } from "./middleware-DQF2SC1p.mjs";
import { a as ArrowUpRight, i as Bookmark, o as ArrowLeft } from "../_libs/lucide-react.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { a as formatCount, i as cn, n as Route$1, o as useCurrentUserState, r as Button } from "./router-CQ2SYJIV.mjs";
import { n as GifLoop, r as PostTile, t as AccountCard } from "./post-tile-C-CaRuq3.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/p._handle-BkdH6A8A.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var createSsrRpc = (functionId) => {
	const url = "/_serverFn/" + functionId;
	const serverFnMeta = { id: functionId };
	const fn = async (...args) => {
		return (await getServerFnById(functionId, { origin: "server" }))(...args);
	};
	return Object.assign(fn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
var handles = new Set(ACCOUNTS.map((a) => a.handle));
var listSaved = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(createSsrRpc("8ea045c06ce03fa8c675e49c0b07b09545583c1aadb75e77c0ad28d144dddea7"));
var toggleSaved = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((handle) => {
	const trimmed = handle.trim();
	if (!handles.has(trimmed)) throw new Error("Unknown page");
	return trimmed;
}).handler(createSsrRpc("7f5018cd7d140ba52226a5505c62235879146850f28aed0e44e8c828f078c64d"));
function SaveButton({ handle }) {
	const { user, isPending } = useCurrentUserState();
	const navigate = useNavigate();
	const [saved, setSaved] = (0, import_react.useState)(false);
	const [busy, setBusy] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		if (!user) {
			setSaved(false);
			return;
		}
		let live = true;
		listSaved().then((handles) => {
			if (live) setSaved(handles.includes(handle));
		}).catch(() => {
			if (live) setSaved(false);
		});
		return () => {
			live = false;
		};
	}, [user, handle]);
	async function onClick() {
		if (isPending) return;
		if (!user) {
			navigate({ to: "/login" });
			return;
		}
		setBusy(true);
		try {
			const next = await toggleSaved({ data: handle });
			setSaved(next.saved);
			toast(next.saved ? "Saved to your collection" : "Removed from collection");
		} catch {
			toast("Could not update collection");
		} finally {
			setBusy(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
		type: "button",
		variant: "outline",
		size: "md",
		onClick: () => void onClick(),
		disabled: busy,
		"aria-pressed": saved,
		"aria-label": saved ? "Remove from collection" : "Save to collection",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bookmark, {
			className: cn(saved && "fill-fg"),
			strokeWidth: 1.75
		}), saved ? "Saved" : "Collect"]
	});
}
function AccountPage() {
	const { account } = Route$1.useLoaderData();
	const posts = postsFor(account.handle);
	const others = ACCOUNTS.filter((a) => a.handle !== account.handle);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "mx-auto max-w-6xl px-4 pb-20 sm:px-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: "/",
				className: "mt-8 inline-flex h-11 items-center gap-2 text-sm text-muted hover:text-fg",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "size-4" }), "All pages"]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-6 grid items-end gap-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "overflow-hidden rounded-[var(--radius-2xl)] bg-elevated p-2 shadow-line",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "aspect-square overflow-hidden rounded-[calc(var(--radius-2xl)-8px)] sm:aspect-[5/4]",
						children: account.cover?.kind === "video" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GifLoop, {
							src: account.cover.src,
							alt: account.name
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: account.cover?.src ?? account.avatar,
							alt: account.name,
							className: "h-full w-full object-cover"
						})
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "pb-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-mono text-xs uppercase tracking-[0.2em] text-subtle",
							children: account.role
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "mt-3 font-display text-4xl italic leading-none tracking-tight sm:text-5xl",
							children: account.name
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-3 text-lg text-muted",
							children: ["@", account.handle]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-5 max-w-md text-base leading-relaxed text-muted",
							children: account.bio
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-6 font-mono text-sm tabular-nums",
							children: [formatCount(account.followers), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "ml-2 text-subtle",
								children: "followers"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-8 flex flex-wrap gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								asChild: true,
								size: "lg",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
									href: account.xUrl,
									target: "_blank",
									rel: "noreferrer",
									children: ["Open on X", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, { className: "size-4" })]
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SaveButton, { handle: account.handle })]
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-16",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-end justify-between gap-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-3xl italic tracking-tight",
						children: "On the wire"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "font-mono text-xs tabular-nums text-subtle",
						children: [posts.length, " posts"]
					})]
				}), posts.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-8 text-sm text-muted",
					children: "No posts archived yet."
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-8 columns-1 gap-4 sm:columns-2 lg:columns-3",
					children: posts.map((post) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PostTile, { post }, post.id))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-20",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-3xl italic tracking-tight",
					children: "The rest of the network"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4",
					children: others.map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AccountCard, { account: a }, a.handle))
				})]
			})
		]
	});
}
//#endregion
export { AccountPage as component };
