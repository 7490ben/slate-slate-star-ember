import { useEffect, useState } from "react";
import { Bookmark } from "lucide-react";
import { useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { useCurrentUserState } from "@/lib/auth/use-current-user";
import { listSaved, toggleSaved } from "@/lib/favorites";
import { cn } from "@/lib/utils";

export function SaveButton({ handle }: { handle: string }) {
  const { user, isPending } = useCurrentUserState();
  const navigate = useNavigate();
  const [saved, setSaved] = useState(false);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (!user) {
      setSaved(false);
      return;
    }
    let live = true;
    listSaved()
      .then((handles) => {
        if (live) setSaved(handles.includes(handle));
      })
      .catch(() => {
        if (live) setSaved(false);
      });
    return () => {
      live = false;
    };
  }, [user, handle]);

  async function onClick() {
    if (isPending) return;
    if (!user) {
      void navigate({ to: "/login" });
      return;
    }
    setBusy(true);
    try {
      const next = await toggleSaved({ data: handle });
      setSaved(next.saved);
      toast(next.saved ? "Saved to your collection" : "Removed from collection");
    } catch {
      toast("Could not update collection");
    } finally {
      setBusy(false);
    }
  }

  return (
    <Button
      type="button"
      variant="outline"
      size="md"
      onClick={() => void onClick()}
      disabled={busy}
      aria-pressed={saved}
      aria-label={saved ? "Remove from collection" : "Save to collection"}
    >
      <Bookmark
        className={cn(saved && "fill-fg")}
        strokeWidth={1.75}
      />
      {saved ? "Saved" : "Collect"}
    </Button>
  );
}
