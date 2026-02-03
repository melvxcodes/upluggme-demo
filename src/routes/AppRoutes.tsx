import { createBrowserRouter } from "react-router-dom";
import { AppShell } from "../shell/AppShell";
import { HomeRoute } from "./HomeRoute";
import { ExploreRoute } from "./ExploreRoute";
import { MarketplaceRoute } from "./MarketplaceRoute";
import { CartRoute } from "./CartRoute";
import { NotificationsRoute } from "./NotificationsRoute";
import { MessagesRoute } from "./MessagesRoute";
import { ProfileRoute } from "./ProfileRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AppShell />,
    children: [
      { index: true, element: <HomeRoute /> },
      { path: "explore", element: <ExploreRoute /> },
      { path: "marketplace", element: <MarketplaceRoute /> },
      { path: "cart", element: <CartRoute /> },
      { path: "notifications", element: <NotificationsRoute /> },
      { path: "messages", element: <MessagesRoute /> },
      { path: "profile", element: <ProfileRoute /> },
    ],
  },
]);
