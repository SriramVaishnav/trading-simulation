"use client";
import React from "react";

const data = [
  { price: 38, shares: 14984, type: "sell" },
  { price: 37, shares: 14984, type: "sell" },
  { price: 36, shares: 14984, type: "sell" },
  { price: 35.6, shares: 14984, type: "sell" },
  { price: 35, shares: 14984, type: "sell" },
  { price: 34.5, shares: 14984, type: "mid" },
  { price: 34, shares: 14984, type: "buy" },
  { price: 33.5, shares: 14984, type: "buy" },
  { price: 33.4, shares: 14984, type: "buy" },
  { price: 32, shares: 14984, type: "buy" },
  { price: 30, shares: 14984, type: "buy" },
];

export default function PriceChart() {
  const midPrice = 34.5;

  const maxSellDiff = Math.max(
    ...data.filter((d) => d.type === "sell").map((d) => d.price - midPrice)
  );
  const maxBuyDiff = Math.max(
    ...data.filter((d) => d.type === "buy").map((d) => midPrice - d.price)
  );

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
