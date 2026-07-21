"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function ScrollToTop() {
  const pathname = usePathname();

  useEffect(() => {
    // Reset main window scroll
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant",
    });

    // Reset admin dashboard scroll container
    const adminScrollContainers = document.querySelectorAll(".admin-main-scroll");
    adminScrollContainers.forEach((container) => {
      container.scrollTo({
        top: 0,
        left: 0,
        behavior: "instant",
      });
    });
  }, [pathname]);

  return null;
}
