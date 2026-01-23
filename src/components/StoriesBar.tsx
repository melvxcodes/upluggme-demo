import { StoryCircle } from './StoryCircle';
import { currentUser, mockUsers } from '../data/mockData';
import { ScrollArea } from './ui/scroll-area';

export function StoriesBar() {
  return (
    <div className="border-b border-border bg-white">
      <ScrollArea className="w-full">
        <div className="flex gap-4 px-4 py-3 overflow-x-auto">
          <StoryCircle user={currentUser} isOwn hasStory={false} />
          {mockUsers.map((user) => (
            <StoryCircle key={user.id} user={user} hasStory={true} />
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
