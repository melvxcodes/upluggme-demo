import { supabase } from "../lib/supabaseClient";

export async function getPostOwnerEarningsForPost(postLegacyId: string) {
  const { data, error } = await supabase.rpc(
    "get_post_owner_earnings_for_post",
    {
      post_legacy: postLegacyId,
    },
  );

  if (error) throw new Error(error.message);
  return (
    data?.[0] ?? {
      post_id: postLegacyId,
      owner_commission_total: 0,
      sales_total: 0,
      sales_count: 0,
    }
  );
}

export async function getMyOwnerEarningsForPost(postLegacyId: string) {
  const { data, error } = await supabase.rpc("get_my_owner_earnings_for_post", {
    post_legacy: postLegacyId,
  });

  if (error) throw new Error(error.message);
  return (
    data?.[0] ?? {
      post_id: postLegacyId,
      owner_commission_total: 0,
      sales_total: 0,
      sales_count: 0,
    }
  );
}

export async function getMyOwnerEarningsAllPosts() {
  const { data, error } = await supabase.rpc("get_my_owner_earnings_all_posts");

  if (error) throw new Error(error.message);
  return (
    data?.[0] ?? { owner_commission_total: 0, sales_total: 0, sales_count: 0 }
  );
}

export async function getMyReferrerEarningsForPost(postLegacyId: string) {
  const { data, error } = await supabase.rpc(
    "get_my_referrer_earnings_for_post",
    {
      post_legacy: postLegacyId,
    },
  );

  if (error) throw new Error(error.message);
  return (
    data?.[0] ?? {
      post_id: postLegacyId,
      referrer_commission_total: 0,
      sales_total: 0,
      sales_count: 0,
    }
  );
}
