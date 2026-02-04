import React, { useEffect, useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "./ui/sheet";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Heart, Send, ShoppingBag } from "lucide-react";
import { Comment } from "../types";
import { currentUser, mockComments } from "../data/mockData";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { useCart } from "../context/CartContext";
import { fetchCommentsByPostLegacyId } from "../services/comments";

interface CommentsSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  postId: string;
  onViewItem?: (itemId: string) => void;
}

export function CommentsSheet({
  open,
  onOpenChange,
  postId,
  onViewItem,
}: CommentsSheetProps) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");
  const [likedComments, setLikedComments] = useState<Set<string>>(new Set());
  const [loadError, setLoadError] = useState<string | null>(null);
  const { addToCart } = useCart();

  // Load comments for this post when the sheet opens or postId changes
  useEffect(() => {
    if (!open) return;

    let cancelled = false;

    (async () => {
      try {
        setLoadError(null);
        const data = await fetchCommentsByPostLegacyId(postId);
        if (!cancelled) setComments(data);
      } catch (e) {
        const msg = e instanceof Error ? e.message : "Failed to load comments";
        console.error(e);
        if (!cancelled) {
          setLoadError(msg);
          // Fallback keeps UI alive while you debug env/schema
          setComments(mockComments);
        }
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [open, postId]);

  const handleSubmitComment = () => {
    if (!newComment.trim()) return;

    // Local-only for now (until we implement auth + DB writes)
    const comment: Comment = {
      id: `c${Date.now()}`,
      user: currentUser,
      content: newComment,
      timestamp: new Date(),
      likes: 0,
    };

    setComments([comment, ...comments]); // prepend to feel immediate
    setNewComment("");
  };

  const toggleLikeComment = (commentId: string) => {
    setLikedComments((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(commentId)) {
        newSet.delete(commentId);
      } else {
        newSet.add(commentId);
      }
      return newSet;
    });
  };

  const getTimeAgo = (date: Date) => {
    const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);

    if (seconds < 60) return "just now";
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}h`;
    return `${Math.floor(seconds / 86400)}d`;
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="bottom" className="h-[80vh] p-0">
        <SheetHeader className="p-4 border-b border-border">
          <SheetTitle>Comments</SheetTitle>
          <SheetDescription className="sr-only">
            View and add comments on this post
          </SheetDescription>
        </SheetHeader>

        {/* Optional dev hint if Supabase fails (does not change functionality) */}
        {loadError && (
          <div className="px-4 py-2 text-xs text-muted-foreground border-b border-border">
            Loaded mock comments (Supabase error: {loadError})
          </div>
        )}

        {/* Comments List */}
        <div className="overflow-y-auto h-[calc(100vh-200px)] pb-4">
          {comments.map((comment) => (
            <div key={comment.id} className="p-4 border-b border-border">
              {comment.isAd && comment.marketplaceItem ? (
                // Ad comment with marketplace item
                <div className="bg-muted/50 rounded-lg p-3 space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-semibold text-sm">
                          UPLUGGME Shop
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {getTimeAgo(comment.timestamp)}
                        </span>
                      </div>
                      <p className="text-sm mb-2">{comment.content}</p>
                    </div>
                  </div>

                  {/* Marketplace Item Preview */}
                  <div
                    className="flex gap-3 bg-white rounded-lg p-3 border border-border cursor-pointer hover:bg-muted/50 transition-colors"
                    onClick={() => onViewItem?.(comment.marketplaceItem!.id)}
                  >
                    <ImageWithFallback
                      src={comment.marketplaceItem.image}
                      alt={comment.marketplaceItem.title}
                      className="w-20 h-20 object-cover rounded-lg"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-sm mb-1 line-clamp-2">
                        {comment.marketplaceItem.title}
                      </h4>
                      <p className="text-sm text-muted-foreground mb-2">
                        @{comment.marketplaceItem.seller}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="font-semibold">
                          R{comment.marketplaceItem.price}
                        </span>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={(e: React.MouseEvent) => {
                            e.stopPropagation();
                            addToCart(comment.marketplaceItem!);
                          }}
                        >
                          <ShoppingBag className="h-3 w-3 mr-1" />
                          Add
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* Ad Comment Actions */}
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => toggleLikeComment(comment.id)}
                      className="flex items-center gap-1 text-sm"
                    >
                      <Heart
                        className={`h-4 w-4 ${
                          likedComments.has(comment.id)
                            ? "fill-primary text-primary"
                            : ""
                        }`}
                      />
                      <span>
                        {comment.likes +
                          (likedComments.has(comment.id) ? 1 : 0)}
                      </span>
                    </button>
                  </div>
                </div>
              ) : (
                // Regular comment
                <div className="flex items-start gap-3">
                  <Avatar className="h-8 w-8">
                    <AvatarImage
                      src={comment.user.avatar}
                      alt={comment.user.name}
                    />
                    <AvatarFallback>
                      {comment.user.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-semibold text-sm">
                        {comment.user.username.replace("@", "")}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {getTimeAgo(comment.timestamp)}
                      </span>
                    </div>
                    <p className="text-sm mb-2">{comment.content}</p>
                    <button
                      onClick={() => toggleLikeComment(comment.id)}
                      className="flex items-center gap-1 text-sm text-muted-foreground"
                    >
                      <Heart
                        className={`h-4 w-4 ${
                          likedComments.has(comment.id)
                            ? "fill-primary text-primary"
                            : ""
                        }`}
                      />
                      <span>
                        {comment.likes +
                          (likedComments.has(comment.id) ? 1 : 0)}
                      </span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Comment Input */}
        <div className="sticky bottom-0 left-0 right-0 p-4 bg-white border-t border-border">
          <div className="flex items-center gap-2">
            <Avatar className="h-8 w-8">
              <AvatarImage src={currentUser.avatar} alt={currentUser.name} />
              <AvatarFallback>{currentUser.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <Input
              placeholder="Add a comment..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSubmitComment();
                }
              }}
              className="flex-1"
            />
            <Button
              size="icon"
              onClick={handleSubmitComment}
              disabled={!newComment.trim()}
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
