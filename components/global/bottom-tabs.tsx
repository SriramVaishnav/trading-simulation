"use client";

import React, { useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "../ui/tabs";
import { BOTTOM_TABS } from "@/lib/constants";
import { cn } from "@/lib/utils";

const BottomTabs = () => {
  const [activeTab, setActiveTab] = useState(BOTTOM_TABS[1].value);

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
      <TabsList className="absolute bottom-0 left-0 z-10 w-full h-18 flex justify-evenly items-center border-t border-2 py-4 bg-background">
        {BOTTOM_TABS.map((tab) => {
          const isActive = tab.value === activeTab;

          return (
            <TabsTrigger
              key={tab.value}
              value={tab.value}
              className="flex flex-col items-center justify-center h-full w-full rounded-none shadow-none border-none"
            >
              {tab.icon}
              <span
                className={cn(
                  "mt-1 text-sm",
                  isActive ? "text-black" : "text-[#535353B2]"
                )}
              >
                {tab.name}
              </span>
            </TabsTrigger>
          );
        })}
      </TabsList>
    </Tabs>
  );
};

export default BottomTabs;
