import React from "react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { mockPosts, mockMarketplaceItems } from "../data/mockData";
import { TrendingUp } from "lucide-react";
import { ScrollArea } from "./ui/scroll-area";

interface ExplorePageProps {
  onViewItem?: (itemId: string) => void;
}

const trendingHashtags = [
  { tag: "#SouthAfrica", posts: "2.3M" },
  { tag: "#Fashion", posts: "1.8M" },
  { tag: "#Tech", posts: "1.5M" },
  { tag: "#StreetStyle", posts: "987K" },
  { tag: "#HomeDecor", posts: "856K" },
  { tag: "#Fitness", posts: "743K" },
  { tag: "#LocalBusiness", posts: "621K" },
  { tag: "#Vintage", posts: "534K" },
];

export function ExplorePage({ onViewItem }: ExplorePageProps) {
  const explorePosts = [...mockPosts, ...mockPosts].filter(
    (post) => post.image
  );
  const hottestItems = mockMarketplaceItems.slice(0, 4);

  return (
    <div className="pb-16">
      {/* Hottest Selling Items Carousel */}
      <div className="border-b border-border">
        <div className="px-4 py-3 flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-primary" />
          <h2 className="font-semibold">Hottest Items</h2>
        </div>
        <ScrollArea className="w-full whitespace-nowrap">
          <div className="flex gap-3 px-4 pb-4">
            {hottestItems.map((item) => (
              <div
                key={item.id}
                onClick={() => onViewItem?.(item.id)}
                className="inline-block w-40 cursor-pointer"
              >
                <div className="relative mb-2">
                  <ImageWithFallback
                    src={item.image}
                    alt={item.title}
                    className="w-full aspect-square object-cover rounded-lg"
                  />
                  {item.isNew && (
                    <div className="absolute top-2 left-2 bg-primary text-white text-xs px-2 py-1 rounded">
                      New
                    </div>
                  )}
                </div>
                <h3 className="text-sm font-semibold line-clamp-2 mb-1">
                  {item.title}
                </h3>
                <p className="text-sm font-semibold text-primary">
                  R{item.price}
                </p>
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>

      {/* Trending Hashtags */}
      <div className="border-b border-border">
        <div className="px-4 py-3">
          <h2 className="font-semibold mb-3">Trending Now</h2>
          <div className="space-y-3">
            {trendingHashtags.map((trend, index) => (
              <button
                key={trend.tag}
                className="w-full text-left flex items-center justify-between hover:bg-muted/50 p-2 rounded-lg transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span className="text-sm text-muted-foreground w-5">
                    {index + 1}
                  </span>
                  <div>
                    <p className="font-semibold">{trend.tag}</p>
                    <p className="text-sm text-muted-foreground">
                      {trend.posts} posts
                    </p>
                  </div>
                </div>
                <TrendingUp className="h-4 w-4 text-primary" />
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Photo Grid */}
      <div className="grid grid-cols-3 gap-px bg-border">
        {explorePosts.map((post, index) => (
          <div
            key={`${post.id}-${index}`}
            className="aspect-square bg-white cursor-pointer hover:opacity-90 transition-opacity"
          >
            <ImageWithFallback
              src={post.image!}
              alt="Explore post"
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
