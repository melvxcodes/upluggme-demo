import { supabase } from "../lib/supabaseClient";
import type { AssociatedSale, MarketplaceItem } from "../types";

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

type DbSale = {
  legacy_id: string | null;
  buyer_username: string;
  sale_amount: string | number;
  created_at: string;
  source_type: "post" | "comment";
  posts: { legacy_id: string };
  marketplace_items: DbMarketplaceItem;
  commission_owner: string | number;
  commission_referrer: string | number;
};

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

// viewer gets either owner-portion or referrer-portion depending on which list we fetch
function toSale(row: DbSale, commissionForViewer: number): AssociatedSale {
  return {
    id: row.legacy_id ?? "",
    item: toMarketplaceItem(row.marketplace_items),
    buyerUsername: "Customer", // privacy: do not show buyer by default
    saleAmount:
      typeof row.sale_amount === "string"
        ? Number(row.sale_amount)
        : row.sale_amount,
    commission: commissionForViewer,
    timestamp: new Date(row.created_at),
    postId: row.posts.legacy_id,
    sourceType: row.source_type,
  };
}

export async function fetchOwnerSalesForPost(
  postLegacyId: string,
  limit = 200,
) {
  const { data, error } = await supabase
    .from("associated_sales")
    .select(
      `
      legacy_id,
      buyer_username,
      sale_amount,
      created_at,
      source_type,
      commission_owner,
      commission_referrer,
      posts!inner(legacy_id),
      marketplace_items:marketplace_items!associated_sales_item_id_fkey (
        legacy_id, title, price, image, images, seller_username, category, likes, is_new, description, in_stock
      )
    `,
    )
    .eq("posts.legacy_id", postLegacyId)
    .order("created_at", { ascending: false })
    .limit(limit);

  if (error) throw new Error(error.message);

  const rows = data as unknown as DbSale[];
  return rows.map((r) =>
    toSale(
      r,
      typeof r.commission_owner === "string"
        ? Number(r.commission_owner)
        : r.commission_owner,
    ),
  );
}

export async function fetchMyReferrerSalesForPost(
  postLegacyId: string,
  limit = 200,
) {
  const { data, error } = await supabase
    .from("associated_sales")
    .select(
      `
      legacy_id,
      buyer_username,
      sale_amount,
      created_at,
      source_type,
      commission_owner,
      commission_referrer,
      posts!inner(legacy_id),
      marketplace_items:marketplace_items!associated_sales_item_id_fkey (
        legacy_id, title, price, image, images, seller_username, category, likes, is_new, description, in_stock
      )
    `,
    )
    .eq("posts.legacy_id", postLegacyId)
    .order("created_at", { ascending: false })
    .limit(limit);

  if (error) throw new Error(error.message);

  const rows = data as unknown as DbSale[];
  return rows.map((r) =>
    toSale(
      r,
      typeof r.commission_referrer === "string"
        ? Number(r.commission_referrer)
        : r.commission_referrer,
    ),
  );
}
