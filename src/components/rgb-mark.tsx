import { cn } from "@/lib/utils";

export function RgbMark({
  className,
  size = "hero",
}: {
  className?: string;
  size?: "hero" | "nav" | "pack";
}) {
  return (
    <span
      className={cn(
        "inline-flex items-baseline gap-1.5",
        size === "hero" && "flex-col items-start gap-1",
        className,
      )}
    >
      <span
        data-text="7490"
        className={cn(
          "rgb-flow font-display italic tracking-tight",
          size === "hero" && "text-hero",
          size === "nav" && "text-xl sm:text-2xl",
          size === "pack" && "text-4xl",
        )}
      >
        7490
      </span>
      <span
        data-text="Nation"
        className={cn(
          "rgb-flow font-display italic tracking-tight",
          size === "hero" && "text-3xl sm:text-4xl",
          size === "nav" && "text-base",
          size === "pack" && "text-lg",
        )}
      >
        Nation
      </span>
    </span>
  );
}
