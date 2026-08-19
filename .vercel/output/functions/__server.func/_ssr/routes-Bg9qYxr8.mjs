import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { v as Link, x as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { i as TOTAL_FOLLOWERS, l as postUrl, n as FILTERS, r as POSTS, t as ACCOUNTS } from "./network-B840CU3T.mjs";
import { a as ArrowUpRight, n as Shuffle, s as ArrowDown } from "../_libs/lucide-react.mjs";
import { a as formatCount, i as cn, r as Button } from "./router-CQ2SYJIV.mjs";
import { n as GifLoop, r as PostTile, t as AccountCard } from "./post-tile-C-CaRuq3.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-Bg9qYxr8.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var FEATURED = ACCOUNTS[0];
var REST = ACCOUNTS.slice(1);
var TICKER = POSTS.filter((p) => p.media?.kind === "video");
function Home() {
	const [filter, setFilter] = (0, import_react.useState)("all");
	const visible = (0, import_react.useMemo)(() => {
		return [...filter === "all" ? POSTS : POSTS.filter((p) => p.handle === filter)].sort((a, b) => b.likes - a.likes);
	}, [filter]);
	function shufflePost() {
		const pool = POSTS.filter((p) => p.media);
		const pick = pool[Math.floor(Math.random() * pool.length)];
		if (!pick) return;
		window.open(postUrl(pick), "_blank", "noopener,noreferrer");
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "relative overflow-hidden",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto grid max-w-6xl items-end gap-10 px-4 pb-12 pt-10 sm:px-6 sm:pt-16 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] lg:pb-16",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "rise font-mono text-xs uppercase tracking-[0.22em] text-subtle",
						children: "Five pages · one network"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
						className: "rise rise-1 mt-4 font-display text-hero italic text-fg",
						children: ["7490", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-muted",
							children: ".lol"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "rise rise-2 mt-6 max-w-md text-lg leading-relaxed text-muted",
						children: "A late-night gallery of the Twitter pages Ben runs — cursed GIFs, edits that go hard, Spider-Man, cats, and the man behind them."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rise rise-3 mt-8 flex flex-wrap gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							asChild: true,
							size: "lg",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
								href: "#network",
								children: ["Enter the network", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowDown, { className: "size-4" })]
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							asChild: true,
							variant: "outline",
							size: "lg",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
								href: "https://x.com/7490",
								target: "_blank",
								rel: "noreferrer",
								children: ["Follow @7490", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, { className: "size-4" })]
							})
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
						className: "rise rise-4 mt-10 grid max-w-lg grid-cols-3 gap-4 border-t border-line pt-6",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
								label: "Pages",
								value: "5"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
								label: "Followers",
								value: formatCount(TOTAL_FOLLOWERS)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
								label: "Operator",
								value: "@7490"
							})
						]
					})
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "rise rise-5 hidden lg:block",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarCluster, {})
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "border-y border-line bg-surface/60",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "overflow-hidden py-3",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "marquee-track flex w-max gap-3 px-3",
						children: [...TICKER, ...TICKER].map((post, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: postUrl(post),
							target: "_blank",
							rel: "noreferrer",
							className: "relative h-28 w-28 shrink-0 overflow-hidden rounded-[var(--radius-md)] bg-elevated sm:h-36 sm:w-36",
							children: post.media ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GifLoop, { src: post.media.src }) : null
						}, `${post.id}-${i}`))
					})
				})
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			id: "network",
			className: "mx-auto max-w-6xl scroll-mt-20 px-4 py-20 sm:px-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-mono text-xs uppercase tracking-[0.2em] text-subtle",
						children: "The network"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mt-2 font-display text-3xl italic tracking-tight sm:text-4xl",
						children: "Every page, in one room"
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "max-w-sm text-sm leading-relaxed text-muted",
						children: "Click a card to open the gallery page, or jump straight to X."
					})]
				}),
				FEATURED ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-10 grid gap-4 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AccountCard, {
						account: FEATURED,
						featured: true
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-1",
						children: REST.slice(0, 2).map((account) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AccountCard, { account }, account.handle))
					})]
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3",
					children: [REST.slice(2).map((account) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AccountCard, { account }, account.handle)), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/login",
						className: "flex min-h-48 flex-col justify-between rounded-[var(--radius-xl)] bg-elevated p-6 shadow-line transition-[box-shadow] duration-150 hover:shadow-line-hover",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-mono text-xs uppercase tracking-[0.18em] text-subtle",
							children: "Collect"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-display text-2xl italic",
							children: "Keep a shelf"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-sm text-muted",
							children: "Sign in to save the pages you actually open."
						})] })]
					})]
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			id: "wire",
			className: "border-t border-line bg-surface/40",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto max-w-6xl scroll-mt-20 px-4 py-20 sm:px-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-mono text-xs uppercase tracking-[0.2em] text-subtle",
							children: "On the wire"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "mt-2 font-display text-3xl italic tracking-tight sm:text-4xl",
							children: "Recent drops"
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							type: "button",
							variant: "outline",
							onClick: shufflePost,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shuffle, { className: "size-4" }), "Shuffle a GIF"]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-8 flex gap-2 overflow-x-auto pb-2",
						children: FILTERS.map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => setFilter(f.id),
							className: cn("h-11 shrink-0 rounded-full px-4 text-sm transition-[background-color,color] duration-150", filter === f.id ? "bg-accent text-accent-fg" : "bg-elevated text-muted hover:text-fg"),
							children: f.label
						}, f.id))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-8 columns-1 gap-4 sm:columns-2 lg:columns-3",
						children: visible.map((post) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PostTile, { post }, post.id))
					})
				]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			id: "about",
			className: "mx-auto max-w-6xl scroll-mt-20 px-4 py-20 sm:px-6",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid items-center gap-10 lg:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "overflow-hidden rounded-[var(--radius-2xl)] bg-elevated p-2 shadow-line",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: "/gallery.jpg",
						alt: "Five CRT televisions in a dark gallery",
						className: "aspect-[16/10] w-full rounded-[calc(var(--radius-2xl)-8px)] object-cover"
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-mono text-xs uppercase tracking-[0.2em] text-subtle",
						children: "Operator"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mt-2 font-display text-3xl italic tracking-tight sm:text-4xl",
						children: "Run by Ben"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-5 text-base leading-relaxed text-muted",
						children: "@7490 is the OG creator behind GIFs Shitpost, Edits That Goes Hard, Spider-Man Vibe, and Cat Posted. This site is the index — a quiet room for loud pages."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-8 flex flex-wrap gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							asChild: true,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/p/$handle",
								params: { handle: "7490" },
								children: "View Ben’s page"
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							asChild: true,
							variant: "outline",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
								href: "https://x.com/7490",
								target: "_blank",
								rel: "noreferrer",
								children: ["@7490 on X", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, { className: "size-4" })]
							})
						})]
					})
				] })]
			})
		})
	] });
}
function Stat({ label, value }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
		className: "text-xs uppercase tracking-[0.16em] text-subtle",
		children: label
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
		className: "mt-1 font-mono text-lg tabular-nums text-fg",
		children: value
	})] });
}
function AvatarCluster() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "cluster",
		children: [
			{
				handle: "GiFShitpost",
				slot: "cluster-1"
			},
			{
				handle: "EditsGoesHard",
				slot: "cluster-2"
			},
			{
				handle: "SpiderManVibe",
				slot: "cluster-3"
			},
			{
				handle: "CatPosted",
				slot: "cluster-4"
			},
			{
				handle: "7490",
				slot: "cluster-5"
			}
		].map((spot) => {
			const account = ACCOUNTS.find((a) => a.handle === spot.handle);
			if (!account) return null;
			return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/p/$handle",
				params: { handle: account.handle },
				className: cn("cluster-item", spot.slot),
				"aria-label": account.name,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: account.avatar,
					alt: "",
					className: "h-full w-full object-cover"
				})
			}, account.handle);
		})
	});
}
//#endregion
export { Home as component };
