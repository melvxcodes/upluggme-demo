import React, { useState } from "react";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";
import { Button } from "./ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import {
  Grid3x3,
  Image as ImageIcon,
  Heart,
  Bookmark,
  Settings,
  MessageSquare,
} from "lucide-react";
import { currentUser, mockPosts } from "../data/mockData";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "./ui/sheet";
import { Separator } from "./ui/separator";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

interface MobileProfileViewProps {
  likedPosts?: Set<string>;
  bookmarkedPosts?: Set<string>;
}

export function MobileProfileView({
  likedPosts = new Set(),
  bookmarkedPosts = new Set(),
}: MobileProfileViewProps) {
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [activeSettingsTab, setActiveSettingsTab] = useState<
    "main" | "influencer"
  >("main");
  const userPosts = mockPosts.filter(
    (post) =>
      post.user.id === currentUser.id ||
      post.user.username === currentUser.username,
  );
  const userMediaPosts = userPosts.filter((post) => post.image);
  const likedPostsData = mockPosts.filter((post) => likedPosts.has(post.id));
  const bookmarkedPostsData = mockPosts.filter((post) =>
    bookmarkedPosts.has(post.id),
  );
  const earnings = 12547.85; // Mock earnings

  return (
    <div className="pb-16">
      {/* Profile Header */}
      <div className="border-b border-border">
        {/* Banner Image */}
        <div className="relative">
          <div className="h-32 bg-gradient-to-r from-purple-500 to-pink-500 overflow-hidden">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1614850716626-873413eb7c1b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
              alt="Profile banner"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Settings Button */}
          <button
            onClick={() => setSettingsOpen(true)}
            aria-label="Settings"
            className="absolute top-3 right-3 bg-white rounded-full p-2 shadow-md"
          >
            <Settings className="h-5 w-5" />
          </button>
        </div>

        <div className="px-4">
          {/* Profile Picture - Half on banner, half below */}
          <div className="relative -mt-12 mb-3">
            <Avatar className="h-24 w-24 border-4 border-white">
              <AvatarImage src={currentUser.avatar} alt={currentUser.name} />
              <AvatarFallback>{currentUser.name.charAt(0)}</AvatarFallback>
            </Avatar>
          </div>

          {/* Username */}
          <h2 className="font-semibold text-xl mb-1">
            {currentUser.username.replace("@", "")}
          </h2>

          {/* Bio */}
          <div className="mb-4">
            <p className="font-semibold text-sm">{currentUser.name}</p>
            <p className="text-sm">{currentUser.bio}</p>
          </div>

          {/* Stats - Below Banner */}
          <div className="flex justify-around mb-4 py-3 border-y border-border">
            <div className="text-center">
              <div className="font-semibold">{userPosts.length}</div>
              <div className="text-sm text-muted-foreground">posts</div>
            </div>
            <div className="text-center">
              <div className="font-semibold">
                {currentUser.followers?.toLocaleString()}
              </div>
              <div className="text-sm text-muted-foreground">followers</div>
            </div>
            <div className="text-center">
              <div className="font-semibold">
                {currentUser.following?.toLocaleString()}
              </div>
              <div className="text-sm text-muted-foreground">following</div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-2 pb-4">
            <Button variant="secondary" className="w-full">
              Edit profile
            </Button>
            <Button variant="secondary" className="w-full">
              Share profile
            </Button>
          </div>
        </div>
      </div>

      {/* Story Highlights would go here */}

      {/* Posts Grid */}
      <Tabs defaultValue="all" className="w-full">
        <TabsList className="w-full grid grid-cols-4 h-12 rounded-none border-b border-border bg-transparent p-0">
          <TabsTrigger
            value="all"
            className="rounded-none border-b-2 data-[state=active]:border-[#DC143C] data-[state=active]:bg-transparent data-[state=active]:text-[#DC143C]"
          >
            <Grid3x3 className="h-5 w-5" />
          </TabsTrigger>
          <TabsTrigger
            value="media"
            className="rounded-none border-b-2 data-[state=active]:border-[#DC143C] data-[state=active]:bg-transparent data-[state=active]:text-[#DC143C]"
          >
            <ImageIcon className="h-5 w-5" />
          </TabsTrigger>
          <TabsTrigger
            value="likes"
            className="rounded-none border-b-2 data-[state=active]:border-[#DC143C] data-[state=active]:bg-transparent data-[state=active]:text-[#DC143C]"
          >
            <Heart className="h-5 w-5" />
          </TabsTrigger>
          <TabsTrigger
            value="bookmarks"
            className="rounded-none border-b-2 data-[state=active]:border-[#DC143C] data-[state=active]:bg-transparent data-[state=active]:text-[#DC143C]"
          >
            <Bookmark className="h-5 w-5" />
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-0">
          {userPosts.length > 0 ? (
            <div className="grid grid-cols-3 gap-px bg-border">
              {userPosts.map((post) => (
                <div
                  key={post.id}
                  className="aspect-square bg-white relative group"
                >
                  {post.image ? (
                    <ImageWithFallback
                      src={post.image}
                      alt="Post"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center p-2 bg-muted">
                      <p className="text-xs text-center line-clamp-6">
                        {post.content}
                      </p>
                    </div>
                  )}
                  {/* Overlay with stats */}
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                    <div className="flex items-center gap-1 text-white">
                      <Heart className="h-5 w-5 fill-white" />
                      <span className="font-semibold">{post.likes}</span>
                    </div>
                    <div className="flex items-center gap-1 text-white">
                      <MessageSquare className="h-5 w-5 fill-white" />
                      <span className="font-semibold">{post.comments}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <div className="rounded-full border-2 border-black p-6 mb-4">
                <Grid3x3 className="h-12 w-12" />
              </div>
              <p className="font-semibold text-xl mb-1">Share Posts</p>
              <p className="text-sm text-muted-foreground">
                When you share posts, they will appear on your profile.
              </p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="media" className="mt-0">
          {userMediaPosts.length > 0 ? (
            <div className="grid grid-cols-3 gap-px bg-border">
              {userMediaPosts.map((post) => (
                <div key={post.id} className="aspect-square bg-white">
                  <ImageWithFallback
                    src={post.image!}
                    alt="Post"
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <div className="rounded-full border-2 border-black p-6 mb-4">
                <ImageIcon className="h-12 w-12" />
              </div>
              <p className="font-semibold text-xl mb-1">Share Media</p>
              <p className="text-sm text-muted-foreground">
                When you share photos and videos, they will appear here.
              </p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="likes" className="mt-0">
          {likedPostsData.length > 0 ? (
            <div className="grid grid-cols-3 gap-px bg-border">
              {likedPostsData.map((post) => (
                <div
                  key={post.id}
                  className="aspect-square bg-white relative group"
                >
                  {post.image ? (
                    <ImageWithFallback
                      src={post.image}
                      alt="Post"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center p-2 bg-muted">
                      <p className="text-xs text-center line-clamp-6">
                        {post.content}
                      </p>
                    </div>
                  )}
                  {/* Overlay with stats */}
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                    <div className="flex items-center gap-1 text-white">
                      <Heart className="h-5 w-5 fill-white" />
                      <span className="font-semibold">{post.likes}</span>
                    </div>
                    <div className="flex items-center gap-1 text-white">
                      <MessageSquare className="h-5 w-5 fill-white" />
                      <span className="font-semibold">{post.comments}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <div className="rounded-full border-2 border-black p-6 mb-4">
                <Heart className="h-12 w-12" />
              </div>
              <p className="font-semibold text-xl mb-1">Liked Posts</p>
              <p className="text-sm text-muted-foreground">
                Posts you've liked will appear here.
              </p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="bookmarks" className="mt-0">
          {bookmarkedPostsData.length > 0 ? (
            <div className="grid grid-cols-3 gap-px bg-border">
              {bookmarkedPostsData.map((post) => (
                <div
                  key={post.id}
                  className="aspect-square bg-white relative group"
                >
                  {post.image ? (
                    <ImageWithFallback
                      src={post.image}
                      alt="Post"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center p-2 bg-muted">
                      <p className="text-xs text-center line-clamp-6">
                        {post.content}
                      </p>
                    </div>
                  )}
                  {/* Overlay with stats */}
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                    <div className="flex items-center gap-1 text-white">
                      <Heart className="h-5 w-5 fill-white" />
                      <span className="font-semibold">{post.likes}</span>
                    </div>
                    <div className="flex items-center gap-1 text-white">
                      <MessageSquare className="h-5 w-5 fill-white" />
                      <span className="font-semibold">{post.comments}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <div className="rounded-full border-2 border-black p-6 mb-4">
                <Bookmark className="h-12 w-12" />
              </div>
              <p className="font-semibold text-xl mb-1">Saved Posts</p>
              <p className="text-sm text-muted-foreground">
                Save posts that you want to see again.
              </p>
            </div>
          )}
        </TabsContent>
      </Tabs>

      {/* Settings Sheet */}
      <Sheet open={settingsOpen} onOpenChange={setSettingsOpen}>
        <SheetContent side="bottom" className="h-[80vh] p-0">
          <SheetHeader className="p-4 border-b border-border">
            <SheetTitle>Settings</SheetTitle>
            <SheetDescription className="sr-only">
              Manage your account settings and earnings
            </SheetDescription>
          </SheetHeader>

          {activeSettingsTab === "main" ? (
            <div className="overflow-y-auto h-[calc(80vh-80px)] p-4">
              {/* Earnings Section */}
              <div className="mb-6 p-4 bg-muted rounded-lg">
                <p className="text-sm text-muted-foreground mb-1">
                  Total Earnings
                </p>
                <p className="text-2xl font-semibold mb-3">
                  R
                  {earnings.toLocaleString("en-ZA", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </p>
                <Button
                  className="w-full bg-[#DC143C] hover:bg-[#B01030] text-white"
                  onClick={() => {
                    // Handle withdraw logic here
                    console.log("Withdraw clicked");
                  }}
                >
                  Withdraw
                </Button>
              </div>

              {/* Settings Options */}
              <div className="space-y-1">
                <button
                  onClick={() => setActiveSettingsTab("influencer")}
                  className="w-full text-left px-4 py-3 hover:bg-muted rounded-lg transition-colors"
                >
                  <p className="font-semibold">Influencer Details</p>
                  <p className="text-sm text-muted-foreground">
                    Update payment and banking details
                  </p>
                </button>

                <Separator />

                <button className="w-full text-left px-4 py-3 hover:bg-muted rounded-lg transition-colors">
                  <p className="font-semibold">Account Settings</p>
                  <p className="text-sm text-muted-foreground">
                    Privacy, security, and preferences
                  </p>
                </button>

                <button className="w-full text-left px-4 py-3 hover:bg-muted rounded-lg transition-colors">
                  <p className="font-semibold">Notifications</p>
                  <p className="text-sm text-muted-foreground">
                    Manage notification preferences
                  </p>
                </button>

                <button className="w-full text-left px-4 py-3 hover:bg-muted rounded-lg transition-colors">
                  <p className="font-semibold">Help & Support</p>
                  <p className="text-sm text-muted-foreground">
                    Get help and contact support
                  </p>
                </button>

                <Separator />

                <button className="w-full text-left px-4 py-3 hover:bg-muted rounded-lg transition-colors text-primary">
                  <p className="font-semibold">Log Out</p>
                </button>
              </div>
            </div>
          ) : (
            <div className="overflow-y-auto h-[calc(80vh-80px)] p-4">
              <Button
                variant="ghost"
                onClick={() => setActiveSettingsTab("main")}
                className="mb-4"
              >
                ← Back
              </Button>

              <h3 className="font-semibold text-lg mb-4">Influencer Details</h3>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="bank-name">Bank Name</Label>
                  <Input id="bank-name" placeholder="Enter bank name" />
                </div>

                <div>
                  <Label htmlFor="account-holder">Account Holder Name</Label>
                  <Input
                    id="account-holder"
                    placeholder="Enter account holder name"
                  />
                </div>

                <div>
                  <Label htmlFor="account-number">Account Number</Label>
                  <Input
                    id="account-number"
                    type="text"
                    placeholder="Enter account number"
                  />
                </div>

                <div>
                  <Label htmlFor="branch-code">Branch Code</Label>
                  <Input id="branch-code" placeholder="Enter branch code" />
                </div>

                <div>
                  <Label htmlFor="account-type">Account Type</Label>
                  <Input
                    id="account-type"
                    placeholder="e.g., Cheque, Savings"
                  />
                </div>

                <Separator className="my-6" />

                <div>
                  <Label htmlFor="tax-number">Tax Number (Optional)</Label>
                  <Input id="tax-number" placeholder="Enter tax number" />
                </div>

                <Button className="w-full mt-6">Save Banking Details</Button>
              </div>
            </div>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
}
