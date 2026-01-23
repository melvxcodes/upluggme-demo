import React, { useState } from "react";
import { MarketplaceItem } from "../types";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { X, Heart, Share2, ShoppingCart, Minus, Plus } from "lucide-react";
import { useCart } from "../context/CartContext";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";

interface MarketplaceItemViewProps {
  item: MarketplaceItem;
  onClose: () => void;
}

export function MarketplaceItemView({
  item,
  onClose,
}: MarketplaceItemViewProps) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isLiked, setIsLiked] = useState(false);
  const { addToCart } = useCart();

  const images = item.images || [item.image];

  const handleAddToCart = () => {
    addToCart(item, quantity);
  };

  const incrementQuantity = () => setQuantity((q) => q + 1);
  const decrementQuantity = () => setQuantity((q) => Math.max(1, q - 1));

  return (
    <div className="fixed inset-0 bg-white z-[100] overflow-y-auto">
      {/* Header */}
      <div className="sticky top-0 bg-white border-b border-border z-10">
        <div className="flex items-center justify-between h-14 px-4 max-w-[500px] mx-auto">
          <button onClick={onClose} aria-label="Close">
            <X className="h-6 w-6" />
          </button>
          <h2 className="font-semibold">Product Details</h2>
          <button onClick={() => setIsLiked(!isLiked)} aria-label="Like">
            <Heart
              className={`h-6 w-6 ${
                isLiked ? "fill-primary text-primary" : ""
              }`}
            />
          </button>
        </div>
      </div>

      <div className="max-w-[500px] mx-auto pb-24">
        {/* Image Gallery */}
        <div className="relative">
          <ImageWithFallback
            src={images[selectedImageIndex]}
            alt={item.title}
            className="w-full aspect-square object-cover"
          />
          {item.isNew && (
            <Badge className="absolute top-4 left-4 bg-primary text-white">
              New Arrival
            </Badge>
          )}

          {/* Image Thumbnails */}
          {images.length > 1 && (
            <div className="flex gap-2 p-4 overflow-x-auto">
              {images.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImageIndex(index)}
                  className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 ${
                    selectedImageIndex === index
                      ? "border-primary"
                      : "border-border"
                  }`}
                >
                  <ImageWithFallback
                    src={img}
                    alt={`${item.title} ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="p-4 space-y-4">
          {/* Title and Price */}
          <div>
            <h1 className="text-2xl font-semibold mb-2">{item.title}</h1>
            <div className="flex items-center justify-between">
              <span className="text-3xl font-bold">R{item.price}</span>
              <Badge variant={item.inStock ? "default" : "secondary"}>
                {item.inStock ? "In Stock" : "Out of Stock"}
              </Badge>
            </div>
          </div>

          {/* Seller Info */}
          <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
            <Avatar className="h-10 w-10">
              <AvatarImage
                src={`https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop`}
              />
              <AvatarFallback>
                {item.seller.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="font-semibold text-sm">Sold by</p>
              <p className="text-sm text-muted-foreground">@{item.seller}</p>
            </div>
          </div>

          {/* Description */}
          {item.description && (
            <div>
              <h3 className="font-semibold mb-2">Description</h3>
              <p className="text-muted-foreground">{item.description}</p>
            </div>
          )}

          {/* Quantity Selector */}
          <div>
            <h3 className="font-semibold mb-2">Quantity</h3>
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                size="icon"
                onClick={decrementQuantity}
                disabled={quantity <= 1}
              >
                <Minus className="h-4 w-4" />
              </Button>
              <span className="text-xl font-semibold w-12 text-center">
                {quantity}
              </span>
              <Button variant="outline" size="icon" onClick={incrementQuantity}>
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Stats */}
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Heart className="h-4 w-4" />
              {item.likes} likes
            </div>
            <div className="flex items-center gap-1">
              <Share2 className="h-4 w-4" />
              Share
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Action Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-border p-4 z-10">
        <div className="max-w-[500px] mx-auto flex gap-2">
          <div className="flex-1">
            <p className="text-sm text-muted-foreground">Total</p>
            <p className="text-2xl font-bold">
              R{(item.price * quantity).toFixed(2)}
            </p>
          </div>
          <Button
            onClick={handleAddToCart}
            disabled={!item.inStock}
            className="flex-1"
            size="lg"
          >
            <ShoppingCart className="h-5 w-5 mr-2" />
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  );
}
