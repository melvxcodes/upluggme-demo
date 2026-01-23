export interface User {
  id: string;
  name: string;
  username: string;
  avatar: string;
  bio?: string;
  followers?: number;
  following?: number;
}

export interface MarketplaceItem {
  id: string;
  title: string;
  price: number;
  image: string;
  images?: string[];
  seller: string;
  category: string;
  likes: number;
  isNew?: boolean;
  description?: string;
  inStock?: boolean;
}

export interface Post {
  id: string;
  user: User;
  content: string;
  image?: string;
  likes: number;
  comments: number;
  shares: number;
  timestamp: Date;
  isLiked?: boolean;
  isAd?: boolean;
  marketplaceItem?: MarketplaceItem;
}

export interface Comment {
  id: string;
  user: User;
  content: string;
  timestamp: Date;
  likes: number;
  isAd?: boolean;
  marketplaceItem?: MarketplaceItem;
}

export interface CartItem {
  item: MarketplaceItem;
  quantity: number;
}

export interface AssociatedSale {
  id: string;
  item: MarketplaceItem;
  buyerUsername: string;
  saleAmount: number;
  commission: number;
  timestamp: Date;
  postId: string; // Which post generated this sale
  sourceType: 'post' | 'comment'; // Where the sale link was
}