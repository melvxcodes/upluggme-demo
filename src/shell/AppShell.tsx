import { useMemo, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { MobileHeader } from "../components/MobileHeader";
import { MobileNav } from "../components/MobileNav";
import { MobileCreatePost } from "../components/MobileCreatePost";
import { CommentsSheet } from "../components/CommentsSheet";
import { AssociatedSalesSheet } from "../components/AssociatedSalesSheet";
import { MarketplaceItemView } from "../components/MarketplaceItemView";
import { Toaster } from "../components/ui/sonner";
import { toast } from "sonner";
import { mockAssociatedSales, mockMarketplaceItems } from "../data/mockData";
import { paths, PathKey } from "../routes/paths";

function getActiveTabFromPath(pathname: string): PathKey {
  if (pathname.startsWith(paths.explore)) return "explore";
  if (pathname.startsWith(paths.marketplace)) return "marketplace";
  if (pathname.startsWith(paths.cart)) return "cart";
  if (pathname.startsWith(paths.notifications)) return "notifications";
  if (pathname.startsWith(paths.messages)) return "messages";
  if (pathname.startsWith(paths.profile)) return "profile";
  return "home";
}

export function AppShell() {
  const navigate = useNavigate();
  const location = useLocation();

  const activeTab = useMemo(
    () => getActiveTabFromPath(location.pathname),
    [location.pathname],
  );

  const [createPostOpen, setCreatePostOpen] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);
  const [commentsPostId, setCommentsPostId] = useState<string | null>(null);
  const [salesPostId, setSalesPostId] = useState<string | null>(null);

  const selectedItem = useMemo(() => {
    return (
      mockMarketplaceItems.find((item) => item.id === selectedItemId) ?? null
    );
  }, [selectedItemId]);

  const handleNewPost = (content: string, image?: string) => {
    toast.success("Post shared successfully!");
    console.log("New post:", { content, image });
  };

  const onTabChange = (tab: string) => {
    // tab comes from your MobileNav component (strings like "home", "explore"...)
    // Keep this mapping strict.
    const key = tab as PathKey;
    const next = paths[key] ?? paths.home;
    navigate(next);
  };

  const onViewCart = () => navigate(paths.cart);

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-[500px] mx-auto min-h-screen relative">
        <MobileHeader
          onNotificationsClick={() => navigate(paths.notifications)}
          onMessagesClick={() => navigate(paths.messages)}
        />

        {/* Page content */}
        <Outlet />

        {/* Bottom nav */}
        <MobileNav
          activeTab={activeTab}
          onTabChange={onTabChange}
          onNewPost={() => setCreatePostOpen(true)}
        />

        {/* Create post modal */}
        <MobileCreatePost
          open={createPostOpen}
          onOpenChange={setCreatePostOpen}
          onPost={handleNewPost}
        />

        {/* Marketplace item overlay */}
        {selectedItem && (
          <MarketplaceItemView
            item={selectedItem}
            onClose={() => setSelectedItemId(null)}
          />
        )}

        {/* Comments sheet */}
        <CommentsSheet
          open={commentsPostId !== null}
          onOpenChange={(open) => !open && setCommentsPostId(null)}
          postId={commentsPostId || ""}
          onViewItem={(id) => setSelectedItemId(id)}
        />

        {/* Associated sales sheet */}
        <AssociatedSalesSheet
          open={salesPostId !== null}
          onOpenChange={(open) => !open && setSalesPostId(null)}
          postId={salesPostId || ""}
          sales={mockAssociatedSales}
          onViewItem={(id) => setSelectedItemId(id)}
        />
      </div>

      <Toaster />
    </div>
  );
}
