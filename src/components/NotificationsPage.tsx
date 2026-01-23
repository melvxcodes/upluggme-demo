import React from "react";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";
import { Button } from "./ui/button";
import { mockUsers } from "../data/mockData";

interface Notification {
  id: string;
  type: "like" | "comment" | "follow" | "mention";
  user: (typeof mockUsers)[0];
  content?: string;
  timestamp: Date;
  postImage?: string;
}

const mockNotifications: Notification[] = [
  {
    id: "1",
    type: "like",
    user: mockUsers[0],
    content: "liked your post",
    timestamp: new Date(Date.now() - 5 * 60 * 1000),
    postImage:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=200&h=200&fit=crop",
  },
  {
    id: "2",
    type: "follow",
    user: mockUsers[1],
    content: "started following you",
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
  },
  {
    id: "3",
    type: "comment",
    user: mockUsers[2],
    content: 'commented: "Amazing shot! 🔥"',
    timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000),
    postImage:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=200&h=200&fit=crop",
  },
  {
    id: "4",
    type: "like",
    user: mockUsers[3],
    content: "liked your post",
    timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000),
    postImage:
      "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=200&h=200&fit=crop",
  },
];

export function NotificationsPage() {
  const getTimeAgo = (date: Date) => {
    const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);

    if (seconds < 60) return "just now";
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}h`;
    return `${Math.floor(seconds / 86400)}d`;
  };

  return (
    <div className="pb-16">
      <div className="p-4">
        <h2 className="font-semibold text-xl mb-4">Notifications</h2>

        <div className="space-y-4">
          {mockNotifications.map((notification) => (
            <div key={notification.id} className="flex items-center gap-3">
              <Avatar className="h-11 w-11">
                <AvatarImage
                  src={notification.user.avatar}
                  alt={notification.user.name}
                />
                <AvatarFallback>
                  {notification.user.name.charAt(0)}
                </AvatarFallback>
              </Avatar>

              <div className="flex-1 min-w-0">
                <p className="text-sm">
                  <span className="font-semibold">
                    {notification.user.username.replace("@", "")}
                  </span>{" "}
                  {notification.content}{" "}
                  <span className="text-muted-foreground">
                    {getTimeAgo(notification.timestamp)}
                  </span>
                </p>
              </div>

              {notification.postImage ? (
                <img
                  src={notification.postImage}
                  alt="Post thumbnail"
                  className="h-11 w-11 object-cover"
                />
              ) : (
                notification.type === "follow" && (
                  <Button
                    variant="default"
                    size="sm"
                    className="bg-primary text-primary-foreground"
                  >
                    Follow
                  </Button>
                )
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
