import { useEffect, useMemo, useState } from "react";
import {
  ACCOUNTS,
  POSTS,
  TEAM,
  mergeAccount,
  mergePosts,
  type Account,
  type Post,
} from "@/lib/network";
import { fetchLiveNetwork, type LiveSnapshot } from "@/lib/x-live";

export function useLiveNetwork() {
  const [snap, setSnap] = useState<LiveSnapshot | null>(null);
  const [fresh, setFresh] = useState(false);

  useEffect(() => {
    let on = true;
    const pull = () =>
      fetchLiveNetwork()
        .then((d) => {
          if (!on) return;
          setSnap(d);
          setFresh(true);
          window.setTimeout(() => {
            if (on) setFresh(false);
          }, 1200);
        })
        .catch(() => {});
    void pull();
    const id = window.setInterval(pull, 45_000);
    return () => {
      on = false;
      window.clearInterval(id);
    };
  }, []);

  const accounts: Account[] = useMemo(
    () => ACCOUNTS.map((a) => mergeAccount(a, snap?.profiles[a.handle])),
    [snap],
  );

  const team: Account[] = useMemo(
    () => TEAM.map((a) => mergeAccount(a, snap?.profiles[a.handle])),
    [snap],
  );

  const posts: Post[] = useMemo(
    () => mergePosts(POSTS, snap?.likes),
    [snap],
  );

  return { accounts, team, posts, fetchedAt: snap?.fetchedAt ?? null, fresh };
}
