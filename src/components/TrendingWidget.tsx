import { Card } from './ui/card';
import { TrendingUp } from 'lucide-react';

const trendingTopics = [
  { topic: '#WebDevelopment', posts: '23.4K' },
  { topic: '#AI', posts: '45.2K' },
  { topic: '#Design', posts: '18.9K' },
  { topic: '#Technology', posts: '67.1K' },
  { topic: '#Programming', posts: '34.5K' },
];

export function TrendingWidget() {
  return (
    <Card className="p-4">
      <div className="flex items-center gap-2 mb-4">
        <TrendingUp className="h-5 w-5" />
        <h2 className="font-semibold">Trending Now</h2>
      </div>
      <div className="space-y-4">
        {trendingTopics.map((item, index) => (
          <div key={index} className="cursor-pointer hover:bg-accent p-2 rounded-lg -mx-2">
            <p className="font-medium">{item.topic}</p>
            <p className="text-sm text-muted-foreground">{item.posts} posts</p>
          </div>
        ))}
      </div>
    </Card>
  );
}
