import React from "react";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";
import { Input } from "./ui/input";
import { Search } from "lucide-react";
import { mockUsers, currentUser } from "../data/mockData";

interface Conversation {
  id: string;
  user: (typeof mockUsers)[0];
  lastMessage: string;
  timestamp: Date;
  unread: boolean;
}

const mockConversations: Conversation[] = [
  {
    id: "1",
    user: mockUsers[0],
    lastMessage: "Thanks for the tips! 🙌",
    timestamp: new Date(Date.now() - 5 * 60 * 1000),
    unread: true,
  },
  {
    id: "2",
    user: mockUsers[1],
    lastMessage: "That design looks amazing!",
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
    unread: false,
  },
  {
    id: "3",
    user: mockUsers[2],
    lastMessage: "Coffee tomorrow?",
    timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000),
    unread: true,
  },
  {
    id: "4",
    user: mockUsers[3],
    lastMessage: "See you there!",
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
    unread: false,
  },
];

export function MessagesPage() {
  const getTimeAgo = (date: Date) => {
    const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);

    if (seconds < 60) return "now";
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}h`;
    return `${Math.floor(seconds / 86400)}d`;
  };

  return (
    <div className="pb-16">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <h2 className="font-semibold text-xl mb-3">Messages</h2>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search messages"
            className="pl-10 bg-muted border-0"
          />
        </div>
      </div>

      {/* Conversations List */}
      <div>
        {mockConversations.map((conversation) => (
          <button
            key={conversation.id}
            className="w-full flex items-center gap-3 p-4 hover:bg-muted transition-colors border-b border-border text-left"
          >
            <div className="relative">
              <Avatar className="h-14 w-14">
                <AvatarImage
                  src={conversation.user.avatar}
                  alt={conversation.user.name}
                />
                <AvatarFallback>
                  {conversation.user.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
              {conversation.unread && (
                <div className="absolute bottom-0 right-0 h-3 w-3 bg-primary rounded-full border-2 border-white"></div>
              )}
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-1">
                <span
                  className={`text-sm truncate ${
                    conversation.unread ? "font-semibold" : "font-medium"
                  }`}
                >
                  {conversation.user.username.replace("@", "")}
                </span>
                <span className="text-xs text-muted-foreground ml-2">
                  {getTimeAgo(conversation.timestamp)}
                </span>
              </div>
              <p
                className={`text-sm truncate ${
                  conversation.unread
                    ? "text-foreground font-medium"
                    : "text-muted-foreground"
                }`}
              >
                {conversation.lastMessage}
              </p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
