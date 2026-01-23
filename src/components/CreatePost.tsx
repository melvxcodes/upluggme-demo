import React, { useState } from "react";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Textarea } from "./ui/textarea";
import { Image, Smile, Calendar } from "lucide-react";
import { currentUser } from "../data/mockData";

interface CreatePostProps {
  onPost?: (content: string) => void;
}

export function CreatePost({ onPost }: CreatePostProps) {
  const [content, setContent] = useState("");

  const handlePost = () => {
    if (content.trim()) {
      onPost?.(content);
      setContent("");
    }
  };

  return (
    <Card className="p-4 mb-4">
      <div className="flex gap-3">
        <Avatar>
          <AvatarImage src={currentUser.avatar} alt={currentUser.name} />
          <AvatarFallback>{currentUser.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <Textarea
            placeholder="What's on your mind?"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="min-h-[100px] resize-none border-0 focus-visible:ring-0 p-0"
          />
          <div className="flex items-center justify-between mt-3 pt-3 border-t">
            <div className="flex gap-2">
              <Button variant="ghost" size="icon" className="text-blue-500">
                <Image className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-yellow-500">
                <Smile className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-green-500">
                <Calendar className="h-5 w-5" />
              </Button>
            </div>
            <Button onClick={handlePost} disabled={!content.trim()}>
              Post
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
}
