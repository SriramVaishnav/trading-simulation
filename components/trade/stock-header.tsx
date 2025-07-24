"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { BarChartSvg } from "@/lib/svgs";

export default function StockHeader() {
  const currentPrice = useSelector(
    (state: RootState) => state.orderBook.currentPrice
  );

  const [previousPrice, setPreviousPrice] = useState(currentPrice);

  useEffect(() => {
    const interval = setInterval(() => {
      setPreviousPrice((_prev) => currentPrice);
    }, 1000);
    return () => clearInterval(interval);
  }, [currentPrice]);

  const priceChange = currentPrice - previousPrice;
  const priceChangePercent = ((priceChange / previousPrice) * 100).toFixed(2);
  const isPositive = priceChange >= 0;

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-x-3">
        <Image
          src="/images/csk-logo.png"
          width={48}
          height={48}
          alt="csk-logo"
        />
        <div>
          <h1 className="text-lg font-bold">Chennai Super Kings</h1>
          <p className="text-sm text-gray-500">$65.2M Vol.</p>
        </div>
      </div>

      <div className="flex items-center gap-x-1">
        <div className="text-right">
          <p className="text-lg font-bold">{currentPrice.toFixed(2)}¢</p>
          <p
            className={`text-sm ${
              isPositive ? "text-green-600" : "text-red-600"
            }`}
          >
            {isPositive ? "+" : ""}
            {priceChangePercent}%
          </p>
        </div>
        <BarChartSvg />
      </div>
    </div>
  );
}
