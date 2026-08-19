import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PostTile } from "@/components/post-tile";
import { AccountCard } from "@/components/account-card";
import { AffiliateRow, VerifyBadge } from "@/components/verify-badges";
import { MiniPosts } from "@/components/mini-posts";
import { accountByHandle, affiliateLabels, cardPostsFor, postsFor, TEAM } from "@/lib/network";
import { useLiveNetwork } from "@/lib/use-live-network";
import { formatCount } from "@/lib/utils";

export const Route = createFileRoute("/p/$handle")({
  component: AccountPage,
  loader: ({ params }) => {
    const account = accountByHandle(params.handle);
    if (!account) throw notFound();
    return { handle: account.handle };
  },
  notFoundComponent: () => (
    <main className="mx-auto max-w-lg px-4 py-24 text-center">
      <h1 className="font-display text-3xl italic">Page not in the nation</h1>
      <p className="mt-3 text-sm text-muted">
        That handle is not one of the 7490 pages.
      </p>
      <Button asChild variant="outline" className="mt-8">
        <Link to="/">Back to gallery</Link>
      </Button>
    </main>
  ),
});

function AccountPage() {
  const { handle } = Route.useLoaderData();
  const { accounts, team, posts } = useLiveNetwork();
  const account =
    accounts.find((a) => a.handle.toLowerCase() === handle.toLowerCase()) ??
    team.find((a) => a.handle.toLowerCase() === handle.toLowerCase()) ??
    accountByHandle(handle);
  if (!account) return null;

  const mine = postsFor(account.handle, posts);
  const cardMine = cardPostsFor(account.handle, posts);
  const onTeam = TEAM.some(
    (t) => t.handle.toLowerCase() === account.handle.toLowerCase(),
  );
  const others = accounts.filter((a) => a.handle !== account.handle);
  const admins = onTeam
    ? team.filter((a) => a.handle !== account.handle)
    : team.filter((t) =>
        affiliateLabels(t).some(
          (label) => label.toLowerCase() === account.handle.toLowerCase(),
        ),
      );

  return (
    <main className="mx-auto max-w-6xl px-4 pb-20 sm:px-6">
      <Link
        to="/"
        className="mt-8 inline-flex h-11 items-center gap-2 text-sm text-muted hover:text-fg"
      >
        <ArrowLeft className="size-4" />
        All pages
      </Link>

      <section className="mt-6">
        <div className="overflow-hidden rounded-[var(--radius-2xl)] bg-surface shadow-line">
          <div className="banner-crop sm:aspect-[3/1]">
            <img src={account.banner} alt="" />
          </div>
          <div className="relative px-5 pb-6 pt-0 sm:px-8">
            <img
              src={account.avatar}
              alt=""
              className="-mt-10 size-20 rounded-full object-cover outline outline-4 outline-surface sm:-mt-12 sm:size-24"
            />
            <div className="mt-4 flex flex-wrap items-start justify-between gap-4">
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h1 className="font-display text-4xl italic leading-none tracking-tight sm:text-5xl">
                    {account.name}
                  </h1>
                  <VerifyBadge
                    verified={account.verified}
                    verifyType={account.verifyType}
                  />
                </div>
                <p className="mt-2 text-lg text-muted">@{account.handle}</p>
                <AffiliateRow labels={affiliateLabels(account)} />
              </div>
              <div className="flex flex-wrap gap-3">
                <Button asChild size="lg">
                  <a href={account.xUrl} target="_blank" rel="noreferrer">
                    Open on X
                    <ArrowUpRight className="size-4" />
                  </a>
                </Button>
              </div>
            </div>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted">
              {account.bio}
            </p>
            <dl className="mt-6 grid max-w-lg grid-cols-3 gap-4 font-mono text-sm tabular-nums">
              <div>
                <dt className="text-[10px] uppercase tracking-[0.14em] text-subtle">
                  Followers
                </dt>
                <dd className="mt-1 text-lg">{formatCount(account.followers)}</dd>
              </div>
              <div>
                <dt className="text-[10px] uppercase tracking-[0.14em] text-subtle">
                  Following
                </dt>
                <dd className="mt-1 text-lg">{formatCount(account.following)}</dd>
              </div>
              <div>
                <dt className="text-[10px] uppercase tracking-[0.14em] text-subtle">
                  Posts
                </dt>
                <dd className="mt-1 text-lg">{formatCount(account.tweets)}</dd>
              </div>
            </dl>
            <div className="mt-6">
              <MiniPosts posts={cardMine} count={4} />
            </div>
          </div>
        </div>
      </section>

      <section className="mt-16">
        <div className="flex items-end justify-between gap-4">
          <h2 className="font-display text-3xl italic tracking-tight">
            Bangers
          </h2>
          <span className="font-mono text-xs tabular-nums text-subtle">
            {mine.length} posts
          </span>
        </div>
        {mine.length === 0 ? (
          <p className="mt-8 text-sm text-muted">No bangers archived yet.</p>
        ) : (
          <div className="mt-8 columns-1 gap-4 sm:columns-2 lg:columns-3">
            {mine.map((post) => (
              <PostTile key={post.id} post={post} />
            ))}
          </div>
        )}
      </section>

      {admins.length ? (
        <section className="mt-20">
          <h2 className="font-display text-3xl italic tracking-tight">Admins</h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {admins.map((a) => (
              <AccountCard
                key={a.handle}
                account={a}
                posts={cardPostsFor(a.handle, posts)}
              />
            ))}
          </div>
        </section>
      ) : null}

      {onTeam ? null : (
        <section className="mt-20">
          <h2 className="font-display text-3xl italic tracking-tight">
            The rest of the nation
          </h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {others.map((a) => (
              <AccountCard
                key={a.handle}
                account={a}
                posts={cardPostsFor(a.handle, posts)}
              />
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
