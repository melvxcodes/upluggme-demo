import React from "react";
import { Home, Search, PlusSquare, ShoppingBag, User } from "lucide-react";

interface MobileNavProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  onNewPost: () => void;
}

export function MobileNav({
  activeTab,
  onTabChange,
  onNewPost,
}: MobileNavProps) {
  const navItems = [
    { id: "home", icon: Home, label: "Home" },
    { id: "explore", icon: Search, label: "Explore" },
    { id: "create", icon: PlusSquare, label: "Create", action: onNewPost },
    { id: "marketplace", icon: ShoppingBag, label: "Marketplace" },
    { id: "profile", icon: User, label: "Profile" },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-border z-50">
      <div className="flex items-center justify-around h-12 max-w-[500px] mx-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;

          return (
            <button
              key={item.id}
              onClick={() =>
                item.action ? item.action() : onTabChange(item.id)
              }
              className="flex items-center justify-center flex-1 h-full transition-colors"
              aria-label={item.label}
            >
              <Icon
                className={`h-6 w-6 ${
                  isActive ? "text-black" : "text-gray-400"
                } ${isActive && item.id !== "create" ? "fill-current" : ""}`}
                strokeWidth={isActive ? 2.5 : 2}
              />
            </button>
          );
        })}
      </div>
    </div>
  );
}
