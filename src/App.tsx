import { useState } from "react";
import { MobileNav } from "./components/MobileNav";
import { MobileHeader } from "./components/MobileHeader";
import { StoriesBar } from "./components/StoriesBar";
import { MobilePostCard } from "./components/MobilePostCard";
import { MobileCreatePost } from "./components/MobileCreatePost";
import { MobileProfileView } from "./components/MobileProfileView";
import { ExplorePage } from "./components/ExplorePage";
import { NotificationsPage } from "./components/NotificationsPage";
import { MessagesPage } from "./components/MessagesPage";
import { MarketplacePage } from "./components/MarketplacePage";
import { MarketplaceItemView } from "./components/MarketplaceItemView";
import { CartPage } from "./components/CartPage";
import { CommentsSheet } from "./components/CommentsSheet";
import { AssociatedSalesSheet } from "./components/AssociatedSalesSheet";
import {
  mockPosts,
  adPosts,
  mockMarketplaceItems,
  mockAssociatedSales,
} from "./data/mockData";
import { Post } from "./types";
import { toast } from "sonner";
import { Toaster } from "./components/ui/sonner";
import { CartProvider } from "./context/CartContext";

export default function App() {
  const [activeTab, setActiveTab] = useState("home");
  const allPosts = [
    ...mockPosts.slice(0, 2),
    adPosts[0],
    ...mockPosts.slice(2, 4),
    adPosts[1],
    mockPosts[4],
  ];
  const [posts, setPosts] = useState<Post[]>(allPosts);
  const [createPostOpen, setCreatePostOpen] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);
  const [commentsPostId, setCommentsPostId] = useState<string | null>(null);
  const [salesPostId, setSalesPostId] = useState<string | null>(null);
  const [likedPosts, setLikedPosts] = useState<Set<string>>(
    new Set(["2", "4", "5"])
  );
  const [bookmarkedPosts, setBookmarkedPosts] = useState<Set<string>>(
    new Set(["1", "3"])
  );

  const handleNewPost = (content: string, image?: string) => {
    toast.success("Post shared successfully!");
    console.log("New post:", { content, image });
  };

  const handleLike = (postId: string) => {
    console.log("Liked post:", postId);
  };

  const handleComment = (postId: string) => {
    setCommentsPostId(postId);
  };

  const handleShare = (postId: string) => {
    toast.success("Shared to story!");
    console.log("Share post:", postId);
  };

  const handleNotificationsClick = () => {
    setActiveTab("notifications");
  };

  const handleMessagesClick = () => {
    setActiveTab("messages");
  };

  const handleViewItem = (itemId: string) => {
    setSelectedItemId(itemId);
  };

  const handleViewCart = () => {
    setActiveTab("cart");
  };

  const handleViewSales = (postId: string) => {
    setSalesPostId(postId);
  };

  const selectedItem = mockMarketplaceItems.find(
    (item) => item.id === selectedItemId
  );

  const renderContent = () => {
    switch (activeTab) {
      case "home":
        return (
          <div className="pt-14">
            <StoriesBar />
            <div>
              {posts.map((post) => (
                <MobilePostCard
                  key={post.id}
                  post={post}
                  onLike={handleLike}
                  onComment={handleComment}
                  onShare={handleShare}
                  onViewItem={handleViewItem}
                  onViewSales={handleViewSales}
                />
              ))}
            </div>
          </div>
        );
      case "explore":
        return (
          <div className="pt-14">
            <div className="p-4 border-b border-border">
              <input
                type="search"
                placeholder="Search"
                className="w-full bg-muted rounded-lg px-4 py-2 text-sm outline-none"
              />
            </div>
            <ExplorePage onViewItem={handleViewItem} />
          </div>
        );
      case "marketplace":
        return (
          <div className="pt-14">
            <MarketplacePage
              onViewItem={handleViewItem}
              onViewCart={handleViewCart}
            />
          </div>
        );
      case "cart":
        return (
          <div className="pt-14">
            <div className="p-4 border-b border-border">
              <h2 className="font-semibold text-xl">Shopping Cart</h2>
            </div>
            <CartPage />
          </div>
        );
      case "notifications":
        return (
          <div className="pt-14">
            <NotificationsPage />
          </div>
        );
      case "messages":
        return (
          <div className="pt-14">
            <MessagesPage />
          </div>
        );
      case "profile":
        return (
          <div className="pt-14">
            <MobileProfileView
              likedPosts={likedPosts}
              bookmarkedPosts={bookmarkedPosts}
            />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <CartProvider>
      <div className="min-h-screen bg-white">
        <div className="max-w-[500px] mx-auto min-h-screen relative">
          <MobileHeader
            onNotificationsClick={handleNotificationsClick}
            onMessagesClick={handleMessagesClick}
          />
          {renderContent()}
          <MobileNav
            activeTab={activeTab}
            onTabChange={setActiveTab}
            onNewPost={() => setCreatePostOpen(true)}
          />
          <MobileCreatePost
            open={createPostOpen}
            onOpenChange={setCreatePostOpen}
            onPost={handleNewPost}
          />

          {selectedItem && (
            <MarketplaceItemView
              item={selectedItem}
              onClose={() => setSelectedItemId(null)}
            />
          )}

          <CommentsSheet
            open={commentsPostId !== null}
            onOpenChange={(open) => !open && setCommentsPostId(null)}
            postId={commentsPostId || ""}
            onViewItem={handleViewItem}
          />

          <AssociatedSalesSheet
            open={salesPostId !== null}
            onOpenChange={(open) => !open && setSalesPostId(null)}
            postId={salesPostId || ""}
            sales={mockAssociatedSales}
            onViewItem={handleViewItem}
          />
        </div>
        <Toaster />
      </div>
    </CartProvider>
  );
}
