import { createBrowserRouter } from "react-router-dom";
import { AppShell } from "../shell/AppShell";
import { HomeRoute } from "./HomeRoute";
import { ExploreRoute } from "./ExploreRoute";
import { MarketplaceRoute } from "./MarketplaceRoute";
import { CartRoute } from "./CartRoute";
import { NotificationsRoute } from "./NotificationsRoute";
import { MessagesRoute } from "./MessagesRoute";
import { ProfileRoute } from "./ProfileRoute";

/**
 * NOTE:
 * We keep overlays state inside AppShell. To let pages open overlays,
 * we’ll use a simple pattern in Step 2 (next message): a small UI state context.
 *
 * For now, we’ll keep pages working without overlay triggers except where already routed.
 * Once you confirm everything builds, we’ll add the tiny context in a safe patch.
 */
export const router = createBrowserRouter([
  {
    path: "/",
    element: <AppShell />,
    children: [
      {
        index: true,
        element: (
          <HomeRoute
            onViewItem={() => {}}
            onComment={() => {}}
            onShare={() => {}}
            onViewSales={() => {}}
          />
        ),
      },
      { path: "explore", element: <ExploreRoute onViewItem={() => {}} /> },
      {
        path: "marketplace",
        element: (
          <MarketplaceRoute onViewItem={() => {}} onViewCart={() => {}} />
        ),
      },
      { path: "cart", element: <CartRoute /> },
      { path: "notifications", element: <NotificationsRoute /> },
      { path: "messages", element: <MessagesRoute /> },
      { path: "profile", element: <ProfileRoute /> },
    ],
  },
]);
