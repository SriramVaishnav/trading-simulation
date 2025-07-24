import React from "react";
import { Checkbox } from "../ui/checkbox";
import { Button } from "../ui/button";

const OpenOrders = () => {
  return (
    <div className="border-t-2 w-full">
      <div className="py-2 flex items-center justify-between border-b">
        <div className="flex items-center gap-x-2">
          <Checkbox />
          <p className="#858585 text-sm">Hide Other Pairs</p>
        </div>
        <Button variant="secondary">Cancel All</Button>
      </div>
      <div className="py-3">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <p>CSK / IPL Winner</p>
            <p className="text-sm text-green-700">
              Limit /Buy{" "}
              <span className="text-xs text-[#858585]">
                2025-06-03 14:57:23
              </span>
            </p>
          </div>
          <div className="flex items-center gap-x-2">
            <div className="space-y-1">
              <p className="text-sm text-center">0%</p>
              <div className="h-1 w-11 bg-purple-100 rounded-3xl" />
            </div>
            <Button variant="secondary">Cancel</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OpenOrders;
