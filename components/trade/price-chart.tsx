"use client";

import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

export default function PriceChart() {
  const { currentPrice, buyOrders, sellOrders } = useSelector(
    (state: RootState) => state.orderBook
  );

  const sortedSell = [...sellOrders].sort((a, b) => b.price - a.price);
  const sortedBuy = [...buyOrders].sort((a, b) => b.price - a.price);

  const data = [
    ...sortedSell.map((order) => ({
      price: order.price,
      shares: order.volume,
      type: "sell" as const,
    })),
    { price: currentPrice, shares: 0, type: "mid" as const },
    ...sortedBuy.map((order) => ({
      price: order.price,
      shares: order.volume,
      type: "buy" as const,
    })),
  ];

  const midPrice = currentPrice;

  const sellDiffs = data
    .filter((d) => d.type === "sell")
    .map((d) => d.price - midPrice);
  const buyDiffs = data
    .filter((d) => d.type === "buy")
    .map((d) => midPrice - d.price);

  const maxSellDiff = Math.max(...sellDiffs, 1);
  const maxBuyDiff = Math.max(...buyDiffs, 1);

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="flex justify-between text-sm font-semibold mb-2">
        <span>Price</span>
        <span>Shares (CSK)</span>
      </div>

      <div className="space-y-2">
        {data.map((entry, index) => {
          const isMid = entry.type === "mid";
          const isBuy = entry.type === "buy";
          const isSell = entry.type === "sell";

          let widthPercent = 0;
          if (isBuy) {
            const diff = midPrice - entry.price;
            widthPercent = (diff / maxBuyDiff) * 100;
          } else if (isSell) {
            const diff = entry.price - midPrice;
            widthPercent = (diff / maxSellDiff) * 100;
          }

          const barColor = isMid ? "#000" : isBuy ? "#06A9001A" : "#A900221A";

          return (
            <div key={index} className="relative flex items-center h-[22px]">
              <div
                className="h-full rounded-r"
                style={{
                  width: `${widthPercent}%`,
                  backgroundColor: barColor,
                }}
              ></div>

              <div
                className="absolute left-2 text-sm"
                style={{
                  fontWeight: isMid ? "bold" : "normal",
                  color: isMid ? "#000" : "#444",
                }}
              >
                {entry.price.toFixed(1)}¢
              </div>

              <div className="absolute right-2 text-sm text-gray-700">
                {isMid ? "(Spread 1%)" : entry.shares.toLocaleString()}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
