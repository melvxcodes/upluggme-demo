import { useMemo, useState } from "react";
import { StoriesBar } from "../components/StoriesBar";
import { MobilePostCard } from "../components/MobilePostCard";
import { toast } from "sonner";
import { Post } from "../types";
import { adPosts, mockMarketplaceItems, mockPosts } from "../data/mockData";

type Props = {
  onViewItem: (itemId: string) => void;
  onComment: (postId: string) => void;
  onShare: (postId: string) => void;
  onViewSales: (postId: string) => void;
};

export function HomeRoute({
  onViewItem,
  onComment,
  onShare,
  onViewSales,
}: Props) {
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
            onComment={onComment}
            onShare={(id) => {
              toast.success("Shared to story!");
              onShare(id);
            }}
            onViewItem={(itemId) => {
              // Keep current behavior: open marketplace item overlay
              // (itemId comes from product tags inside posts)
              const found = mockMarketplaceItems.find((x) => x.id === itemId);
              if (found) onViewItem(itemId);
              else console.log("Item not found:", itemId);
            }}
            onViewSales={onViewSales}
          />
        ))}
      </div>
    </div>
  );
}
