import { useState } from "react";
import { MobileProfileView } from "../components/MobileProfileView";

export function ProfileRoute() {
  // Preserving your demo defaults
  const [likedPosts] = useState<Set<string>>(new Set(["2", "4", "5"]));
  const [bookmarkedPosts] = useState<Set<string>>(new Set(["1", "3"]));

  return (
    <div className="pt-14">
      <MobileProfileView
        likedPosts={likedPosts}
        bookmarkedPosts={bookmarkedPosts}
      />
    </div>
  );
}
