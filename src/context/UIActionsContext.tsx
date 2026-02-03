import { createContext, useContext } from "react";

type UIActions = {
  openCreatePost: () => void;
  openItem: (itemId: string) => void;
  openComments: (postId: string) => void;
  openSales: (postId: string) => void;
  goToCart: () => void;
};

const UIActionsContext = createContext<UIActions | null>(null);

export function UIActionsProvider({
  value,
  children,
}: {
  value: UIActions;
  children: React.ReactNode;
}) {
  return (
    <UIActionsContext.Provider value={value}>
      {children}
    </UIActionsContext.Provider>
  );
}

export function useUIActions() {
  const ctx = useContext(UIActionsContext);
  if (!ctx) {
    throw new Error("useUIActions must be used within UIActionsProvider");
  }
  return ctx;
}
