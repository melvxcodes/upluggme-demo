import { useEffect, useState } from "react";
import { StoriesBar } from "../components/StoriesBar";
import { MobilePostCard } from "../components/MobilePostCard";
import { toast } from "sonner";
import { useUIActions } from "../context/UIActionsContext";
import type { Post } from "../types";
import { fetchFeed } from "../services/feed";

// Optional fallback (so Home still renders something if DB isn’t seeded yet)
import {
  adPosts as mockAdPosts,
  mockPosts as mockPosts,
} from "../data/mockData";

export function HomeRoute() {
  const ui = useUIActions();

  const [posts, setPosts] = useState<Post[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        const data = await fetchFeed(30);
        if (!cancelled) setPosts(data);
      } catch (e) {
        const msg = e instanceof Error ? e.message : "Failed to load feed";
        console.error(e);
        if (!cancelled) {
          setError(msg);
          // fallback to mock so the UI stays alive while we debug
          const allPosts = [
            ...mockPosts.slice(0, 2),
            mockAdPosts[0],
            ...mockPosts.slice(2, 4),
            mockAdPosts[1],
            mockPosts[4],
          ] as unknown as Post[];
          setPosts(allPosts);
        }
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  const handleLike = (postId: string) => {
    console.log("Liked post:", postId);
  };

  return (
    <div className="pt-14">
      <StoriesBar />

      {error && (
        <div className="px-3 py-2 text-sm text-muted-foreground">
          Feed loaded from mock data (Supabase error: {error})
        </div>
      )}

      <div>
        {(posts ?? []).map((post) => (
          <MobilePostCard
            key={post.id}
            post={post}
            onLike={handleLike}
            onComment={(postId) => ui.openComments(postId)}
            onShare={(postId) => {
              toast.success("Shared to story!");
              console.log("Share post:", postId);
            }}
            onViewItem={(itemId) => ui.openItem(itemId)}
            onViewSales={(postId) => ui.openSales(postId)}
          />
        ))}
      </div>
    </div>
  );
}
