import { CartPage } from "../components/CartPage";

export function CartRoute() {
  return (
    <div className="pt-14">
      <div className="p-4 border-b border-border">
        <h2 className="font-semibold text-xl">Shopping Cart</h2>
      </div>
      <CartPage />
    </div>
  );
}
