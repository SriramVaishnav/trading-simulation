import { createSlice } from "@reduxjs/toolkit";

type Order = {
  price: number;
  volume: number;
};

interface OrderBookState {
  currentPrice: number;
  buyOrders: Order[];
  sellOrders: Order[];
}

const initialState: OrderBookState = {
  currentPrice: 34.5,
  buyOrders: [
    { price: 34, volume: 14984 },
    { price: 33.5, volume: 14984 },
    { price: 33.4, volume: 14984 },
    { price: 32, volume: 14984 },
    { price: 30, volume: 14984 },
  ],
  sellOrders: [
    { price: 35, volume: 14984 },
    { price: 35.6, volume: 14984 },
    { price: 36, volume: 14984 },
    { price: 37, volume: 14984 },
    { price: 38, volume: 14984 },
  ],
};

const orderBookSlice = createSlice({
  name: "orderBook",
  initialState,
  reducers: {
    simulatePriceTick(state) {
      const change = (Math.random() - 0.5) * 0.5; // -0.25 to +0.25
      const newPrice = Math.max(
        30,
        parseFloat((state.currentPrice + change).toFixed(2))
      );

      state.currentPrice = newPrice;

      state.buyOrders = state.buyOrders.map((order) => ({
        ...order,
        volume: Math.round(14000 + Math.random() * 2000),
      }));

      state.sellOrders = state.sellOrders.map((order) => ({
        ...order,
        volume: Math.round(14000 + Math.random() * 2000),
      }));
    },
  },
});

export const { simulatePriceTick } = orderBookSlice.actions;
export default orderBookSlice.reducer;
