import { createBrowserRouter } from "react-router-dom";
import { AppShell } from "../shell/AppShell";
import { HomeRoute } from "./HomeRoute";
import { ExploreRoute } from "./ExploreRoute";
import { MarketplaceRoute } from "./MarketplaceRoute";
import { CartRoute } from "./CartRoute";
import { NotificationsRoute } from "./NotificationsRoute";
import { MessagesRoute } from "./MessagesRoute";
import { ProfileRoute } from "./ProfileRoute";
import { AuthPage } from "../pages/AuthPage";
import { RequireAuth } from "./RequireAuth";

export const router = createBrowserRouter([
  // Public route
  {
    path: "/auth",
    element: <AuthPage />,
  },

  // Protected app routes
  {
    path: "/",
    element: (
      <RequireAuth>
        <AppShell />
      </RequireAuth>
    ),
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
