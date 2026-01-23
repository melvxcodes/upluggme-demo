import { AssociatedSale } from "../types";
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

interface AssociatedSalesSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  sales: AssociatedSale[];
  postId: string;
  onViewItem?: (itemId: string) => void;
}

export function AssociatedSalesSheet({
  open,
  onOpenChange,
  sales,
  postId,
  onViewItem,
}: AssociatedSalesSheetProps) {
  const postSales = sales.filter((sale) => sale.postId === postId);

  const getTimeAgo = (date: Date) => {
    const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);

    if (seconds < 60) return "just now";
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
    if (seconds < 604800) return `${Math.floor(seconds / 86400)}d ago`;
    return `${Math.floor(seconds / 604800)}w ago`;
  };

  const calculateTotalCommission = (salesList: AssociatedSale[]) => {
    return salesList.reduce((total, sale) => total + sale.commission, 0);
  };

  const renderSalesList = (salesList: AssociatedSale[]) => {
    if (salesList.length === 0) {
      return (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <TrendingUp className="h-12 w-12 text-muted-foreground mb-3" />
          <p className="text-muted-foreground">No sales yet</p>
          <p className="text-sm text-muted-foreground mt-1">
            Keep sharing products to earn commissions!
          </p>
        </div>
      );
    }

    return (
      <div className="space-y-3">
        {salesList.map((sale) => (
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
              <p className="text-xs text-muted-foreground">
                Sold to {sale.buyerUsername}
              </p>
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

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="bottom" className="h-[80vh] p-0">
        <div className="flex flex-col h-full">
          <SheetHeader className="px-4 py-3 border-b">
            <SheetTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              Associated Sales
            </SheetTitle>
            <SheetDescription className="text-sm text-muted-foreground">
              View all sales and commissions associated with your posts.
            </SheetDescription>
          </SheetHeader>

          <Tabs defaultValue="all" className="flex-1 flex flex-col">
            <TabsList className="w-full rounded-none border-b bg-transparent p-0">
              <TabsTrigger
                value="all"
                className="flex-1 rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
              >
                All Sales
                <Badge variant="secondary" className="ml-2 text-xs">
                  {sales.length}
                </Badge>
              </TabsTrigger>
              <TabsTrigger
                value="post"
                className="flex-1 rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
              >
                This Post
                <Badge variant="secondary" className="ml-2 text-xs">
                  {postSales.length}
                </Badge>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="flex-1 mt-0">
              <div className="p-4 border-b bg-muted/30">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">
                    Total Commission
                  </span>
                  <span className="font-semibold text-primary">
                    R{calculateTotalCommission(sales).toFixed(2)}
                  </span>
                </div>
              </div>
              <ScrollArea className="h-[calc(100vh-220px)]">
                <div className="p-4">{renderSalesList(sales)}</div>
              </ScrollArea>
            </TabsContent>

            <TabsContent value="post" className="flex-1 mt-0">
              <div className="p-4 border-b bg-muted/30">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">
                    Post Commission
                  </span>
                  <span className="font-semibold text-primary">
                    R{calculateTotalCommission(postSales).toFixed(2)}
                  </span>
                </div>
              </div>
              <ScrollArea className="h-[calc(100vh-220px)]">
                <div className="p-4">{renderSalesList(postSales)}</div>
              </ScrollArea>
            </TabsContent>
          </Tabs>
        </div>
      </SheetContent>
    </Sheet>
  );
}
