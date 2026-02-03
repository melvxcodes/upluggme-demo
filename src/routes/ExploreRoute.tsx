import { ExplorePage } from "../components/ExplorePage";
import { useUIActions } from "../context/UIActionsContext";

export function ExploreRoute() {
  const ui = useUIActions();

  return (
    <div className="pt-14">
      <div className="p-4 border-b border-border">
        <input
          type="search"
          placeholder="Search"
          className="w-full bg-muted rounded-lg px-4 py-2 text-sm outline-none"
        />
      </div>
      <ExplorePage onViewItem={(id) => ui.openItem(id)} />
    </div>
  );
}
