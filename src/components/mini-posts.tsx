import { Eye, Heart } from "lucide-react";
import { GifLoop } from "@/components/gif-loop";
import { formatCount } from "@/lib/utils";
import { postUrl, type Post } from "@/lib/network";

export function MiniPosts({
  posts,
  count = 2,
}: {
  posts: Post[];
  count?: number;
}) {
  const slice = posts.slice(0, count);
  if (!slice.length) return null;

  return (
    <div className="grid grid-cols-2 gap-1.5">
      {slice.map((post) => (
        <a
          key={post.id}
          href={postUrl(post)}
          target="_blank"
          rel="noreferrer"
          className="group/mini relative block overflow-hidden rounded-[var(--radius-sm)] bg-elevated"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="banner-crop">
            {post.media?.kind === "video" ||
            (post.media && post.media.src.endsWith(".mp4")) ? (
              <GifLoop src={post.media.src} alt={post.text || ""} />
            ) : post.media?.kind === "image" ? (
              <img src={post.media.src} alt={post.text || ""} />
            ) : (
              <div className="flex h-full items-center px-3">
                <p className="line-clamp-2 font-display text-sm italic text-fg">
                  {post.text || "Open on X"}
                </p>
              </div>
            )}
          </div>
          <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-center gap-2 bg-gradient-to-t from-bg/90 to-transparent px-2 pb-1.5 pt-6 font-mono text-[10px] tabular-nums text-fg">
            <span className="inline-flex items-center gap-1">
              <Heart className="size-3" />
              {formatCount(post.likes)}
            </span>
            <span className="inline-flex items-center gap-1 text-muted">
              <Eye className="size-3" />
              {formatCount(post.views)}
            </span>
          </div>
        </a>
      ))}
    </div>
  );
}
