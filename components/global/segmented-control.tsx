import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";

const SegmentedControl = ({
  tabItems,
  variant,
}: {
  variant: 1 | 2;
  tabItems: {
    value: string;
    label: string;
    contentElement: React.ReactNode;
  }[];
}) => {
  return (
    <>
      {variant === 1 ? (
        <Tabs defaultValue={tabItems[0].value} className="w-full">
          <TabsList className="w-full bg-[#F5F5F5] border-[1px] border-[#E9E9E9] rounded-sm">
            {tabItems.map((item) => (
              <TabsTrigger
                key={item.value}
                value={item.value}
                className="data-[state=active]:bg-[#2B2B2B] data-[state=active]:text-white data-[state=active]:rounded-sm py-3"
              >
                <p className="text-xs">{item.label}</p>
              </TabsTrigger>
            ))}
          </TabsList>
          {tabItems.map((item) => (
            <TabsContent key={item.value} value={item.value}>
              {item.contentElement}
            </TabsContent>
          ))}
        </Tabs>
      ) : (
        <Tabs defaultValue={tabItems[0].value} className="w-full">
          <TabsList className="p-0 h-auto bg-background gap-1">
            {tabItems.map((tab) => (
              <TabsTrigger
                key={tab.value}
                value={tab.value}
                className="data-[state=active]:font-bold data-[state=active]:shadow-none data-[state=inactive]:text-[#00000066]"
              >
                <p className="text-sm">{tab.label}</p>
              </TabsTrigger>
            ))}
          </TabsList>
          {tabItems.map((item) => (
            <TabsContent key={item.value} value={item.value}>
              {item.contentElement}
            </TabsContent>
          ))}
        </Tabs>
      )}
    </>
  );
};

export default SegmentedControl;
