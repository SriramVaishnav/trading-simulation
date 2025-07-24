import { NotificationBellSvg, PredLogoSvg, StarSvg } from "@/lib/svgs";
import React from "react";

const Header = () => {
  return (
    <header className="w-full p-6 border-b-2 flex justify-between items-center sticky top-0 left-0 bg-white z-50">
      <PredLogoSvg />
      <div className="flex items-center gap-x-4">
        <StarSvg />
        <NotificationBellSvg />
      </div>
    </header>
  );
};

export default Header;
