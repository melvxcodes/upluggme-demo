import { User, Post, MarketplaceItem, Comment, AssociatedSale } from "../types";

export const currentUser: User = {
  id: "0",
  name: "Alex Johnson",
  username: "@alexj",
  avatar:
    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop",
  bio: "Designer & Developer | Coffee enthusiast ☕",
  followers: 1243,
  following: 567,
};

export const mockUsers: User[] = [
  {
    id: "1",
    name: "Sarah Miller",
    username: "@sarahm",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
    followers: 2341,
    following: 432,
  },
  {
    id: "2",
    name: "Mike Chen",
    username: "@mikechen",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
    followers: 5672,
    following: 891,
  },
  {
    id: "3",
    name: "Emma Davis",
    username: "@emmad",
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop",
    followers: 3421,
    following: 654,
  },
  {
    id: "4",
    name: "James Wilson",
    username: "@jameswil",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop",
    followers: 987,
    following: 234,
  },
  {
    id: "fnb",
    name: "FNB South Africa",
    username: "@FNBSA",
    avatar:
      "https://www.sagoodnews.co.za/wp-content/uploads/2023/01/FNB-BANK-LOGO-A-1.jpg",
    followers: 245000,
    following: 12,
  },
];

export const mockPosts: Post[] = [
  {
    id: "1",
    user: mockUsers[0],
    content:
      "Just finished an amazing hike in the mountains! The view was absolutely breathtaking. Nature really is the best therapy. 🏔️",
    image:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
    likes: 234,
    comments: 18,
    shares: 5,
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
    isLiked: false,
  },
  {
    id: "2",
    user: mockUsers[1],
    content:
      "Excited to share my latest project! Been working on this design system for the past few weeks. What do you all think?",
    image:
      "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=800&h=600&fit=crop",
    likes: 567,
    comments: 43,
    shares: 12,
    timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000),
    isLiked: true,
  },
  {
    id: "fnb-ad",
    user: {
      id: "fnb",
      name: "FNB South Africa",
      username: "@FNBSA",
      avatar:
        "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=400&fit=crop&crop=face",
    },
    content:
      "Banking made better, smarter, and more secure. FNB brings you innovative digital banking solutions with cutting-edge security features to protect your finances. 💳🔒\n\n👉 Download the FNB App for exclusive features\n👉 Get up to R5000 personal loan in minutes\n👉 Earn eBucks on every transaction\n\n#FNBSouthAfrica #DigitalBanking #SecureBanking #eBucks",
    image:
      "https://www.recharged.co.za/wp-content/uploads/2023/11/Picture1-2.png",
    likes: 1247,
    comments: 89,
    shares: 45,
    timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000),
    isLiked: false,
    isAd: true,
  },
  {
    id: "3",
    user: mockUsers[2],
    content: `Why I switched to morning workouts and never looked back 💪

I used to be the person who hit snooze five times and rolled into work barely awake. Everything changed when I decided to try working out at 6 AM for just one week.

The benefits were immediate:
• More energy throughout the day
• Better focus and productivity
• Consistent routine that actually stuck
• No more "I'll go after work" excuses

The first week was rough, not gonna lie. But by week two, my body adapted. Now three months in, I genuinely look forward to those early morning sessions.

Pro tip: Lay out your workout clothes the night before. It removes one barrier between you and that morning workout.

Anyone else a morning workout person? Drop your favorite time to exercise below! ⬇️`,
    likes: 892,
    comments: 124,
    shares: 38,
    timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000),
    isLiked: false,
  },
  {
    id: "4",
    user: mockUsers[3],
    content:
      "Beautiful sunset at the beach today. Sometimes you just need to unplug and enjoy the moment. 🌅",
    image:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&h=600&fit=crop",
    likes: 892,
    comments: 67,
    shares: 23,
    timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000),
    isLiked: true,
  },
  {
    id: "5",
    user: currentUser,
    content: `5 habits that changed my productivity game 🚀

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
Writing 3 pages every morning clears my mind and surfaces creative ideas I didn't know I had.

Start with just one of these. You don't need to do everything at once. Small changes compound over time.

What's your #1 productivity habit? Would love to hear what works for you! 💬`,
    likes: 1547,
    comments: 203,
    shares: 89,
    timestamp: new Date(Date.now() - 18 * 60 * 60 * 1000),
    isLiked: true,
  },
];

export const mockMarketplaceItems: MarketplaceItem[] = [
  {
    id: "mp1",
    title: "Vintage Leather Jacket",
    price: 120,
    image:
      "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=400&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1520975954732-35dd22299614?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800&h=800&fit=crop",
    ],
    seller: "sarahm",
    category: "fashion",
    likes: 234,
    isNew: true,
    description:
      "Classic vintage leather jacket in excellent condition. Made from premium genuine leather with a timeless design. Perfect for any season. Features zippered pockets and a comfortable fit.",
    inStock: true,
  },
  {
    id: "mp2",
    title: "Wireless Headphones",
    price: 95,
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1545127398-14699f92334b?w=800&h=800&fit=crop",
    ],
    seller: "jameswil",
    category: "tech",
    likes: 412,
    isNew: true,
    description:
      "Premium wireless headphones with active noise cancellation. 30-hour battery life, comfortable over-ear design, and crystal-clear sound quality. Includes carrying case and charging cable.",
    inStock: true,
  },
  {
    id: "mp3",
    title: "Minimalist Wall Art",
    price: 45,
    image:
      "https://images.unsplash.com/photo-1761156254622-7b66649b1f69?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400&h=400&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1761156254622-7b66649b1f69?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800&h=800&fit=crop",
    ],
    seller: "mikechen",
    category: "art",
    likes: 156,
    description:
      "Beautiful minimalist abstract art print. High-quality canvas print ready to hang. Adds a modern touch to any room.",
    inStock: true,
  },
  {
    id: "mp4",
    title: "Ceramic Coffee Mug Set",
    price: 32,
    image:
      "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=400&h=400&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=800&h=800&fit=crop",
    ],
    seller: "emmad",
    category: "home",
    likes: 89,
    description:
      "Set of 4 handcrafted ceramic coffee mugs. Microwave and dishwasher safe. Perfect for your morning coffee or tea.",
    inStock: true,
  },
  {
    id: "mp5",
    title: "Smart Fitness Watch",
    price: 89,
    image:
      "https://images.unsplash.com/photo-1690016424217-03f4d9427a6a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400&h=400&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1690016424217-03f4d9427a6a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800&h=800&fit=crop",
    ],
    seller: "sarahm",
    category: "tech",
    likes: 327,
    description:
      "Track your fitness goals with this smart watch. Features heart rate monitoring, GPS, sleep tracking, and water resistance.",
    inStock: true,
  },
  {
    id: "mp6",
    title: "Designer Backpack",
    price: 75,
    image:
      "https://images.unsplash.com/photo-1582429073538-b43fa2eaf19e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400&h=400&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1582429073538-b43fa2eaf19e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800&h=800&fit=crop",
    ],
    seller: "jameswil",
    category: "fashion",
    likes: 198,
    description:
      "Stylish and functional backpack perfect for daily commutes or travel. Multiple compartments and padded laptop sleeve.",
    inStock: true,
  },
];

// Ad posts featuring marketplace items
export const adPosts: Post[] = [
  {
    id: "ad1",
    user: {
      id: "upluggme",
      name: "UPLUGGME",
      username: "@upluggme",
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop",
    },
    content:
      "Elevate your style with this timeless vintage leather jacket. Premium quality, perfect fit. 🧥✨",
    image: mockMarketplaceItems[0].image,
    likes: 1234,
    comments: 89,
    shares: 45,
    timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
    isLiked: false,
    isAd: true,
    marketplaceItem: mockMarketplaceItems[0],
  },
  {
    id: "ad2",
    user: {
      id: "upluggme",
      name: "UPLUGGME",
      username: "@upluggme",
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop",
    },
    content:
      "Experience audio perfection with these premium wireless headphones. Noise cancellation that truly works. 🎧",
    image: mockMarketplaceItems[1].image,
    likes: 2341,
    comments: 156,
    shares: 78,
    timestamp: new Date(Date.now() - 15 * 60 * 60 * 1000),
    isLiked: false,
    isAd: true,
    marketplaceItem: mockMarketplaceItems[1],
  },
];

export const mockComments: Comment[] = [
  {
    id: "c1",
    user: mockUsers[0],
    content: "This is so helpful! I've been struggling with morning workouts.",
    timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000),
    likes: 12,
  },
  {
    id: "c2",
    user: mockUsers[1],
    content: "Great tips! I especially love the 2-minute rule.",
    timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
    likes: 8,
  },
  {
    id: "ad-comment1",
    user: {
      id: "upluggme",
      name: "UPLUGGME",
      username: "@upluggme",
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop",
    },
    content:
      "Upgrade your workspace with our minimalist wall art collection. Perfect for focus and inspiration. 🎨",
    timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000),
    likes: 23,
    isAd: true,
    marketplaceItem: mockMarketplaceItems[2],
  },
  {
    id: "c3",
    user: mockUsers[2],
    content: "Time blocking changed my life too! 🙌",
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
    likes: 15,
  },
  {
    id: "ad-comment2",
    user: {
      id: "upluggme",
      name: "UPLUGGME",
      username: "@upluggme",
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop",
    },
    content:
      "Level up your fitness game with our smart watch. Track everything that matters! ⌚",
    timestamp: new Date(Date.now() - 1.5 * 60 * 60 * 1000),
    likes: 31,
    isAd: true,
    marketplaceItem: mockMarketplaceItems[4],
  },
  {
    id: "ad-comment3",
    user: {
      id: "upluggme",
      name: "UPLUGGME",
      username: "@upluggme",
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop",
    },
    content:
      "Stay organized in style with this premium designer backpack. Perfect for work or travel! 🎒",
    timestamp: new Date(Date.now() - 45 * 60 * 1000),
    likes: 18,
    isAd: true,
    marketplaceItem: mockMarketplaceItems[5],
  },
];

// Mock associated sales data - tracks sales from comment links
export const mockAssociatedSales: AssociatedSale[] = [
  {
    id: "as1",
    item: mockMarketplaceItems[4], // Smart Fitness Watch
    buyerUsername: "@sarahm",
    saleAmount: 89,
    commission: 13.35, // 15% commission
    timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000),
    postId: "3", // Morning workouts post
    sourceType: "comment",
  },
  {
    id: "as2",
    item: mockMarketplaceItems[2], // Minimalist Wall Art
    buyerUsername: "@mikechen",
    saleAmount: 45,
    commission: 6.75,
    timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000),
    postId: "5", // Productivity post
    sourceType: "comment",
  },
  {
    id: "as3",
    item: mockMarketplaceItems[5], // Designer Backpack
    buyerUsername: "@jameswil",
    saleAmount: 75,
    commission: 11.25,
    timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000),
    postId: "5", // Productivity post
    sourceType: "comment",
  },
  {
    id: "as4",
    item: mockMarketplaceItems[3], // Ceramic Coffee Mug Set
    buyerUsername: "@emmad",
    saleAmount: 32,
    commission: 4.8,
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
    postId: "5", // Productivity post
    sourceType: "comment",
  },
  {
    id: "as5",
    item: mockMarketplaceItems[4], // Smart Fitness Watch
    buyerUsername: "@user123",
    saleAmount: 89,
    commission: 13.35,
    timestamp: new Date(Date.now() - 36 * 60 * 60 * 1000),
    postId: "3", // Morning workouts post
    sourceType: "comment",
  },
  {
    id: "as6",
    item: mockMarketplaceItems[1], // Wireless Headphones
    buyerUsername: "@techfan",
    saleAmount: 95,
    commission: 14.25,
    timestamp: new Date(Date.now() - 48 * 60 * 60 * 1000),
    postId: "5", // Productivity post
    sourceType: "comment",
  },
  {
    id: "as7",
    item: mockMarketplaceItems[2], // Minimalist Wall Art
    buyerUsername: "@artlover",
    saleAmount: 45,
    commission: 6.75,
    timestamp: new Date(Date.now() - 60 * 60 * 1000),
    postId: "5", // Productivity post
    sourceType: "comment",
  },
];
