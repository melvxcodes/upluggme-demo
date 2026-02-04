import { supabase } from "../lib/supabaseClient";
import type { Comment, User, MarketplaceItem } from "../types";

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

type DbComment = {
  legacy_id: string | null;
  content: string;
  likes: number;
  created_at: string;
  is_ad: boolean;
  profiles: DbProfile; // joined
  marketplace_items: DbMarketplaceItem | null; // joined
  posts: { legacy_id: string }; // inner join for filtering
};

function toUser(p: DbProfile): User {
  return {
    id: p.legacy_id ?? "",
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

function toComment(row: DbComment): Comment {
  return {
    id: row.legacy_id ?? "",
    user: toUser(row.profiles),
    content: row.content,
    timestamp: new Date(row.created_at),
    likes: row.likes,
    isAd: row.is_ad,
    marketplaceItem: row.marketplace_items
      ? toMarketplaceItem(row.marketplace_items)
      : undefined,
  };
}

/**
 * Fetch comments for a post by the post’s legacy id (the string your UI uses: "5", "3", etc.)
 */
export async function fetchCommentsByPostLegacyId(
  postLegacyId: string,
  limit = 100,
): Promise<Comment[]> {
  const { data, error } = await supabase
    .from("comments")
    .select(
      `
      legacy_id,
      content,
      likes,
      created_at,
      is_ad,
      posts!inner(legacy_id),
      profiles:profiles!comments_user_id_fkey (
        legacy_id,
        name,
        username,
        avatar,
        bio,
        followers_count,
        following_count
      ),
      marketplace_items:marketplace_items!comments_marketplace_item_id_fkey (
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
    .eq("posts.legacy_id", postLegacyId)
    .order("created_at", { ascending: false })
    .limit(limit);

  if (error) throw new Error(error.message);
  return (data as unknown as DbComment[]).map(toComment);
}
