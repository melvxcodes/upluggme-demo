select p.legacy_id, p.content, pr.username, p.is_ad, p.created_at
from public.posts p
join public.profiles pr on pr.id = p.user_id
order by p.created_at desc;