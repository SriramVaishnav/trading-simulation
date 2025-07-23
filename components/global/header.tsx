import { NotificationBellSvg, PredLogoSvg, StarSvg } from "@/lib/svgs";
import React from "react";

const Header = () => {
  return (
    <header className="w-full p-6 border-b flex justify-between items-center">
      <PredLogoSvg />
      <div className="flex items-center gap-x-4">
        <StarSvg />
        <NotificationBellSvg />
      </div>
    </header>
  );
};

export default Header;
