import { useEffect, useMemo, useState } from "react";
import type { AssociatedSale } from "../types";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "./ui/sheet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { TrendingUp, Clock, DollarSign } from "lucide-react";
import { Badge } from "./ui/badge";
import { ScrollArea } from "./ui/scroll-area";
import { supabase } from "../lib/supabaseClient";
import {
  getPostOwnerEarningsForPost,
  getMyOwnerEarningsAllPosts,
  getMyOwnerEarningsForPost,
  getMyReferrerEarningsForPost,
} from "../services/earnings";
import {
  fetchOwnerSalesForPost,
  fetchMyReferrerSalesForPost,
} from "../services/sales";

interface AssociatedSalesSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  sales: AssociatedSale[]; // legacy prop, not used in this privacy-safe model
  postId: string; // legacy post id like "5"
  onViewItem?: (itemId: string) => void;
}

type EarningsSummary = {
  commission: number;
  salesTotal: number;
  salesCount: number;
};

export function AssociatedSalesSheet({
  open,
  onOpenChange,
  postId,
  onViewItem,
}: AssociatedSalesSheetProps) {
  const [loadError, setLoadError] = useState<string | null>(null);

  const [isAuthed, setIsAuthed] = useState(false);
  const [isOwner, setIsOwner] = useState(false);

  const [tab1Summary, setTab1Summary] = useState<EarningsSummary>({
    commission: 0,
    salesTotal: 0,
    salesCount: 0,
  });
  const [tab2Summary, setTab2Summary] = useState<EarningsSummary>({
    commission: 0,
    salesTotal: 0,
    salesCount: 0,
  });

  // Only the viewer's own earnings tab gets a list (privacy-safe).
  const [salesList, setSalesList] = useState<AssociatedSale[]>([]);

  // Determine owner vs viewer (requires auth to decide; otherwise treat as non-owner)
  useEffect(() => {
    if (!open) return;

    let cancelled = false;

    (async () => {
      try {
        setLoadError(null);

        const { data: userData } = await supabase.auth.getUser();
        const authed = !!userData?.user;
        if (!cancelled) setIsAuthed(authed);

        // Owner detection: compare auth.uid() to post owner by fetching post->profile id
        // We do a tiny query: posts where legacy_id = postId, select user_id
        const { data: postRow, error: postErr } = await supabase
          .from("posts")
          .select("user_id")
          .eq("legacy_id", postId)
          .single();

        if (postErr) throw new Error(postErr.message);

        const ownerId = postRow.user_id as string;
        const viewerId = userData?.user?.id ?? null;

        if (!cancelled) setIsOwner(!!viewerId && viewerId === ownerId);

        // TAB BEHAVIOR:
        // Owner:
        //   Tab1: this post (my earnings) -> my_owner_for_post + list owner sales
        //   Tab2: my earnings (all posts) -> my_owner_all_posts
        // Non-owner:
        //   Tab1: this post (owner’s earnings) -> public aggregate get_post_owner_earnings_for_post
        //   Tab2: my earnings (my share from this post) -> my_referrer_for_post + list my referrer sales

        if (!!viewerId && viewerId === ownerId) {
          // Owner view
          const [postMine, allMine, list] = await Promise.all([
            getMyOwnerEarningsForPost(postId),
            getMyOwnerEarningsAllPosts(),
            fetchOwnerSalesForPost(postId),
          ]);

          if (!cancelled) {
            setTab1Summary({
              commission: Number(postMine.owner_commission_total ?? 0),
              salesTotal: Number(postMine.sales_total ?? 0),
              salesCount: Number(postMine.sales_count ?? 0),
            });
            setTab2Summary({
              commission: Number(allMine.owner_commission_total ?? 0),
              salesTotal: Number(allMine.sales_total ?? 0),
              salesCount: Number(allMine.sales_count ?? 0),
            });
            setSalesList(list);
          }
        } else {
          // Non-owner view
          const ownerPerf = await getPostOwnerEarningsForPost(postId);

          if (!cancelled) {
            setTab1Summary({
              commission: Number(ownerPerf.owner_commission_total ?? 0),
              salesTotal: Number(ownerPerf.sales_total ?? 0),
              salesCount: Number(ownerPerf.sales_count ?? 0),
            });
          }

          if (authed) {
            const [myShare, list] = await Promise.all([
              getMyReferrerEarningsForPost(postId),
              fetchMyReferrerSalesForPost(postId),
            ]);

            if (!cancelled) {
              setTab2Summary({
                commission: Number(myShare.referrer_commission_total ?? 0),
                salesTotal: Number(myShare.sales_total ?? 0),
                salesCount: Number(myShare.sales_count ?? 0),
              });
              setSalesList(list);
            }
          } else {
            // Not logged in: can't have personal earnings
            if (!cancelled) {
              setTab2Summary({ commission: 0, salesTotal: 0, salesCount: 0 });
              setSalesList([]);
            }
          }
        }
      } catch (e) {
        const msg = e instanceof Error ? e.message : "Failed to load earnings";
        console.error(e);
        if (!cancelled) setLoadError(msg);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [open, postId]);

  const getTimeAgo = (date: Date) => {
    const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);

    if (seconds < 60) return "just now";
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
    if (seconds < 604800) return `${Math.floor(seconds / 86400)}d ago`;
    return `${Math.floor(seconds / 604800)}w ago`;
  };

  const renderSalesList = (list: AssociatedSale[]) => {
    if (list.length === 0) {
      return (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <TrendingUp className="h-12 w-12 text-muted-foreground mb-3" />
          <p className="text-muted-foreground">No earnings yet</p>
          <p className="text-sm text-muted-foreground mt-1">
            Keep sharing products to earn commissions!
          </p>
        </div>
      );
    }

    return (
      <div className="space-y-3">
        {list.map((sale) => (
          <div
            key={sale.id}
            className="flex gap-3 p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors cursor-pointer"
            onClick={() => onViewItem?.(sale.item.id)}
          >
            <div className="w-16 h-16 flex-shrink-0 bg-white rounded-md overflow-hidden">
              <ImageWithFallback
                src={sale.item.image}
                alt={sale.item.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="font-semibold text-sm truncate">
                {sale.item.title}
              </h4>
              <p className="text-xs text-muted-foreground">Sold</p>
              <div className="flex items-center gap-2 mt-1">
                <Badge variant="secondary" className="text-xs px-1.5 py-0">
                  <DollarSign className="h-3 w-3 mr-0.5" />R{sale.saleAmount}
                </Badge>
                <Badge
                  variant="default"
                  className="text-xs px-1.5 py-0 bg-primary/10 text-primary hover:bg-primary/20"
                >
                  +R{sale.commission.toFixed(2)}
                </Badge>
              </div>
            </div>
            <div className="flex flex-col items-end justify-between text-xs text-muted-foreground">
              <div className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                {getTimeAgo(sale.timestamp)}
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  // Tab labels per your spec
  const tab1Label = isOwner
    ? "This post (my earnings)"
    : "This post (owner’s earnings)";
  const tab2Label = isOwner
    ? "My earnings (all posts)"
    : "My earnings (my share)";

  // For non-owner, tab2 is personal. If not authed, we should hint (lightly).
  const tab2Hint =
    !isOwner && !isAuthed
      ? "Sign in to see your share earnings for this post."
      : null;

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="bottom" className="h-[80vh] p-0">
        <div className="flex flex-col h-full">
          <SheetHeader className="px-4 py-3 border-b">
            <SheetTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              Earnings
            </SheetTitle>
            <SheetDescription className="text-sm text-muted-foreground">
              Commission is 10% of sales. If a sale happens via a share,
              commission splits 70/30.
            </SheetDescription>
          </SheetHeader>

          {loadError && (
            <div className="px-4 py-2 text-xs text-muted-foreground border-b border-border">
              Error loading earnings: {loadError}
            </div>
          )}

          <Tabs
            key={`${postId}-${isOwner}-${isAuthed}`}
            defaultValue="tab1"
            className="flex-1 flex flex-col"
          >
            <TabsList className="w-full rounded-none border-b bg-transparent p-0">
              <TabsTrigger
                value="tab1"
                className="flex-1 rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
              >
                {tab1Label}
              </TabsTrigger>
              <TabsTrigger
                value="tab2"
                className="flex-1 rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
              >
                {tab2Label}
              </TabsTrigger>
            </TabsList>

            {/* TAB 1 */}
            <TabsContent value="tab1" className="flex-1 mt-0">
              <div className="p-4 border-b bg-muted/30">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">
                    Commission
                  </span>
                  <span className="font-semibold text-primary">
                    R{tab1Summary.commission.toFixed(2)}
                  </span>
                </div>
                <div className="mt-2 flex items-center justify-between text-sm text-muted-foreground">
                  <span>Sales</span>
                  <span>
                    {tab1Summary.salesCount} • R
                    {tab1Summary.salesTotal.toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Privacy: Tab1 for non-owner is aggregate only (no list) */}
              {isOwner ? (
                <ScrollArea className="h-[calc(100vh-240px)]">
                  <div className="p-4">{renderSalesList(salesList)}</div>
                </ScrollArea>
              ) : (
                <div className="p-6 text-sm text-muted-foreground">
                  This view shows post performance totals only.
                </div>
              )}
            </TabsContent>

            {/* TAB 2 */}
            <TabsContent value="tab2" className="flex-1 mt-0">
              <div className="p-4 border-b bg-muted/30">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">
                    Commission
                  </span>
                  <span className="font-semibold text-primary">
                    R{tab2Summary.commission.toFixed(2)}
                  </span>
                </div>
                <div className="mt-2 flex items-center justify-between text-sm text-muted-foreground">
                  <span>Sales</span>
                  <span>
                    {tab2Summary.salesCount} • R
                    {tab2Summary.salesTotal.toFixed(2)}
                  </span>
                </div>
              </div>

              {tab2Hint ? (
                <div className="p-6 text-sm text-muted-foreground">
                  {tab2Hint}
                </div>
              ) : (
                <ScrollArea className="h-[calc(100vh-240px)]">
                  <div className="p-4">{renderSalesList(salesList)}</div>
                </ScrollArea>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </SheetContent>
    </Sheet>
  );
}
