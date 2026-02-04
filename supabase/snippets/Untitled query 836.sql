select p.legacy_id as post_id, count(c.*) as comments
from public.posts p
left join public.comments c on c.post_id = p.id
group by p.legacy_id
order by p.legacy_id;
