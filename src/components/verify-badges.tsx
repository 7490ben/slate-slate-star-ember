import { cn } from "@/lib/utils";
import type { VerifyType } from "@/lib/network";

export function VerifyBadge({
  verified,
  verifyType,
  className,
}: {
  verified: boolean;
  verifyType: VerifyType;
  className?: string;
}) {
  if (!verified || !verifyType) return null;
  const org = verifyType === "organization";
  return (
    <span
      className={cn("inline-flex shrink-0", className)}
      title={org ? "Verified organization" : "Verified"}
    >
      <svg viewBox="0 0 24 24" className="size-4" aria-hidden="true">
        <circle cx="12" cy="12" r="11" fill={org ? "#e2b203" : "#1d9bf0"} />
        <path
          d="M10.1 15.6 6.8 12.3l1.2-1.2 2.1 2.1 5-5 1.2 1.2z"
          fill="#fff"
        />
      </svg>
      <span className="sr-only">{org ? "Organization verified" : "Verified"}</span>
    </span>
  );
}

export function AffiliateBadge({ label }: { label?: string }) {
  if (!label) return null;
  return (
    <span
      className="inline-flex items-center gap-1 rounded-full bg-elevated px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.14em] text-muted"
      title={`Affiliate · ${label}`}
    >
      <svg viewBox="0 0 24 24" className="size-3.5" aria-hidden="true">
        <circle cx="12" cy="12" r="11" fill="#8b98a5" />
        <path
          d="M10.1 15.6 6.8 12.3l1.2-1.2 2.1 2.1 5-5 1.2 1.2z"
          fill="#fff"
        />
      </svg>
      {label}
    </span>
  );
}

export function AffiliateRow({ labels }: { labels: string[] }) {
  if (!labels.length) return null;
  return (
    <div className="mt-2 flex flex-wrap gap-1.5">
      {labels.map((label) => (
        <AffiliateBadge key={label} label={label} />
      ))}
    </div>
  );
}
