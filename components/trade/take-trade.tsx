import React from "react";
import SegmentedControl from "../global/segmented-control";
import BuyLong from "./buy-long";
import SellShort from "./sell-short";
import PriceChart from "./price-chart";

const TakeTrade = () => {
  return (
    <div className="py-8 flex justify-center gap-4">
      <div className="w-[55%]">
        <SegmentedControl variant={1} tabItems={SEGMENTED_CONTROL_ITEMS} />
      </div>
      <div className="w-[45%]">
        <PriceChart />
      </div>
    </div>
  );
};

const SEGMENTED_CONTROL_ITEMS = [
  {
    value: "buy",
    label: "BUY / LONG",
    contentElement: <BuyLong />,
  },
  {
    value: "sell",
    label: "SELL / SHORT",
    contentElement: <SellShort />,
  },
];

export default TakeTrade;
