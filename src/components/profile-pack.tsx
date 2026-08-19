import { useEffect, useRef } from "react";
import { Link } from "@tanstack/react-router";
import { formatCount } from "@/lib/utils";
import type { Account } from "@/lib/network";
import { affiliateLabels } from "@/lib/network";
import { AffiliateRow, VerifyBadge } from "@/components/verify-badges";
import { RgbMark } from "@/components/rgb-mark";

export function ProfilePack({
  account,
  delay = 0,
  spin = true,
}: {
  account: Account;
  delay?: number;
  spin?: boolean;
}) {
  const inner = useRef<HTMLDivElement>(null);

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
          transform: `rotateY(${90 + extra / 2}deg) rotateX(4deg) scale(1.04)`,
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

  const joined = new Date(account.joined).getFullYear();

  return (
    <div className="pack-scene">
      <div ref={inner} className="pack-inner">
        <div className="pack-face pack-back">
          <RgbMark size="pack" />
          <p className="font-mono text-xs uppercase tracking-[0.22em] text-muted">
            .lol pack
          </p>
          <p className="mt-auto font-mono text-[10px] uppercase tracking-[0.18em] text-subtle">
            {account.role}
          </p>
        </div>
        <Link
          to="/p/$handle"
          params={{ handle: account.handle }}
          className="pack-face pack-front"
        >
          <div className="pack-banner">
            <img src={account.banner} alt="" />
          </div>
          <img src={account.avatar} alt="" className="pack-pfp" />
          <div className="pack-body">
            <div className="flex items-center gap-1.5">
              <h3 className="truncate font-display text-xl italic leading-none">
                {account.name}
              </h3>
              <VerifyBadge
                verified={account.verified}
                verifyType={account.verifyType}
              />
            </div>
            <p className="mt-1 text-xs text-muted">@{account.handle}</p>
            <AffiliateRow labels={affiliateLabels(account)} />
            <p className="mt-3 line-clamp-3 text-xs leading-relaxed text-muted">
              {account.bio}
            </p>
            <dl className="mt-auto grid grid-cols-3 gap-2 pt-4 font-mono text-xs tabular-nums">
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
            <p className="mt-2 font-mono text-[10px] text-subtle">est. {joined}</p>
          </div>
        </Link>
      </div>
    </div>
  );
}
