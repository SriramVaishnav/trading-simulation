"use client";

import React, { useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "../ui/tabs";
import { BOTTOM_TABS } from "@/lib/constants";
import { cn } from "@/lib/utils";

const BottomTabs = () => {
  const [activeTab, setActiveTab] = useState(BOTTOM_TABS[0].value);

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
      <TabsList className="fixed bottom-0 left-0 z-50 w-full h-14 flex justify-evenly items-center border-t border-muted bg-background">
        {BOTTOM_TABS.map((tab) => {
          const isActive = tab.value === activeTab;

          return (
            <TabsTrigger
              key={tab.value}
              value={tab.value}
              className="flex flex-col items-center justify-center h-full w-full rounded-none border-b-2"
            >
              {tab.icon}
              <span
                className={cn(
                  "mt-1 text-sm",
                  isActive ? "text-black" : "text-gray-700"
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
