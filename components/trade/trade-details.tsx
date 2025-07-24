import React from "react";
import SegmentedControl from "../global/segmented-control";
import OpenOrders from "./open-orders";

const TradeDetails = () => {
  return (
    <div>
      <div className="py-2 border-t-2">
        <SegmentedControl variant={2} tabItems={TRADE_DETAILS_ITEMS} />
      </div>
    </div>
  );
};

const TRADE_DETAILS_ITEMS = [
  {
    value: "open-orders",
    label: "OPEN ORDERS",
    contentElement: <OpenOrders />,
  },
  {
    value: "positions",
    label: "POSITIONS",
    contentElement: (
      <p className="text-center py-6 text-muted-foreground">
        No open positions found.
      </p>
    ),
  },
  {
    value: "trade-history",
    label: "TRADE HISTORY",
    contentElement: (
      <p className="text-center py-6 text-muted-foreground">
        No trade history found.
      </p>
    ),
  },
];

export default TradeDetails;
