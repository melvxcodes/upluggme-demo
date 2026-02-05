-- =========================================
-- UPLUGGME: Seed demo data
-- (Uses fixed UUIDs so re-seeding is stable)
-- =========================================

-- PROFILES UUID map (deterministic)
-- currentUser "0"  -> 20f98338-6cea-5451-b396-e89494348302
-- users 1..4       -> ce81959c-c22f-53da-ab5c-61b484823793, c1b1d655-8a8f-5f3e-a38d-06b21bbd1379, 084ad7f3-8e73-5578-ac69-d36edd361659, e25c1d6e-d975-5604-bd2f-198e918204d6
-- fnb              -> 5b908a64-250a-5ea6-b031-6bb212fbcbf9
-- upluggme         -> e29c46c3-8cf3-5753-89b1-2a1f25486f5c

insert into public.profiles (id, legacy_id, name, username, avatar, bio, followers_count, following_count)
values
  ('20f98338-6cea-5451-b396-e89494348302', '0', 'Alex Johnson', '@alexj',
   'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop',
   'Designer & Developer | Coffee enthusiast ☕', 1243, 567),

  ('ce81959c-c22f-53da-ab5c-61b484823793', '1', 'Sarah Miller', '@sarahm',
   'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop',
   null, 2341, 432),

  ('c1b1d655-8a8f-5f3e-a38d-06b21bbd1379', '2', 'Mike Chen', '@mikechen',
   'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
   null, 5672, 891),

  ('084ad7f3-8e73-5578-ac69-d36edd361659', '3', 'Emma Davis', '@emmad',
   'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop',
   null, 3421, 654),

  ('e25c1d6e-d975-5604-bd2f-198e918204d6', '4', 'James Wilson', '@jameswil',
   'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop',
   null, 987, 234),

  ('5b908a64-250a-5ea6-b031-6bb212fbcbf9', 'fnb', 'FNB South Africa', '@FNBSA',
   'https://www.sagoodnews.co.za/wp-content/uploads/2023/01/FNB-BANK-LOGO-A-1.jpg',
   null, 245000, 12),

  ('e29c46c3-8cf3-5753-89b1-2a1f25486f5c', 'upluggme', 'UPLUGGME', '@upluggme',
   'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop',
   null, null, null)
on conflict (id) do nothing;

-- MARKETPLACE ITEMS UUID map:
-- mp1 4c62a52d-c480-58e3-b064-39c7c475fdd1
-- mp2 fcc56fc7-47de-59a6-9e83-a5c3d82b4597
-- mp3 fcb244fd-725a-504e-9d05-da5f1d81acc4
-- mp4 0f69b9c3-d692-5043-96ef-ed1cdc419859
-- mp5 5d59c41f-6398-5e94-aec0-5df6541b9793
-- mp6 207ddd87-7072-560b-98b3-a82c38fbcc0b

insert into public.marketplace_items
(id, legacy_id, title, price, image, images, seller_username, category, likes, is_new, description, in_stock)
values
('4c62a52d-c480-58e3-b064-39c7c475fdd1','mp1','Vintage Leather Jacket',120,
 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=400&fit=crop',
 array[
  'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&h=800&fit=crop',
  'https://images.unsplash.com/photo-1520975954732-35dd22299614?w=800&h=800&fit=crop',
  'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800&h=800&fit=crop'
 ],
 'sarahm','fashion',234,true,
 'Classic vintage leather jacket in excellent condition. Made from premium genuine leather with a timeless design. Perfect for any season. Features zippered pockets and a comfortable fit.',
 true),

('fcc56fc7-47de-59a6-9e83-a5c3d82b4597','mp2','Wireless Headphones',95,
 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop',
 array[
  'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&h=800&fit=crop',
  'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=800&h=800&fit=crop',
  'https://images.unsplash.com/photo-1545127398-14699f92334b?w=800&h=800&fit=crop'
 ],
 'jameswil','tech',412,true,
 'Premium wireless headphones with active noise cancellation. 30-hour battery life, comfortable over-ear design, and crystal-clear sound quality. Includes carrying case and charging cable.',
 true),

('fcb244fd-725a-504e-9d05-da5f1d81acc4','mp3','Minimalist Wall Art',45,
 'https://images.unsplash.com/photo-1761156254622-7b66649b1f69?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400&h=400&fit=crop',
 array[
  'https://images.unsplash.com/photo-1761156254622-7b66649b1f69?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800&h=800&fit=crop'
 ],
 'mikechen','art',156,false,
 'Beautiful minimalist abstract art print. High-quality canvas print ready to hang. Adds a modern touch to any room.',
 true),

('0f69b9c3-d692-5043-96ef-ed1cdc419859','mp4','Ceramic Coffee Mug Set',32,
 'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=400&h=400&fit=crop',
 array[
  'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=800&h=800&fit=crop'
 ],
 'emmad','home',89,false,
 'Set of 4 handcrafted ceramic coffee mugs. Microwave and dishwasher safe. Perfect for your morning coffee or tea.',
 true),

('5d59c41f-6398-5e94-aec0-5df6541b9793','mp5','Smart Fitness Watch',89,
 'https://images.unsplash.com/photo-1690016424217-03f4d9427a6a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400&h=400&fit=crop',
 array[
  'https://images.unsplash.com/photo-1690016424217-03f4d9427a6a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800&h=800&fit=crop'
 ],
 'sarahm','tech',327,false,
 'Track your fitness goals with this smart watch. Features heart rate monitoring, GPS, sleep tracking, and water resistance.',
 true),

('207ddd87-7072-560b-98b3-a82c38fbcc0b','mp6','Designer Backpack',75,
 'https://images.unsplash.com/photo-1582429073538-b43fa2eaf19e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400&h=400&fit=crop',
 array[
  'https://images.unsplash.com/photo-1582429073538-b43fa2eaf19e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800&h=800&fit=crop'
 ],
 'jameswil','fashion',198,false,
 'Stylish and functional backpack perfect for daily commutes or travel. Multiple compartments and padded laptop sleeve.',
 true)
on conflict (id) do nothing;

-- POSTS UUID map:
-- 1 db27e273-43a1-5704-8a0f-463289f0ec06  (Sarah)
-- 2 501dcb31-8f33-5c24-891f-3ef2cd003c02  (Mike)
-- fnb-ad 887e5569-9aaf-53e5-8712-954aa81edd26 (FNB)
-- 3 0a895156-47d6-5b4c-b54a-c4636a7ed381  (Emma)
-- 4 b4d2d5a1-264e-520c-808d-8f670319e01c  (James)
-- 5 680cb074-be72-585f-b2ea-ef8c8c2aaa5d  (Alex)
-- ad1 db3cd524-9734-5966-98da-fc8c727fe598 (UPLUGGME) -> mp1
-- ad2 593c4ca5-5c90-58ab-bc74-e70098017b08 (UPLUGGME) -> mp2

insert into public.posts
(id, legacy_id, user_id, content, image, likes, comments, shares, created_at, is_ad, marketplace_item_id)
values
('db27e273-43a1-5704-8a0f-463289f0ec06','1','ce81959c-c22f-53da-ab5c-61b484823793',
 'Just finished an amazing hike in the mountains! The view was absolutely breathtaking. Nature really is the best therapy. 🏔️',
 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop',
 234,18,5, now() - interval '2 hours', false, null),

('501dcb31-8f33-5c24-891f-3ef2cd003c02','2','c1b1d655-8a8f-5f3e-a38d-06b21bbd1379',
 'Excited to share my latest project! Been working on this design system for the past few weeks. What do you all think?',
 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=800&h=600&fit=crop',
 567,43,12, now() - interval '5 hours', false, null),

('887e5569-9aaf-53e5-8712-954aa81edd26','fnb-ad','5b908a64-250a-5ea6-b031-6bb212fbcbf9',
 'Banking made better, smarter, and more secure. FNB brings you innovative digital banking solutions with cutting-edge security features to protect your finances. 💳🔒

👉 Download the FNB App for exclusive features
👉 Get up to R5000 personal loan in minutes
👉 Earn eBucks on every transaction

#FNBSouthAfrica #DigitalBanking #SecureBanking #eBucks',
 'https://www.recharged.co.za/wp-content/uploads/2023/11/Picture1-2.png',
 1247,89,45, now() - interval '3 hours', true, null),

('0a895156-47d6-5b4c-b54a-c4636a7ed381','3','084ad7f3-8e73-5578-ac69-d36edd361659',
 'Why I switched to morning workouts and never looked back 💪

I used to be the person who hit snooze five times and rolled into work barely awake. Everything changed when I decided to try working out at 6 AM for just one week.

The benefits were immediate:
• More energy throughout the day
• Better focus and productivity
• Consistent routine that actually stuck
• No more "I''ll go after work" excuses

The first week was rough, not gonna lie. But by week two, my body adapted. Now three months in, I genuinely look forward to those early morning sessions.

Pro tip: Lay out your workout clothes the night before. It removes one barrier between you and that morning workout.

Anyone else a morning workout person? Drop your favorite time to exercise below! ⬇️',
 null,
 892,124,38, now() - interval '6 hours', false, null),

('b4d2d5a1-264e-520c-808d-8f670319e01c','4','e25c1d6e-d975-5604-bd2f-198e918204d6',
 'Beautiful sunset at the beach today. Sometimes you just need to unplug and enjoy the moment. 🌅',
 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&h=600&fit=crop',
 892,67,23, now() - interval '12 hours', false, null),

('680cb074-be72-585f-b2ea-ef8c8c2aaa5d','5','20f98338-6cea-5451-b396-e89494348302',
 '5 habits that changed my productivity game 🚀

After years of feeling overwhelmed and behind, I finally cracked the code. Here are the five habits that made the biggest difference:

1. Time blocking
Instead of a chaotic to-do list, I block specific hours for specific tasks. Game changer for deep work.

2. The 2-minute rule
If it takes less than 2 minutes, do it now. Prevents small tasks from piling up.

3. Weekly reviews
Every Sunday, I review the past week and plan the next. Keeps me aligned with my goals.

4. Single-tasking
Multitasking is a myth. I focus on ONE thing at a time and the quality of my work skyrocketed.

5. Morning pages
Writing 3 pages every morning clears my mind and surfaces creative ideas I didn''t know I had.

Start with just one of these. You don''t need to do everything at once. Small changes compound over time.

What''s your #1 productivity habit? Would love to hear what works for you! 💬',
 null,
 1547,203,89, now() - interval '18 hours', false, null),

('db3cd524-9734-5966-98da-fc8c727fe598','ad1','e29c46c3-8cf3-5753-89b1-2a1f25486f5c',
 'Elevate your style with this timeless vintage leather jacket. Premium quality, perfect fit. 🧥✨',
 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=400&fit=crop',
 1234,89,45, now() - interval '4 hours', true,
 '4c62a52d-c480-58e3-b064-39c7c475fdd1'),

('593c4ca5-5c90-58ab-bc74-e70098017b08','ad2','e29c46c3-8cf3-5753-89b1-2a1f25486f5c',
 'Experience audio perfection with these premium wireless headphones. Noise cancellation that truly works. 🎧',
 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop',
 2341,156,78, now() - interval '15 hours', true,
 'fcc56fc7-47de-59a6-9e83-a5c3d82b4597')
on conflict (id) do nothing;

-- COMMENTS UUID map:
-- c1 5a82b0e2-d0e1-5fde-88ae-9d22761b9102 (Sarah) -> post 5
-- c2 5c3cd1d8-9861-5bc7-86b4-e72edf7d4365 (Mike)  -> post 5
-- ad-comment1 98c5edad-39a8-5bbc-9a8a-154ff345b944 (UPLUGGME) -> post 5 -> mp3
-- c3 33a72e7d-0e3b-5068-ab70-af9fbae2e751 (Emma) -> post 5
-- ad-comment2 c272596c-2f5e-57fe-a971-4e904342ea70 (UPLUGGME) -> post 3 -> mp5
-- ad-comment3 330d11b4-3ee5-56fa-8c5c-aad7ea056662 (UPLUGGME) -> post 5 -> mp6

insert into public.comments
(id, legacy_id, post_id, user_id, content, likes, created_at, is_ad, marketplace_item_id)
values
('5a82b0e2-d0e1-5fde-88ae-9d22761b9102','c1',
 '680cb074-be72-585f-b2ea-ef8c8c2aaa5d','ce81959c-c22f-53da-ab5c-61b484823793',
 'This is so helpful! I''ve been struggling with morning workouts.',
 12, now() - interval '5 hours', false, null),

('5c3cd1d8-9861-5bc7-86b4-e72edf7d4365','c2',
 '680cb074-be72-585f-b2ea-ef8c8c2aaa5d','c1b1d655-8a8f-5f3e-a38d-06b21bbd1379',
 'Great tips! I especially love the 2-minute rule.',
 8, now() - interval '4 hours', false, null),

('98c5edad-39a8-5bbc-9a8a-154ff345b944','ad-comment1',
 '680cb074-be72-585f-b2ea-ef8c8c2aaa5d','e29c46c3-8cf3-5753-89b1-2a1f25486f5c',
 'Upgrade your workspace with our minimalist wall art collection. Perfect for focus and inspiration. 🎨',
 23, now() - interval '3 hours', true,
 'fcb244fd-725a-504e-9d05-da5f1d81acc4'),

('33a72e7d-0e3b-5068-ab70-af9fbae2e751','c3',
 '680cb074-be72-585f-b2ea-ef8c8c2aaa5d','084ad7f3-8e73-5578-ac69-d36edd361659',
 'Time blocking changed my life too! 🙌',
 15, now() - interval '2 hours', false, null),

('c272596c-2f5e-57fe-a971-4e904342ea70','ad-comment2',
 '0a895156-47d6-5b4c-b54a-c4636a7ed381','e29c46c3-8cf3-5753-89b1-2a1f25486f5c',
 'Level up your fitness game with our smart watch. Track everything that matters! ⌚',
 31, now() - interval '90 minutes', true,
 '5d59c41f-6398-5e94-aec0-5df6541b9793'),

('330d11b4-3ee5-56fa-8c5c-aad7ea056662','ad-comment3',
 '680cb074-be72-585f-b2ea-ef8c8c2aaa5d','e29c46c3-8cf3-5753-89b1-2a1f25486f5c',
 'Stay organized in style with this premium designer backpack. Perfect for work or travel! 🎒',
 18, now() - interval '45 minutes', true,
 '207ddd87-7072-560b-98b3-a82c38fbcc0b')
on conflict (id) do nothing;

-- ASSOCIATED SALES UUID map:
-- as1 d0585961-d21f-54d7-b55e-aa5c68ebeda9 -> mp5 -> post 3
-- as2 f31ea8d9-5c6d-5f79-95fb-b7a5edbb38df -> mp3 -> post 5
-- as3 8b479110-c390-5494-ad03-3a659ae90106 -> mp6 -> post 5
-- as4 87bdaebb-b8ab-56ab-ad24-97c12eaab509 -> mp4 -> post 5
-- as5 a7a0e2fe-325d-5d0a-8801-8bfeed8060c6 -> mp5 -> post 3
-- as6 8c260cef-b078-52ac-b7eb-67ab3b6676aa -> mp2 -> post 5
-- as7 fbfc8cef-378c-586c-b4d8-509bd36279f5 -> mp3 -> post 5

insert into public.associated_sales
(id, legacy_id, item_id, buyer_username, sale_amount, commission, created_at, post_id, source_type)
values
('d0585961-d21f-54d7-b55e-aa5c68ebeda9','as1',
 '5d59c41f-6398-5e94-aec0-5df6541b9793','@sarahm',89,13.35, now() - interval '3 hours',
 '0a895156-47d6-5b4c-b54a-c4636a7ed381','comment'),

('f31ea8d9-5c6d-5f79-95fb-b7a5edbb38df','as2',
 'fcb244fd-725a-504e-9d05-da5f1d81acc4','@mikechen',45,6.75, now() - interval '8 hours',
 '680cb074-be72-585f-b2ea-ef8c8c2aaa5d','comment'),

('8b479110-c390-5494-ad03-3a659ae90106','as3',
 '207ddd87-7072-560b-98b3-a82c38fbcc0b','@jameswil',75,11.25, now() - interval '12 hours',
 '680cb074-be72-585f-b2ea-ef8c8c2aaa5d','comment'),

('87bdaebb-b8ab-56ab-ad24-97c12eaab509','as4',
 '0f69b9c3-d692-5043-96ef-ed1cdc419859','@emmad',32,4.80, now() - interval '24 hours',
 '680cb074-be72-585f-b2ea-ef8c8c2aaa5d','comment'),

('a7a0e2fe-325d-5d0a-8801-8bfeed8060c6','as5',
 '5d59c41f-6398-5e94-aec0-5df6541b9793','@user123',89,13.35, now() - interval '36 hours',
 '0a895156-47d6-5b4c-b54a-c4636a7ed381','comment'),

('8c260cef-b078-52ac-b7eb-67ab3b6676aa','as6',
 'fcc56fc7-47de-59a6-9e83-a5c3d82b4597','@techfan',95,14.25, now() - interval '48 hours',
 '680cb074-be72-585f-b2ea-ef8c8c2aaa5d','comment'),

('fbfc8cef-378c-586c-b4d8-509bd36279f5','as7',
 'fcb244fd-725a-504e-9d05-da5f1d81acc4','@artlover',45,6.75, now() - interval '1 hour',
 '680cb074-be72-585f-b2ea-ef8c8c2aaa5d','comment')
on conflict (id) do nothing;

-- Extra seed comments so all posts show activity
insert into public.comments
(id, legacy_id, post_id, user_id, content, likes, created_at, is_ad, marketplace_item_id)
values
-- Post "1" (Hike)
(gen_random_uuid(), 'c_post1_1', 'db27e273-43a1-5704-8a0f-463289f0ec06', 'c1b1d655-8a8f-5f3e-a38d-06b21bbd1379',
 'That view looks unreal 🔥', 6, now() - interval '90 minutes', false, null),
(gen_random_uuid(), 'c_post1_2', 'db27e273-43a1-5704-8a0f-463289f0ec06', '084ad7f3-8e73-5578-ac69-d36edd361659',
 'Nature therapy is real.', 3, now() - interval '60 minutes', false, null),

-- Post "2" (Design system)
(gen_random_uuid(), 'c_post2_1', '501dcb31-8f33-5c24-891f-3ef2cd003c02', 'ce81959c-c22f-53da-ab5c-61b484823793',
 'Clean! Would love to see the components library.', 9, now() - interval '4 hours', false, null),
(gen_random_uuid(), 'c_post2_2', '501dcb31-8f33-5c24-891f-3ef2cd003c02', 'e25c1d6e-d975-5604-bd2f-198e918204d6',
 'This is impressive. What tool are you using?', 4, now() - interval '3 hours', false, null),

-- Post "4" (Sunset)
(gen_random_uuid(), 'c_post4_1', 'b4d2d5a1-264e-520c-808d-8f670319e01c', '084ad7f3-8e73-5578-ac69-d36edd361659',
 'That sunset is perfect 🌅', 7, now() - interval '10 hours', false, null),

-- Post "fnb-ad" (Ad)
(gen_random_uuid(), 'c_fnb_1', '887e5569-9aaf-53e5-8712-954aa81edd26', '20f98338-6cea-5451-b396-e89494348302',
 'Those eBucks perks are tempting.', 5, now() - interval '2 hours', false, null),

-- Post "ad1" (UPLUGGME ad -> mp1)
(gen_random_uuid(), 'c_ad1_1', 'db3cd524-9734-5966-98da-fc8c727fe598', 'ce81959c-c22f-53da-ab5c-61b484823793',
 'This jacket is 🔥. What sizes are available?', 11, now() - interval '3 hours', false, '4c62a52d-c480-58e3-b064-39c7c475fdd1'),

-- Post "ad2" (UPLUGGME ad -> mp2)
(gen_random_uuid(), 'c_ad2_1', '593c4ca5-5c90-58ab-bc74-e70098017b08', 'c1b1d655-8a8f-5f3e-a38d-06b21bbd1379',
 'Noise cancellation is a must. Adding to my wishlist.', 8, now() - interval '12 hours', false, 'fcc56fc7-47de-59a6-9e83-a5c3d82b4597');

-- =========================================
-- Seed: simulate shares + (optional) commission split attribution
-- IMPORTANT: This section is SAFE:
-- - Always inserts into post_shares
-- - Only updates associated_sales if the required columns exist
-- =========================================

-- Create a couple of "shares" (user shared a post)
insert into public.post_shares (post_id, user_id)
values
  -- Mike shares Alex's productivity post (legacy "5")
  ('680cb074-be72-585f-b2ea-ef8c8c2aaa5d', 'c1b1d655-8a8f-5f3e-a38d-06b21bbd1379'),
  -- Sarah shares Emma's morning workout post (legacy "3")
  ('0a895156-47d6-5b4c-b54a-c4636a7ed381', 'ce81959c-c22f-53da-ab5c-61b484823793')
on conflict do nothing;

-- Optional: keep posts.shares in sync with actual share rows
update public.posts p
set shares = coalesce(s.cnt, 0)
from (
  select post_id, count(*)::int as cnt
  from public.post_shares
  group by post_id
) s
where p.id = s.post_id;

-- Optional attribution updates (ONLY if columns exist)
do $$
begin
  -- If you later add these columns to associated_sales, this block will start working automatically.
  if exists (
    select 1
    from information_schema.columns
    where table_schema = 'public'
      and table_name = 'associated_sales'
      and column_name = 'referrer_user_id'
  ) then

    -- Update a few existing associated sales to be "via share" (referrer exists)
    update public.associated_sales
    set referrer_user_id = 'c1b1d655-8a8f-5f3e-a38d-06b21bbd1379' -- Mike
    where legacy_id in ('as2','as3','as7');

    update public.associated_sales
    set referrer_user_id = 'ce81959c-c22f-53da-ab5c-61b484823793' -- Sarah
    where legacy_id in ('as1');

  end if;

  -- Commission split columns (only run if they exist)
  if exists (
    select 1
    from information_schema.columns
    where table_schema = 'public'
      and table_name = 'associated_sales'
      and column_name = 'commission_owner'
  ) then
    -- Example 70/30 split when referrer exists
    update public.associated_sales
    set
      commission_owner = round(commission * 0.70, 2),
      commission_referrer = round(commission * 0.30, 2)
    where legacy_id in ('as2','as3','as7','as1');
  end if;

  -- post_owner_id safety update (only if that column exists)
  if exists (
    select 1
    from information_schema.columns
    where table_schema = 'public'
      and table_name = 'associated_sales'
      and column_name = 'post_owner_id'
  ) then
    update public.associated_sales s
    set post_owner_id = p.user_id
    from public.posts p
    where p.id = s.post_id
      and s.post_owner_id is distinct from p.user_id;
  end if;

end $$;
