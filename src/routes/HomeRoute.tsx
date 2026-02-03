import { useMemo, useState } from "react";
import { StoriesBar } from "../components/StoriesBar";
import { MobilePostCard } from "../components/MobilePostCard";
import { toast } from "sonner";
import { Post } from "../types";
import { adPosts, mockPosts } from "../data/mockData";
import { useUIActions } from "../context/UIActionsContext";

export function HomeRoute() {
  const ui = useUIActions();

  const allPosts = useMemo(() => {
    return [
      ...mockPosts.slice(0, 2),
      adPosts[0],
      ...mockPosts.slice(2, 4),
      adPosts[1],
      mockPosts[4],
    ];
  }, []);

  const [posts] = useState<Post[]>(allPosts);

  const handleLike = (postId: string) => {
    console.log("Liked post:", postId);
  };

  return (
    <div className="pt-14">
      <StoriesBar />
      <div>
        {posts.map((post) => (
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
