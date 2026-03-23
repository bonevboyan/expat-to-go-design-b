import { useEffect, useRef } from "react";
import { Outlet, useLocation } from "react-router";
import { BottomTabs } from "./BottomTabs";

export function Layout() {
  const location = useLocation();
  const pathname = location.pathname;
  const outletRef = useRef<HTMLDivElement>(null);

  // Reset scroll position on route change
  useEffect(() => {
    // Reset window scroll
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    
    // Reset the outlet container scroll if it exists
    if (outletRef.current) {
      outletRef.current.scrollTop = 0;
    }
  }, [pathname]);

  const hideTabs =
    pathname === "/login" ||
    pathname === "/fullscreen-map" ||
    pathname.startsWith("/trip/") ||
    pathname.startsWith("/chat/") ||
    pathname.startsWith("/user/") ||
    pathname === "/edit-profile";

  return (
    <div className="max-w-md mx-auto h-screen flex flex-col bg-background">
      <div
        ref={outletRef}
        className="flex-1 overflow-y-auto"
        key={pathname} // Force remount on route change to reset scroll
      >
        <Outlet />
      </div>
      {!hideTabs && <BottomTabs />}
    </div>
  );
}
