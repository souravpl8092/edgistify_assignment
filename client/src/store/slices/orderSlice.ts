import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { placeOrder, fetchOrderHistory } from "../../api/orderService";

interface IProduct {
  productId: string;
  quantity: number;
  price: number;
  title: string;
  image: string;
}

interface IOrder {
  _id: string;
  orderId: string;
  userId: string;
  products: IProduct[];
  totalPrice: number;
  shippingAddress: string;
  paymentStatus: "Pending" | "Paid" | "Failed";
  orderStatus: "Pending" | "Processing" | "Shipped" | "Delivered";
  date: string;
}

interface OrderState {
  loading: boolean;
  error: string | null;
  orderHistory: IOrder[];
}

const initialState: OrderState = {
  loading: false,
  error: null,
  orderHistory: [],
};

// Async thunk to place an order
export const createOrder = createAsyncThunk(
  "order/place",
  async (
    orderDetails: {
      token?: string;
      shippingAddress: string;
      products: IProduct[];
    },
    { rejectWithValue, dispatch }
  ) => {
    try {
      const { token, shippingAddress, products } = orderDetails;
      const newOrder = await placeOrder({ shippingAddress, products }, token);

      // Simulate status updates
      setTimeout(() => {
        dispatch(
          updateOrderStatus({ orderId: newOrder.orderId, status: "Shipped" })
        );
      }, 120000);

      setTimeout(() => {
        dispatch(
          updateOrderStatus({ orderId: newOrder.orderId, status: "Delivered" })
        );
      }, 240000);

      return newOrder;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Failed to place order");
    }
  }
);

// Fetch order history
export const getOrderHistory = createAsyncThunk(
  "order/history",
  async ({ token }: { token?: string }, { rejectWithValue }) => {
    try {
      return await fetchOrderHistory(token);
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Failed to fetch orders");
    }
  }
);

// Slice
const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    updateOrderStatus: (state, action) => {
      const { orderId, status } = action.payload;
      const order = state.orderHistory.find((o) => o.orderId === orderId);
      if (order) order.orderStatus = status;
    },
  },
  extraReducers: (builder) => {
    builder
      // Handle Create Order
      .addCase(createOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.orderHistory.unshift(action.payload);
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Handle Get Order History
      .addCase(getOrderHistory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getOrderHistory.fulfilled, (state, action) => {
        state.loading = false;
        state.orderHistory = action.payload;
      })
      .addCase(getOrderHistory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { updateOrderStatus } = orderSlice.actions;
export default orderSlice.reducer;
