import { useState, useEffect } from "react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Badge } from "./ui/badge";
import { Heart, ShoppingCart } from "lucide-react";
import { Button } from "./ui/button";
import { mockMarketplaceItems } from "../data/mockData";
import { useCart } from "../context/CartContext";
import { FNBProTipPopup } from "./FNBProTipPopup";

interface MarketplacePageProps {
  onViewItem?: (itemId: string) => void;
  onViewCart?: () => void;
}

const allMarketplaceItems = [
  {
    id: "1",
    title: "Vintage Leather Jacket",
    price: 120,
    image:
      "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=400&fit=crop",
    seller: "sarahm",
    category: "fashion",
    likes: 234,
    isNew: true,
  },
  {
    id: "2",
    title: "Minimalist Wall Art",
    price: 45,
    image:
      "https://images.unsplash.com/photo-1513519245088-0e12902e35ca?w=400&h=400&fit=crop",
    seller: "mikechen",
    category: "art",
    likes: 156,
  },
  {
    id: "3",
    title: "Ceramic Coffee Mug Set",
    price: 32,
    image:
      "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=400&h=400&fit=crop",
    seller: "emmad",
    category: "home",
    likes: 89,
  },
  {
    id: "4",
    title: "Wireless Headphones",
    price: 95,
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop",
    seller: "jameswil",
    category: "tech",
    likes: 412,
    isNew: true,
  },
  {
    id: "5",
    title: "Handmade Knit Sweater",
    price: 68,
    image:
      "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=400&h=400&fit=crop",
    seller: "sarahm",
    category: "fashion",
    likes: 203,
  },
  {
    id: "6",
    title: "Modern Table Lamp",
    price: 52,
    image:
      "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=400&h=400&fit=crop",
    seller: "mikechen",
    category: "home",
    likes: 167,
  },
  {
    id: "7",
    title: "Abstract Canvas Print",
    price: 85,
    image:
      "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400&h=400&fit=crop",
    seller: "emmad",
    category: "art",
    likes: 294,
  },
  {
    id: "8",
    title: "Denim Backpack",
    price: 55,
    image:
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop",
    seller: "jameswil",
    category: "fashion",
    likes: 178,
  },
  {
    id: "9",
    title: "Smart Watch",
    price: 199,
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop",
    seller: "sarahm",
    category: "tech",
    likes: 523,
    isNew: true,
  },
];

export function MarketplacePage({
  onViewItem,
  onViewCart,
}: MarketplacePageProps) {
  const [activeCategory, setActiveCategory] = useState("all");
  const [likedItems, setLikedItems] = useState<Set<string>>(new Set());
  const [showTipPopup, setShowTipPopup] = useState(false);
  const { getCartItemCount } = useCart();

  // Show FNB popup when entering marketplace
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowTipPopup(true);
    }, 1000); // Show after 1 second

    return () => clearTimeout(timer);
  }, []);

  const toggleLike = (itemId: string) => {
    setLikedItems((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(itemId)) {
        newSet.delete(itemId);
      } else {
        newSet.add(itemId);
      }
      return newSet;
    });
  };

  const filteredItems =
    activeCategory === "all"
      ? [...mockMarketplaceItems, ...allMarketplaceItems]
      : [...mockMarketplaceItems, ...allMarketplaceItems].filter(
          (item) => item.category === activeCategory,
        );

  return (
    <div className="pb-16">
      {/* FNB Pro Tip Popup */}
      <FNBProTipPopup
        isOpen={showTipPopup}
        onClose={() => setShowTipPopup(false)}
        tipNumber={Math.floor(Math.random() * 10) + 1}
      />

      {/* Category Tabs */}
      <div className="sticky top-14 bg-white border-b border-border z-40">
        <Tabs
          value={activeCategory}
          onValueChange={setActiveCategory}
          className="w-full"
        >
          <TabsList className="w-full justify-start rounded-none border-b-0 bg-transparent p-0 h-auto">
            <TabsTrigger
              value="all"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-black data-[state=active]:bg-transparent px-4 py-2"
            >
              All
            </TabsTrigger>
            <TabsTrigger
              value="fashion"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-black data-[state=active]:bg-transparent px-4 py-2"
            >
              Fashion
            </TabsTrigger>
            <TabsTrigger
              value="tech"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-black data-[state=active]:bg-transparent px-4 py-2"
            >
              Tech
            </TabsTrigger>
            <TabsTrigger
              value="art"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-black data-[state=active]:bg-transparent px-4 py-2"
            >
              Art
            </TabsTrigger>
            <TabsTrigger
              value="home"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-black data-[state=active]:bg-transparent px-4 py-2"
            >
              Home
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Items Grid */}
      <div className="grid grid-cols-2 gap-px bg-border mt-0">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            onClick={() => onViewItem?.(item.id)}
            className="bg-white p-3 cursor-pointer"
          >
            <div className="relative mb-2">
              <ImageWithFallback
                src={item.image}
                alt={item.title}
                className="w-full aspect-square object-cover rounded-lg"
              />
              {item.isNew && (
                <Badge className="absolute top-2 left-2 bg-primary text-white">
                  New
                </Badge>
              )}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleLike(item.id);
                }}
                className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm rounded-full p-1.5 transition-colors hover:bg-white"
                aria-label="Like item"
              >
                <Heart
                  className={`h-4 w-4 ${likedItems.has(item.id) ? "fill-primary text-primary" : "text-gray-700"}`}
                />
              </button>
            </div>

            <div className="space-y-1">
              <h3 className="text-sm font-medium line-clamp-2">{item.title}</h3>
              <p className="text-xs text-muted-foreground">@{item.seller}</p>
              <div className="flex items-center justify-between">
                <span className="font-semibold text-sm">R{item.price}</span>
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Heart className="h-3 w-3" />
                  {item.likes}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Floating Action Button - Positioned within container */}
      <div className="fixed bottom-20 left-0 right-0 pointer-events-none">
        <div className="max-w-[500px] mx-auto relative h-0">
          <Button
            onClick={onViewCart}
            className="absolute bottom-0 right-4 rounded-full h-14 w-14 shadow-lg pointer-events-auto"
            size="icon"
            aria-label="View cart"
          >
            <ShoppingCart className="h-6 w-6" />
            {getCartItemCount() > 0 && (
              <span className="absolute -top-1 -right-1 bg-primary text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {getCartItemCount()}
              </span>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
