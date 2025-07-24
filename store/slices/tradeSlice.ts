import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface TradeOrder {
  id: string;
  type: "buy" | "sell";
  orderType: "Limit" | "Market";
  price: number;
  shares: number;
  percent: number;
  timestamp: number;
  status: "open" | "cancelled";
}

interface TradeState {
  orders: TradeOrder[];
}

const initialState: TradeState = {
  orders: [],
};

const tradeSlice = createSlice({
  name: "trade",
  initialState,
  reducers: {
    placeTradeOrder(state, action: PayloadAction<Omit<TradeOrder, "status">>) {
      state.orders.push({
        ...action.payload,
        status: "open",
      });
    },

    cancelOrder(state, action: PayloadAction<string>) {
      const order = state.orders.find((o) => o.id === action.payload);
      if (order && order.status === "open") {
        order.status = "cancelled";
      }
    },

    cancelAllOrders(state) {
      state.orders = state.orders.map((order) =>
        order.status === "open" ? { ...order, status: "cancelled" } : order
      );
    },

    resetTradeState() {
      return initialState;
    },
  },
});

export const {
  placeTradeOrder,
  cancelOrder,
  cancelAllOrders,
  resetTradeState,
} = tradeSlice.actions;

export default tradeSlice.reducer;
