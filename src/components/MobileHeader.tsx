import { Heart, Mail } from "lucide-react";
import logo from "../assets/logo.png";

interface MobileHeaderProps {
  title?: string;
  onNotificationsClick?: () => void;
  onMessagesClick?: () => void;
}

export function MobileHeader({
  title = "Social",
  onNotificationsClick,
  onMessagesClick,
}: MobileHeaderProps) {
  return (
    <header className="fixed top-0 left-0 right-0 bg-white border-b border-border z-50">
      <div className="flex items-center justify-between h-14 px-4 max-w-[500px] mx-auto">
        <img src={logo} alt="UPLUGGME" className="h-12" />
        <div className="flex items-center gap-4">
          <button
            className="relative"
            aria-label="Notifications"
            onClick={onNotificationsClick}
          >
            <Heart className="h-6 w-6" />
            <span className="absolute -top-1 -right-1 bg-primary text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
              3
            </span>
          </button>
          <button aria-label="Messages" onClick={onMessagesClick}>
            <Mail className="h-6 w-6" />
          </button>
        </div>
      </div>
    </header>
  );
}
