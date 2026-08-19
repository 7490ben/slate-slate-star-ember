import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { v as Link, x as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as accountByHandle, l as postUrl } from "./network-B840CU3T.mjs";
import { a as ArrowUpRight, r as ExternalLink } from "../_libs/lucide-react.mjs";
import { a as formatCount, i as cn } from "./router-CQ2SYJIV.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/post-tile-C-CaRuq3.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function GifLoop({ src, className, alt = "" }) {
	const ref = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		const el = ref.current;
		if (!el) return;
		if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
			el.pause();
			return;
		}
		const io = new IntersectionObserver(([entry]) => {
			if (!entry) return;
			if (entry.isIntersecting) el.play().catch(() => {});
			else el.pause();
		}, { threshold: .15 });
		io.observe(el);
		return () => io.disconnect();
	}, [src]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("video", {
		ref,
		src,
		className: cn("h-full w-full object-cover", className),
		muted: true,
		loop: true,
		playsInline: true,
		autoPlay: true,
		preload: "metadata",
		"aria-label": alt || void 0
	});
}
function AccountCard({ account, featured = false }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
		to: "/p/$handle",
		params: { handle: account.handle },
		className: cn("group relative flex flex-col overflow-hidden rounded-[var(--radius-xl)] bg-surface p-2 shadow-line transition-[box-shadow,transform] duration-150 ease-out hover:shadow-line-hover", featured && "sm:min-h-full"),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: cn("relative overflow-hidden rounded-[var(--radius-lg)] bg-elevated", featured ? "aspect-[4/3] sm:aspect-[16/10]" : "aspect-[4/3]"),
			children: [account.cover?.kind === "video" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GifLoop, {
				src: account.cover.src,
				alt: ""
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: account.cover?.src ?? account.avatar,
				alt: "",
				className: "h-full w-full object-cover transition-transform duration-200 ease-out group-hover:scale-[1.04]"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 bg-gradient-to-t from-bg to-transparent p-3 pt-10",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: account.avatar,
					alt: "",
					className: "size-10 rounded-full object-cover"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-mono text-xs uppercase tracking-[0.16em] text-accent",
					children: account.role
				})]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-1 flex-col gap-3 px-3 py-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-start justify-between gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "font-display text-2xl italic leading-tight tracking-tight",
						children: account.name
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-1 text-sm text-muted",
						children: ["@", account.handle]
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "mt-1 grid size-9 place-items-center rounded-full bg-elevated text-fg transition-transform duration-150 group-hover:-translate-y-0.5 group-hover:translate-x-0.5",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, { className: "size-4" })
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm leading-relaxed text-muted",
					children: account.bio
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-auto font-mono text-sm tabular-nums text-fg",
					children: [formatCount(account.followers), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "ml-2 text-subtle",
						children: "followers"
					})]
				})
			]
		})]
	});
}
function PostTile({ post, className }) {
	const account = accountByHandle(post.handle);
	const href = postUrl(post);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
		href,
		target: "_blank",
		rel: "noreferrer",
		className: cn("group relative mb-4 block break-inside-avoid overflow-hidden rounded-[var(--radius-lg)] bg-surface shadow-line transition-[box-shadow,transform] duration-150 ease-out hover:shadow-line-hover", className),
		children: [post.media?.kind === "video" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "aspect-square overflow-hidden bg-elevated",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GifLoop, {
				src: post.media.src,
				alt: post.text || `${post.handle} gif`
			})
		}) : post.media?.kind === "image" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "overflow-hidden bg-elevated",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: post.media.src,
				alt: post.text || `${post.handle} post`,
				className: "h-full w-full object-cover transition-transform duration-200 ease-out group-hover:scale-[1.03]"
			})
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex min-h-44 flex-col justify-between bg-elevated p-5",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-display text-2xl leading-snug italic text-fg",
				children: post.text || "Open on X"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-6 text-xs uppercase tracking-[0.16em] text-subtle",
				children: "Watch on X"
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center justify-between gap-3 px-3 py-2.5",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex min-w-0 items-center gap-2",
				children: [account ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: account.avatar,
					alt: "",
					className: "size-6 rounded-full object-cover"
				}) : null, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "truncate text-xs text-muted",
					children: ["@", post.handle]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "flex items-center gap-2 font-mono text-xs tabular-nums text-subtle",
				children: [formatCount(post.likes), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, { className: "size-3 opacity-0 transition-opacity duration-150 group-hover:opacity-100" })]
			})]
		})]
	});
}
//#endregion
export { GifLoop as n, PostTile as r, AccountCard as t };
