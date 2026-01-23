import React, { useState } from "react";
import { Post } from "../types";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";
import {
  Heart,
  MessageSquare,
  Bookmark,
  MoreHorizontal,
  ShoppingBag,
  TrendingUp,
} from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { useCart } from "../context/CartContext";

interface MobilePostCardProps {
  post: Post;
  onLike?: (postId: string) => void;
  onComment?: (postId: string) => void;
  onShare?: (postId: string) => void;
  onViewItem?: (itemId: string) => void;
  onViewSales?: (postId: string) => void;
}

export function MobilePostCard({
  post,
  onLike,
  onComment,
  onShare,
  onViewItem,
  onViewSales,
}: MobilePostCardProps) {
  const [isLiked, setIsLiked] = useState(post.isLiked || false);
  const [likes, setLikes] = useState(post.likes);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const { addToCart } = useCart();

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikes(isLiked ? likes - 1 : likes + 1);
    onLike?.(post.id);
  };

  const handleAddToCart = () => {
    if (post.marketplaceItem) {
      addToCart(post.marketplaceItem);
    }
  };

  const handleShopNow = () => {
    if (post.marketplaceItem) {
      onViewItem?.(post.marketplaceItem.id);
    }
  };

  const getTimeAgo = (date: Date) => {
    const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);

    if (seconds < 60) return "just now";
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}h`;
    return `${Math.floor(seconds / 86400)}d`;
  };

  return (
    <article className="bg-white mb-2">
      {/* Header */}
      <div className="flex items-center justify-between px-3 py-2">
        <div className="flex items-center gap-2">
          {!post.isAd && (
            <Avatar className="h-8 w-8">
              <AvatarImage src={post.user.avatar} alt={post.user.name} />
              <AvatarFallback>{post.user.name.charAt(0)}</AvatarFallback>
            </Avatar>
          )}
          <div className="flex items-center gap-1">
            <span className="font-semibold text-sm">
              {post.isAd
                ? "UPLUGGME Shop"
                : post.user.username.replace("@", "")}
            </span>
            <span className="text-muted-foreground text-sm">
              • {getTimeAgo(post.timestamp)}
            </span>
          </div>
        </div>
        <button aria-label="More options">
          <MoreHorizontal className="h-5 w-5" />
        </button>
      </div>

      {/* Image */}
      {post.image && (
        <div className="w-full aspect-[5/4] bg-muted">
          <ImageWithFallback
            src={post.image}
            alt="Post image"
            className="w-full h-full object-cover"
          />
        </div>
      )}

      {/* Content Container */}
      <div className="px-3 py-2">
        {/* For posts WITH images: show actions first, then caption */}
        {post.image ? (
          <>
            {/* Actions */}
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  <button onClick={handleLike} aria-label="Like">
                    <Heart
                      className={`h-6 w-6 ${
                        isLiked ? "fill-primary text-primary" : ""
                      }`}
                      strokeWidth={2}
                    />
                  </button>
                  <span className="font-semibold text-sm">
                    {likes.toLocaleString()}
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => onComment?.(post.id)}
                    aria-label="Comment"
                  >
                    <MessageSquare className="h-6 w-6" strokeWidth={2} />
                  </button>
                  <span className="font-semibold text-sm">{post.comments}</span>
                </div>
                {!post.isAd && (
                  <button
                    onClick={() => onViewSales?.(post.id)}
                    aria-label="View associated sales"
                    className="transition-colors hover:text-primary"
                  >
                    <TrendingUp className="h-6 w-6" strokeWidth={2} />
                  </button>
                )}
              </div>
              {post.isAd && post.marketplaceItem ? (
                <button
                  onClick={handleAddToCart}
                  aria-label="Add to cart"
                  className="transition-colors hover:text-primary"
                >
                  <ShoppingBag className="h-6 w-6" strokeWidth={2} />
                </button>
              ) : (
                <button
                  onClick={() => setIsBookmarked(!isBookmarked)}
                  aria-label="Save"
                >
                  <Bookmark
                    className={`h-6 w-6 ${isBookmarked ? "fill-current" : ""}`}
                    strokeWidth={2}
                  />
                </button>
              )}
            </div>

            {/* Caption */}
            <div className="text-sm">
              {!post.isAd && (
                <span className="font-semibold mr-2">
                  {post.user.username.replace("@", "")}
                </span>
              )}
              <span className="whitespace-pre-wrap">{post.content}</span>
            </div>
          </>
        ) : (
          <>
            {/* Caption first for text-only posts */}
            <div className="text-sm mb-3">
              {!post.isAd && (
                <span className="font-semibold mr-2">
                  {post.user.username.replace("@", "")}
                </span>
              )}
              <span className="whitespace-pre-wrap">{post.content}</span>
            </div>

            {/* Actions below text for text-only posts */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  <button onClick={handleLike} aria-label="Like">
                    <Heart
                      className={`h-6 w-6 ${
                        isLiked ? "fill-primary text-primary" : ""
                      }`}
                      strokeWidth={2}
                    />
                  </button>
                  <span className="font-semibold text-sm">
                    {likes.toLocaleString()}
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => onComment?.(post.id)}
                    aria-label="Comment"
                  >
                    <MessageSquare className="h-6 w-6" strokeWidth={2} />
                  </button>
                  <span className="font-semibold text-sm">{post.comments}</span>
                </div>
                {!post.isAd && (
                  <button
                    onClick={() => onViewSales?.(post.id)}
                    aria-label="View associated sales"
                    className="transition-colors hover:text-primary"
                  >
                    <TrendingUp className="h-6 w-6" strokeWidth={2} />
                  </button>
                )}
              </div>
              {post.isAd && post.marketplaceItem ? (
                <button
                  onClick={handleAddToCart}
                  aria-label="Add to cart"
                  className="transition-colors hover:text-primary"
                >
                  <ShoppingBag className="h-6 w-6" strokeWidth={2} />
                </button>
              ) : (
                <button
                  onClick={() => setIsBookmarked(!isBookmarked)}
                  aria-label="Save"
                >
                  <Bookmark
                    className={`h-6 w-6 ${isBookmarked ? "fill-current" : ""}`}
                    strokeWidth={2}
                  />
                </button>
              )}
            </div>
          </>
        )}

        {/* Ad CTA */}
        {post.isAd && post.marketplaceItem && (
          <div className="mt-3 p-3 bg-muted rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <div>
                <p className="font-semibold">{post.marketplaceItem.title}</p>
                <p className="text-sm text-muted-foreground">
                  R{post.marketplaceItem.price} • @{post.marketplaceItem.seller}
                </p>
              </div>
              <button
                onClick={() => onViewSales?.(post.id)}
                aria-label="View sales"
                className="transition-colors hover:text-primary"
              >
                <TrendingUp className="h-6 w-6" strokeWidth={2} />
              </button>
            </div>
            <Button onClick={handleShopNow} className="w-full" size="sm">
              Shop Now
            </Button>
          </div>
        )}

        {/* View comments */}
        {post.comments > 0 && (
          <button
            onClick={() => onComment?.(post.id)}
            className="text-sm text-muted-foreground mt-1"
          >
            View all {post.comments} comments
          </button>
        )}
      </div>
    </article>
  );
}
