import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

type GifLoopProps = {
  src: string;
  className?: string;
  alt?: string;
};

export function GifLoop({ src, className, alt = "" }: GifLoopProps) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      el.pause();
      return;
    }
    el.muted = true;
    el.defaultMuted = true;
    void el.play().catch(() => {});
    const kick = () => {
      el.muted = true;
      void el.play().catch(() => {});
    };
    el.addEventListener("canplay", kick);
    el.addEventListener("loadeddata", kick);
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry) return;
        if (entry.isIntersecting) void el.play().catch(() => {});
        else el.pause();
      },
      { threshold: 0.15 },
    );
    io.observe(el);
    return () => {
      el.removeEventListener("canplay", kick);
      el.removeEventListener("loadeddata", kick);
      io.disconnect();
    };
  }, [src]);

  return (
    <video
      ref={ref}
      src={src}
      className={cn("h-full w-full object-cover", className)}
      muted
      loop
      playsInline
      autoPlay
      preload="auto"
      aria-label={alt || undefined}
    />
  );
}
