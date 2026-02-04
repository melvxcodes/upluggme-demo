import { supabase } from "../lib/supabaseClient";
import type { Post, User, MarketplaceItem } from "../types";

type DbProfile = {
  legacy_id: string | null;
  name: string;
  username: string;
  avatar: string;
  bio: string | null;
  followers_count: number | null;
  following_count: number | null;
};

type DbMarketplaceItem = {
  legacy_id: string | null;
  title: string;
  price: string | number;
  image: string;
  images: string[] | null;
  seller_username: string;
  category: string;
  likes: number;
  is_new: boolean;
  description: string | null;
  in_stock: boolean;
};

type DbPost = {
  legacy_id: string | null;
  content: string;
  image: string | null;
  likes: number;
  comments: number;
  shares: number;
  created_at: string;
  is_ad: boolean;
  profiles: DbProfile; // joined
  marketplace_items: DbMarketplaceItem | null; // joined
};

function toUser(p: DbProfile): User {
  return {
    id: p.legacy_id ?? "", // we keep legacy id for now (matches demo style)
    name: p.name,
    username: p.username,
    avatar: p.avatar,
    bio: p.bio ?? undefined,
    followers: p.followers_count ?? undefined,
    following: p.following_count ?? undefined,
  };
}

function toMarketplaceItem(i: DbMarketplaceItem): MarketplaceItem {
  return {
    id: i.legacy_id ?? "",
    title: i.title,
    price: typeof i.price === "string" ? Number(i.price) : i.price,
    image: i.image,
    images: i.images ?? undefined,
    seller: i.seller_username,
    category: i.category,
    likes: i.likes,
    isNew: i.is_new,
    description: i.description ?? undefined,
    inStock: i.in_stock,
  };
}

function toPost(row: DbPost): Post {
  return {
    id: row.legacy_id ?? "",
    user: toUser(row.profiles),
    content: row.content,
    image: row.image ?? undefined,
    likes: row.likes,
    comments: row.comments,
    shares: row.shares,
    timestamp: new Date(row.created_at), // ✅ converts string -> Date
    isLiked: false, // keep demo behavior for now
    isAd: row.is_ad,
    marketplaceItem: row.marketplace_items
      ? toMarketplaceItem(row.marketplace_items)
      : undefined,
  };
}

/**
 * Fetches the main feed.
 * NOTE: We order by created_at desc for "freshness".
 * If you want the exact demo order (ads inserted at specific positions),
 * we can do that later with a “feed composition” layer.
 */
export async function fetchFeed(limit = 30): Promise<Post[]> {
  const { data, error } = await supabase
    .from("posts")
    .select(
      `
      legacy_id,
      content,
      image,
      likes,
      comments,
      shares,
      created_at,
      is_ad,
      profiles:profiles!posts_user_id_fkey (
        legacy_id,
        name,
        username,
        avatar,
        bio,
        followers_count,
        following_count
      ),
      marketplace_items:marketplace_items!posts_marketplace_item_id_fkey (
        legacy_id,
        title,
        price,
        image,
        images,
        seller_username,
        category,
        likes,
        is_new,
        description,
        in_stock
      )
    `,
    )
    .order("created_at", { ascending: false })
    .limit(limit);

  if (error) throw new Error(error.message);

  // Supabase typing returns unknown-ish; we cast safely through our DbPost type
  return (data as unknown as DbPost[]).map(toPost);
}
