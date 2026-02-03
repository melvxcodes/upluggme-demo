import { MarketplacePage } from "../components/MarketplacePage";
import { useUIActions } from "../context/UIActionsContext";

export function MarketplaceRoute() {
  const ui = useUIActions();

  return (
    <div className="pt-14">
      <MarketplacePage
        onViewItem={(id) => ui.openItem(id)}
        onViewCart={ui.goToCart}
      />
    </div>
  );
}
