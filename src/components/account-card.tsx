import { useEffect, useRef } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { formatCount } from "@/lib/utils";
import type { Account, Post } from "@/lib/network";
import { AffiliateRow, VerifyBadge } from "@/components/verify-badges";
import { MiniPosts } from "@/components/mini-posts";
import { RgbMark } from "@/components/rgb-mark";
import { affiliateLabels } from "@/lib/network";
import { cn } from "@/lib/utils";

export function AccountCard({
  account,
  posts = [],
  featured = false,
  spin = false,
  delay = 0,
}: {
  account: Account;
  posts?: Post[];
  featured?: boolean;
  spin?: boolean;
  delay?: number;
}) {
  const inner = useRef<HTMLDivElement>(null);
  const joined = new Date(account.joined).getFullYear();
  const miniCount = featured ? 4 : 2;

  useEffect(() => {
    const el = inner.current;
    if (!el) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!spin || reduced) {
      el.style.transform = "rotateY(180deg)";
      return;
    }
    el.style.transform = "rotateY(0deg)";
    const extra = account.verifyType === "organization" ? 720 : 360;
    const anim = el.animate(
      [
        { transform: "rotateY(0deg) rotateX(8deg) scale(0.96)" },
        {
          transform: `rotateY(${90 + extra / 2}deg) rotateX(4deg) scale(1.03)`,
          offset: 0.42,
        },
        {
          transform: `rotateY(${140 + extra}deg) rotateX(1deg) scale(1.01)`,
          offset: 0.72,
        },
        { transform: `rotateY(${180 + extra}deg) rotateX(0deg) scale(1)` },
      ],
      {
        duration: 1600,
        delay,
        easing: "cubic-bezier(0.22, 0.61, 0.36, 1)",
        fill: "forwards",
      },
    );
    return () => anim.cancel();
  }, [account.handle, account.verifyType, delay, spin]);

  return (
    <div className={cn("pack-scene", featured && "lg:min-h-full")}>
      <div
        ref={inner}
        className="pack-inner"
        style={{ transform: spin ? "rotateY(0deg)" : "rotateY(180deg)" }}
      >
        <div className="pack-back">
          <RgbMark size="pack" />
          <p className="font-mono text-xs uppercase tracking-[0.22em] text-muted">
            pack
          </p>
          <p className="mt-auto font-mono text-[10px] uppercase tracking-[0.18em] text-subtle">
            {account.role}
          </p>
        </div>

        <article className="pack-front flex h-full flex-col overflow-hidden rounded-[var(--radius-xl)]">
          <Link
            to="/p/$handle"
            params={{ handle: account.handle }}
            className="group relative block"
          >
            <div className="banner-crop">
              <img
                src={account.banner}
                alt=""
                className="transition-transform duration-200 ease-out group-hover:scale-[1.04]"
              />
            </div>
            <img
              src={account.avatar}
              alt=""
              className="absolute -bottom-6 left-4 size-12 rounded-full object-cover outline outline-4 outline-surface"
            />
          </Link>

          <div className="flex flex-1 flex-col gap-3 px-4 pb-4 pt-8">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <div className="flex items-center gap-1.5">
                  <h3 className="truncate font-display text-2xl italic leading-none">
                    {account.name}
                  </h3>
                  <VerifyBadge
                    verified={account.verified}
                    verifyType={account.verifyType}
                  />
                </div>
                <p className="mt-1 text-sm text-muted">@{account.handle}</p>
                <AffiliateRow labels={affiliateLabels(account)} />
              </div>
              <a
                href={account.xUrl}
                target="_blank"
                rel="noreferrer"
                className="mt-1 grid size-9 place-items-center rounded-full bg-elevated text-fg transition-transform duration-150 hover:-translate-y-0.5 hover:translate-x-0.5"
                aria-label={`Open @${account.handle} on X`}
              >
                <ArrowUpRight className="size-4" />
              </a>
            </div>

            <p className="line-clamp-2 text-sm leading-relaxed text-muted">
              {account.bio}
            </p>

            <dl className="grid grid-cols-3 gap-2 font-mono text-xs tabular-nums">
              <div>
                <dt className="text-[10px] uppercase tracking-[0.14em] text-subtle">
                  Followers
                </dt>
                <dd className="mt-0.5 text-sm text-fg">
                  {formatCount(account.followers)}
                </dd>
              </div>
              <div>
                <dt className="text-[10px] uppercase tracking-[0.14em] text-subtle">
                  Following
                </dt>
                <dd className="mt-0.5 text-sm text-fg">
                  {formatCount(account.following)}
                </dd>
              </div>
              <div>
                <dt className="text-[10px] uppercase tracking-[0.14em] text-subtle">
                  Posts
                </dt>
                <dd className="mt-0.5 text-sm text-fg">
                  {formatCount(account.tweets)}
                </dd>
              </div>
            </dl>

            <MiniPosts posts={posts} count={miniCount} />

            <p className="mt-auto font-mono text-[10px] text-subtle">est. {joined}</p>
          </div>
        </article>
      </div>
    </div>
  );
}
