import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "./ui/dialog";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { Image, X } from "lucide-react";
import { currentUser } from "../data/mockData";

interface MobileCreatePostProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onPost?: (content: string, image?: string) => void;
}

export function MobileCreatePost({
  open,
  onOpenChange,
  onPost,
}: MobileCreatePostProps) {
  const [content, setContent] = useState("");
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const handlePost = () => {
    if (content.trim() || previewImage) {
      onPost?.(content, previewImage || undefined);
      setContent("");
      setPreviewImage(null);
      onOpenChange(false);
    }
  };

  const handleImageUpload = () => {
    // Mock image upload - in real app would open file picker
    const mockImages = [
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=800&h=800&fit=crop",
    ];
    setPreviewImage(mockImages[Math.floor(Math.random() * mockImages.length)]);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[95vw] sm:max-w-md p-0 gap-0">
        <DialogHeader className="p-3 border-b">
          <div className="flex items-center justify-between">
            <button onClick={() => onOpenChange(false)}>
              <X className="h-6 w-6" />
            </button>
            <DialogTitle className="text-base">Create new post</DialogTitle>
            <Button
              onClick={handlePost}
              disabled={!content.trim() && !previewImage}
              variant="ghost"
              className="text-primary font-semibold text-sm h-auto p-0"
            >
              Share
            </Button>
          </div>
          <DialogDescription className="sr-only">
            Create and share a new post with your followers
          </DialogDescription>
        </DialogHeader>

        <div className="p-4">
          <div className="flex gap-3 mb-4">
            <Avatar className="h-10 w-10">
              <AvatarImage src={currentUser.avatar} alt={currentUser.name} />
              <AvatarFallback>{currentUser.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <p className="font-semibold text-sm mb-1">
                {currentUser.username.replace("@", "")}
              </p>
              <Textarea
                placeholder="Write a caption..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="min-h-[120px] resize-none border-0 focus-visible:ring-0 p-0 text-sm"
              />
            </div>
          </div>

          {previewImage ? (
            <div className="relative rounded-lg overflow-hidden mb-4">
              <img
                src={previewImage}
                alt="Preview"
                className="w-full aspect-square object-cover"
              />
              <button
                onClick={() => setPreviewImage(null)}
                className="absolute top-2 right-2 bg-black/60 text-white rounded-full p-1.5"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          ) : (
            <button
              onClick={handleImageUpload}
              className="w-full aspect-square border-2 border-dashed border-border rounded-lg flex flex-col items-center justify-center gap-2 text-muted-foreground hover:border-primary hover:text-primary transition-colors"
            >
              <Image className="h-12 w-12" />
              <span className="text-sm">Add photo</span>
            </button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
