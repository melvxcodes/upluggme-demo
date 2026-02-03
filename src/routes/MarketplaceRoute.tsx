import { MarketplacePage } from "../components/MarketplacePage";

type Props = {
  onViewItem: (itemId: string) => void;
  onViewCart: () => void;
};

export function MarketplaceRoute({ onViewItem, onViewCart }: Props) {
  return (
    <div className="pt-14">
      <MarketplacePage onViewItem={onViewItem} onViewCart={onViewCart} />
    </div>
  );
}
