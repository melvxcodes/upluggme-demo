import { useEffect, useState } from "react";
import { useCart } from "../context/CartContext";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Button } from "./ui/button";
import { Trash2, Minus, Plus, ShoppingBag } from "lucide-react";
import { Separator } from "./ui/separator";
import { toast } from "sonner";
import { FNBProTipPopup } from "./FNBProTipPopup";

export function CartPage() {
  const { cart, removeFromCart, updateQuantity, getCartTotal, clearCart } =
    useCart();
  const [showTipPopup, setShowTipPopup] = useState(false);

  // Show FNB popup when entering cart (if cart has items)
  useEffect(() => {
    const timer = setTimeout(() => {
      if (cart.length > 0) {
        setShowTipPopup(true);
      }
    }, 1500); // Show after 1.5 seconds if cart has items

    return () => clearTimeout(timer);
  }, [cart.length]);

  const handleCheckout = () => {
    toast.success("Checkout feature coming soon!");
  };

  if (cart.length === 0) {
    return (
      <div className="pb-16 pt-14">
        <div className="flex flex-col items-center justify-center min-h-[60vh] px-4">
          <ShoppingBag className="h-24 w-24 text-muted-foreground mb-4" />
          <h2 className="text-2xl font-semibold mb-2">Your cart is empty</h2>
          <p className="text-muted-foreground text-center">
            Start shopping to add items to your cart
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="pb-32">
      {/* FNB Pro Tip Popup */}
      <FNBProTipPopup
        isOpen={showTipPopup}
        onClose={() => setShowTipPopup(false)}
        tipNumber={Math.floor(Math.random() * 5) + 6} // Tips 6-10 for variety
      />

      <div className="divide-y divide-border">
        {cart.map((cartItem) => (
          <div key={cartItem.item.id} className="p-4 flex gap-4">
            <ImageWithFallback
              src={cartItem.item.image}
              alt={cartItem.item.title}
              className="w-24 h-24 object-cover rounded-lg"
            />

            <div className="flex-1 min-w-0">
              <h3 className="font-semibold mb-1 line-clamp-2">
                {cartItem.item.title}
              </h3>
              <p className="text-sm text-muted-foreground mb-2">
                @{cartItem.item.seller}
              </p>
              <p className="font-semibold">R{cartItem.item.price}</p>

              <div className="flex items-center gap-2 mt-2">
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() =>
                    updateQuantity(cartItem.item.id, cartItem.quantity - 1)
                  }
                >
                  <Minus className="h-3 w-3" />
                </Button>
                <span className="text-sm font-medium w-8 text-center">
                  {cartItem.quantity}
                </span>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() =>
                    updateQuantity(cartItem.item.id, cartItem.quantity + 1)
                  }
                >
                  <Plus className="h-3 w-3" />
                </Button>
              </div>
            </div>

            <button
              onClick={() => removeFromCart(cartItem.item.id)}
              className="text-muted-foreground hover:text-destructive"
              aria-label="Remove from cart"
            >
              <Trash2 className="h-5 w-5" />
            </button>
          </div>
        ))}
      </div>

      <div className="fixed bottom-12 left-0 right-0 bg-white border-t border-border z-10">
        <div className="max-w-[500px] mx-auto p-4 space-y-3">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Subtotal</span>
              <span>R{getCartTotal().toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Shipping</span>
              <span>Free</span>
            </div>
            <Separator />
            <div className="flex justify-between font-semibold text-lg">
              <span>Total</span>
              <span>R{getCartTotal().toFixed(2)}</span>
            </div>
          </div>

          <Button onClick={handleCheckout} className="w-full" size="lg">
            Proceed to Checkout
          </Button>
        </div>
      </div>
    </div>
  );
}
