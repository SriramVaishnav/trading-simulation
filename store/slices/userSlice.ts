import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Order {
  id: string;
  price: number;
  shares: number;
  side: "buy" | "sell";
  status: "open" | "cancelled";
  createdAt: string;
}

interface Position {
  id: string;
  shares: number;
  avgPrice: number;
  createdAt: string;
}

interface UserState {
  balance: number;
  openOrders: Order[];
  positions: Position[];
}

const initialState: UserState = {
  balance: 100,
  openOrders: [],
  positions: [],
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    placeOrder(
      state,
      action: PayloadAction<Omit<Order, "status" | "createdAt">>
    ) {
      const newOrder: Order = {
        ...action.payload,
        status: "open",
        createdAt: new Date().toISOString(),
      };
      state.openOrders.push(newOrder);
    },

    cancelOrder(state, action: PayloadAction<string>) {
      const orderId = action.payload;
      const order = state.openOrders.find((o) => o.id === orderId);
      if (order) {
        order.status = "cancelled";
      }
    },

    depositFunds(state, action: PayloadAction<number>) {
      state.balance += action.payload;
    },

    resetUserState() {
      return initialState;
    },
  },
});

export const { placeOrder, cancelOrder, depositFunds, resetUserState } =
  userSlice.actions;

export default userSlice.reducer;
