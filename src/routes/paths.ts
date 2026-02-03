export const paths = {
  home: "/",
  explore: "/explore",
  marketplace: "/marketplace",
  cart: "/cart",
  notifications: "/notifications",
  messages: "/messages",
  profile: "/profile",
} as const;

export type PathKey = keyof typeof paths;
