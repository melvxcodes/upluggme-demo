import { Avatar, AvatarImage, AvatarFallback } from './ui/avatar';
import { Plus } from 'lucide-react';

interface StoryCircleProps {
  user: {
    name: string;
    avatar: string;
    username: string;
  };
  hasStory?: boolean;
  isOwn?: boolean;
}

export function StoryCircle({ user, hasStory = false, isOwn = false }: StoryCircleProps) {
  return (
    <div className="flex flex-col items-center gap-1 min-w-[70px]">
      <div className="relative">
        <div className={`rounded-full p-[2px] ${hasStory ? 'bg-gradient-to-tr from-yellow-400 via-primary to-purple-600' : 'bg-gray-200'}`}>
          <div className="bg-white rounded-full p-[2px]">
            <Avatar className="h-14 w-14">
              <AvatarImage src={user.avatar} alt={user.name} />
              <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
            </Avatar>
          </div>
        </div>
        {isOwn && (
          <div className="absolute bottom-0 right-0 bg-primary rounded-full p-0.5 border-2 border-white">
            <Plus className="h-3 w-3 text-white" />
          </div>
        )}
      </div>
      <span className="text-xs text-center truncate max-w-[70px]">
        {isOwn ? 'Your story' : user.username.replace('@', '')}
      </span>
    </div>
  );
}
