"use client";

import React from "react";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { cancelAllOrders, cancelOrder } from "@/store/slices/tradeSlice";
import { Checkbox } from "../ui/checkbox";
import { Button } from "../ui/button";
import { format } from "date-fns";
import { toast } from "sonner";

const OpenOrders = () => {
  const orders = useAppSelector((state) =>
    state.trade.orders.filter((order) => order.status === "open")
  );
  const dispatch = useAppDispatch();

  if (orders.length === 0) {
    return (
      <p className="text-center py-6 text-muted-foreground">
        No open orders found.
      </p>
    );
  }

  return (
    <div className="border-t-2 w-full">
      <div className="py-2 flex items-center justify-between border-b">
        <div className="flex items-center gap-x-2">
          <Checkbox />
          <p className="#858585 text-sm">Hide Other Pairs</p>
        </div>
        <Button
          variant="secondary"
          onClick={() => {
            dispatch(cancelAllOrders());
            toast.info("All Orders were cancelled");
          }}
        >
          Cancel All
        </Button>
      </div>

      {orders.map((order) => (
        <div key={order.id} className="py-3 border-b">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <p>CSK / IPL Winner</p>
              <p className="text-sm text-green-700">
                {order.orderType} / {order.type.toUpperCase()}{" "}
                <span className="text-xs text-[#858585]">
                  {format(order.timestamp, "yyyy-MM-dd HH:mm:ss")}
                </span>
              </p>
            </div>
            <div className="flex items-center gap-x-2">
              <div className="space-y-1">
                <p className="text-sm text-center">{order.percent}%</p>
                <div className="h-1 w-11 bg-purple-100 rounded-3xl" />
              </div>
              <Button
                variant="secondary"
                onClick={() => {
                  dispatch(cancelOrder(order.id));
                  toast.info("Order Cancelled");
                }}
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default OpenOrders;
