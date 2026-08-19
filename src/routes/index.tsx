import { useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowDown, ArrowUpRight, Shuffle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AccountCard } from "@/components/account-card";
import { PostTile } from "@/components/post-tile";
import { GifLoop } from "@/components/gif-loop";
import { RgbMark } from "@/components/rgb-mark";
import { FILTERS, cardPostsFor, postUrl } from "@/lib/network";
import { useLiveNetwork } from "@/lib/use-live-network";
import { SitePulse } from "@/components/site-pulse";
import { DiscordWidget } from "@/components/discord-widget";
import { cn, formatCount } from "@/lib/utils";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  const { accounts, team, posts, fetchedAt } = useLiveNetwork();
  const [filter, setFilter] = useState<(typeof FILTERS)[number]["id"]>("all");
  const featured = accounts[0];
  const rest = accounts.slice(1);

  const visible = useMemo(() => {
    const list =
      filter === "all" ? posts : posts.filter((p) => p.handle === filter);
    return [...list].sort((a, b) => b.likes - a.likes);
  }, [filter, posts]);

  const ticker = useMemo(
    () => posts.filter((p) => p.media?.kind === "video"),
    [posts],
  );

  const totalFollowers = accounts.reduce((s, a) => s + a.followers, 0);

  function shufflePost() {
    const pool = posts.filter((p) => p.media);
    const pick = pool[Math.floor(Math.random() * pool.length)];
    if (!pick) return;
    window.open(postUrl(pick), "_blank", "noopener,noreferrer");
  }

  return (
    <main>
      <section className="relative">
        <div className="mx-auto grid max-w-6xl items-end gap-10 px-4 pb-12 pt-10 sm:px-6 sm:pt-16 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] lg:pb-16">
          <div>
            <p className="rise font-mono text-xs uppercase tracking-[0.22em] text-subtle">
              {accounts.length} pages · one nation
            </p>
            <h1 className="rise rise-1 mt-4 overflow-visible">
              <RgbMark size="hero" />
            </h1>
            <p className="rise rise-2 mt-6 max-w-md text-lg leading-relaxed text-muted">
              The gallery of pages Ben runs — cursed GIFs, out of context,
              hardest edits, Spider-Man, Ghost Rider, Batman, Simpsons, cats.
            </p>
            <div className="rise rise-3 mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg">
                <a href="#network">
                  Enter the nation
                  <ArrowDown className="size-4" />
                </a>
              </Button>
              <Button asChild variant="outline" size="lg">
                <a href="https://x.com/7490" target="_blank" rel="noreferrer">
                  Follow @7490
                  <ArrowUpRight className="size-4" />
                </a>
              </Button>
            </div>
            <div className="rise rise-3 mt-8 max-w-lg">
              <DiscordWidget />
            </div>
            <dl className="rise rise-4 mt-10 grid max-w-lg grid-cols-3 gap-4 border-t border-line pt-6">
              <Stat label="Pages" value={String(accounts.length)} />
              <Stat label="Followers" value={formatCount(totalFollowers)} />
              <Stat label="Operator" value="@7490" />
            </dl>
            <SitePulse connecting={!fetchedAt} />
          </div>

          <div className="rise rise-5 hidden lg:block">
            <AvatarCluster accounts={accounts} />
          </div>
        </div>

        <div className="border-y border-line bg-surface/60">
          <div className="overflow-hidden py-3">
            <div className="marquee-track flex w-max gap-3 px-3">
              {[...ticker, ...ticker].map((post, i) => (
                <a
                  key={`${post.id}-${i}`}
                  href={postUrl(post)}
                  target="_blank"
                  rel="noreferrer"
                  className="relative h-24 w-72 shrink-0 overflow-hidden rounded-[var(--radius-md)] bg-elevated sm:h-28 sm:w-80"
                >
                  <div className="banner-crop h-full">
                    {post.media ? <GifLoop src={post.media.src} /> : null}
                  </div>
                  <span className="absolute bottom-2 left-2 font-mono text-[10px] tabular-nums text-fg">
                    {formatCount(post.likes)} likes · {formatCount(post.views)} views
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="network" className="mx-auto max-w-6xl scroll-mt-20 px-4 py-20 sm:px-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-subtle">
              The nation
            </p>
            <h2 className="mt-2 font-display text-3xl italic tracking-tight sm:text-4xl">
              Every page, in one room
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-muted">
            Banners on the pack. Bangers underneath. Tap a card to open it.
          </p>
        </div>

        {featured ? (
          <div className="mt-10 grid gap-4 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
            <AccountCard
              account={featured}
              posts={cardPostsFor(featured.handle, posts)}
              featured
              spin
            />
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
              {rest.slice(0, 2).map((account, i) => (
                <AccountCard
                  key={account.handle}
                  account={account}
                  posts={cardPostsFor(account.handle, posts)}
                  spin
                  delay={180 * (i + 1)}
                />
              ))}
            </div>
          </div>
        ) : null}

        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {rest.slice(2).map((account, i) => (
            <AccountCard
              key={account.handle}
              account={account}
              posts={cardPostsFor(account.handle, posts)}
              spin
              delay={180 * (i + 3)}
            />
          ))}
        </div>
      </section>

      <section id="team" className="border-t border-line">
        <div className="mx-auto max-w-6xl scroll-mt-20 px-4 py-20 sm:px-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-subtle">
                The desk
              </p>
              <h2 className="mt-2 font-display text-3xl italic tracking-tight sm:text-4xl">
                Team
              </h2>
            </div>
            <p className="max-w-sm text-sm leading-relaxed text-muted">
              Named in the bios. Sxript runs Edits. Fishy runs Cats.
            </p>
          </div>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {team.map((account, i) => (
              <AccountCard
                key={account.handle}
                account={account}
                posts={cardPostsFor(account.handle, posts)}
                spin
                delay={180 * i}
              />
            ))}
          </div>
        </div>
      </section>

      <section id="about" className="mx-auto max-w-6xl scroll-mt-20 px-4 py-20 sm:px-6">
        <div className="max-w-2xl">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-subtle">
            Operator
          </p>
          <h2 className="mt-2 font-display text-3xl italic tracking-tight sm:text-4xl">
            Run by Ben
          </h2>
          <p className="mt-5 text-base leading-relaxed text-muted">
            @7490 is the OG creator behind GIFs Shitpost, GIFs Out Of Context,
            Edits That Goes Hard, Spider-Man Vibe, Ghost Rider Vibe, Batman
            Vault, Smithers, and Cat Posted. This is 7490 Nation —
            at 7490.org.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild>
              <Link to="/p/$handle" params={{ handle: "7490" }}>
                View Ben’s page
              </Link>
            </Button>
            <Button asChild variant="outline">
              <a href="https://x.com/7490" target="_blank" rel="noreferrer">
                @7490 on X
                <ArrowUpRight className="size-4" />
              </a>
            </Button>
          </div>
        </div>
      </section>

      <section id="wire" className="border-t border-line bg-surface/40">
        <div className="mx-auto max-w-6xl scroll-mt-20 px-4 py-20 sm:px-6">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-subtle">
                On the wire
              </p>
              <h2 className="mt-2 font-display text-3xl italic tracking-tight sm:text-4xl">
                Bangers
              </h2>
            </div>
            <Button type="button" variant="outline" onClick={shufflePost}>
              <Shuffle className="size-4" />
              Shuffle a GIF
            </Button>
          </div>

          <div className="mt-8 flex gap-2 overflow-x-auto pb-2">
            {FILTERS.map((f) => (
              <button
                key={f.id}
                type="button"
                onClick={() => setFilter(f.id)}
                className={cn(
                  "h-11 shrink-0 rounded-full px-4 text-sm transition-[background-color,color] duration-150",
                  filter === f.id
                    ? "bg-accent text-accent-fg"
                    : "bg-elevated text-muted hover:text-fg",
                )}
              >
                {f.label}
              </button>
            ))}
          </div>

          <div className="mt-8 columns-1 gap-4 sm:columns-2 lg:columns-3">
            {visible.map((post) => (
              <PostTile key={post.id} post={post} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-xs uppercase tracking-[0.16em] text-subtle">{label}</dt>
      <dd className="mt-1 font-mono text-lg tabular-nums text-fg">{value}</dd>
    </div>
  );
}

function AvatarCluster({
  accounts,
}: {
  accounts: { handle: string; name: string; avatar: string }[];
}) {
  const layout = [
    { handle: "GiFShitpost", slot: "cluster-1" },
    { handle: "EditsGoesHard", slot: "cluster-2" },
    { handle: "SpiderManVibe", slot: "cluster-3" },
    { handle: "GIFOOC", slot: "cluster-4" },
    { handle: "GhostRiderVibe", slot: "cluster-5" },
    { handle: "CatPosted", slot: "cluster-6" },
    { handle: "7490", slot: "cluster-7" },
    { handle: "Smithers", slot: "cluster-8" },
    { handle: "BatmanVault", slot: "cluster-9" },
  ];

  return (
    <div className="cluster">
      {layout.map((spot) => {
        const account = accounts.find((a) => a.handle === spot.handle);
        if (!account) return null;
        return (
          <Link
            key={account.handle}
            to="/p/$handle"
            params={{ handle: account.handle }}
            className={cn("cluster-item", spot.slot)}
            aria-label={account.name}
          >
            <img
              src={account.avatar}
              alt=""
              className="h-full w-full object-cover"
            />
          </Link>
        );
      })}
    </div>
  );
}
