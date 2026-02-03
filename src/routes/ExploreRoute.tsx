import { ExplorePage } from "../components/ExplorePage";

type Props = {
  onViewItem: (itemId: string) => void;
};

export function ExploreRoute({ onViewItem }: Props) {
  return (
    <div className="pt-14">
      <div className="p-4 border-b border-border">
        <input
          type="search"
          placeholder="Search"
          className="w-full bg-muted rounded-lg px-4 py-2 text-sm outline-none"
        />
      </div>
      <ExplorePage onViewItem={onViewItem} />
    </div>
  );
}
