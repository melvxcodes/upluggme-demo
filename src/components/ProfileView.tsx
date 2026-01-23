import { Card } from './ui/card';
import { Avatar, AvatarImage, AvatarFallback } from './ui/avatar';
import { Button } from './ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Calendar, MapPin } from 'lucide-react';
import { currentUser, mockPosts } from '../data/mockData';
import { PostCard } from './PostCard';

export function ProfileView() {
  const userPosts = mockPosts.filter(post => post.user.id === currentUser.id || post.user.username === currentUser.username);

  return (
    <div>
      <Card className="mb-4">
        <div className="h-32 bg-gradient-to-r from-blue-500 to-purple-500"></div>
        <div className="px-4 pb-4">
          <div className="flex items-end justify-between -mt-16 mb-4">
            <Avatar className="h-32 w-32 border-4 border-background">
              <AvatarImage src={currentUser.avatar} alt={currentUser.name} />
              <AvatarFallback>{currentUser.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <Button className="mt-20">Edit Profile</Button>
          </div>
          <div>
            <h1 className="text-2xl">{currentUser.name}</h1>
            <p className="text-muted-foreground">{currentUser.username}</p>
            <p className="mt-3">{currentUser.bio}</p>
            <div className="flex gap-4 mt-3 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                San Francisco, CA
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                Joined March 2024
              </div>
            </div>
            <div className="flex gap-4 mt-3">
              <div>
                <span className="font-medium">{currentUser.following}</span>{' '}
                <span className="text-muted-foreground">Following</span>
              </div>
              <div>
                <span className="font-medium">{currentUser.followers}</span>{' '}
                <span className="text-muted-foreground">Followers</span>
              </div>
            </div>
          </div>
        </div>
      </Card>

      <Tabs defaultValue="posts">
        <TabsList className="w-full">
          <TabsTrigger value="posts" className="flex-1">Posts</TabsTrigger>
          <TabsTrigger value="media" className="flex-1">Media</TabsTrigger>
          <TabsTrigger value="likes" className="flex-1">Likes</TabsTrigger>
        </TabsList>
        <TabsContent value="posts" className="mt-4">
          {userPosts.length > 0 ? (
            userPosts.map(post => (
              <PostCard key={post.id} post={post} />
            ))
          ) : (
            <Card className="p-8 text-center text-muted-foreground">
              No posts yet
            </Card>
          )}
        </TabsContent>
        <TabsContent value="media" className="mt-4">
          <Card className="p-8 text-center text-muted-foreground">
            Media posts will appear here
          </Card>
        </TabsContent>
        <TabsContent value="likes" className="mt-4">
          <Card className="p-8 text-center text-muted-foreground">
            Liked posts will appear here
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
