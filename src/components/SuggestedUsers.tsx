import { Card } from './ui/card';
import { Avatar, AvatarImage, AvatarFallback } from './ui/avatar';
import { Button } from './ui/button';
import { mockUsers } from '../data/mockData';

export function SuggestedUsers() {
  return (
    <Card className="p-4">
      <h2 className="font-semibold mb-4">Suggested for you</h2>
      <div className="space-y-4">
        {mockUsers.slice(0, 3).map((user) => (
          <div key={user.id} className="flex items-center gap-3">
            <Avatar className="h-10 w-10">
              <AvatarImage src={user.avatar} alt={user.name} />
              <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="font-medium truncate">{user.name}</p>
              <p className="text-sm text-muted-foreground truncate">{user.username}</p>
            </div>
            <Button variant="outline" size="sm">
              Follow
            </Button>
          </div>
        ))}
      </div>
    </Card>
  );
}
