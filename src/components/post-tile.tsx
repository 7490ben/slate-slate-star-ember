import { Eye, ExternalLink, Heart } from "lucide-react";
import { GifLoop } from "@/components/gif-loop";
import { formatCount } from "@/lib/utils";
import { accountByHandle, postUrl, type Post } from "@/lib/network";
import { cn } from "@/lib/utils";

export function PostTile({
  post,
  className,
}: {
  post: Post;
  className?: string;
}) {
  const account = accountByHandle(post.handle);
  const href = postUrl(post);

  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className={cn(
        "group relative mb-4 block break-inside-avoid overflow-hidden rounded-[var(--radius-lg)] bg-surface shadow-line transition-[box-shadow] duration-150 ease-out hover:shadow-line-hover",
        className,
      )}
    >
      <div className="banner-crop">
        {post.media?.kind === "video" ? (
          <GifLoop src={post.media.src} alt={post.text || `${post.handle} gif`} />
        ) : post.media?.kind === "image" ? (
          <img
            src={post.media.src}
            alt={post.text || `${post.handle} post`}
            className="transition-transform duration-200 ease-out group-hover:scale-[1.03]"
          />
        ) : (
          <div className="flex h-full flex-col justify-between p-5">
            <p className="font-display text-xl leading-snug italic text-fg">
              {post.text || "Open on X"}
            </p>
          </div>
        )}
      </div>

      <div className="flex items-center justify-between gap-3 px-3 py-2.5">
        <div className="flex min-w-0 items-center gap-2">
          {account ? (
            <img
              src={account.avatar}
              alt=""
              className="size-6 rounded-full object-cover"
            />
          ) : null}
          <span className="truncate text-xs text-muted">@{post.handle}</span>
        </div>
        <span className="flex items-center gap-3 font-mono text-xs tabular-nums text-subtle">
          <span className="inline-flex items-center gap-1 text-fg">
            <Heart className="size-3" />
            {formatCount(post.likes)}
          </span>
          <span className="inline-flex items-center gap-1">
            <Eye className="size-3" />
            {formatCount(post.views)}
          </span>
          <ExternalLink className="size-3 opacity-0 transition-opacity duration-150 group-hover:opacity-100" />
        </span>
      </div>
    </a>
  );
}
