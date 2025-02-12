import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  fetchCartAPI,
  addToCartAPI,
  updateCartItemAPI,
  removeFromCartAPI,
  clearCartAPI,
} from "../../api/cartApi";
import { toast } from "react-toastify";

interface CartProduct {
  productId: string;
  title: string;
  price: number;
  image: string;
  quantity: number;
  _id: string;
}

interface CartState {
  _id: string;
  userId: string;
  products: CartProduct[];
  __v: number;
  loading: boolean;
  error: string | null;
}

const initialState: CartState = {
  _id: "",
  userId: "",
  products: [],
  __v: 0,
  loading: false,
  error: null,
};

// ✅ Fetch Cart
export const fetchCart = createAsyncThunk(
  "cart/fetchCart",
  async (token: string, { rejectWithValue }) => {
    try {
      return await fetchCartAPI(token);
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Failed to fetch cart");
    }
  }
);

// ✅ Add to Cart
export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async (
    { token, product }: { token: string; product: CartProduct },
    { rejectWithValue }
  ) => {
    try {
      const response = await addToCartAPI(token, product);
      toast.success("Item added to cart!");
      return response;
    } catch (error: any) {
      toast.error("Failed to add item to cart.");
      return rejectWithValue(error.response?.data || "Failed to add item");
    }
  }
);

// ✅ Update Cart Item Quantity
export const updateCartItemQuantity = createAsyncThunk(
  "cart/updateCartItemQuantity",
  async (
    {
      token,
      productId,
      quantity,
    }: { token: string; productId: string; quantity: number },
    { rejectWithValue }
  ) => {
    try {
      return await updateCartItemAPI(token, productId, quantity);
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data || "Failed to update quantity"
      );
    }
  }
);

// ✅ Remove Item from Cart
export const removeFromCart = createAsyncThunk(
  "cart/removeFromCart",
  async (
    { token, productId }: { token: string; productId: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await removeFromCartAPI(token, productId);
      toast.success("Item removed from cart!");
      return response;
    } catch (error: any) {
      toast.error("Failed to remove item.");
      return rejectWithValue(error.response?.data || "Failed to remove item");
    }
  }
);

// ✅ Clear Cart
export const clearCart = createAsyncThunk(
  "cart/clearCart",
  async (token: string, { rejectWithValue }) => {
    try {
      const response = await clearCartAPI(token);
      toast.success("Cart cleared successfully!");
      return response;
    } catch (error: any) {
      toast.error("Failed to clear cart.");
      return rejectWithValue(error.response?.data || "Failed to clear cart");
    }
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // ✅ Fetch Cart
      .addCase(fetchCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        return { ...state, ...action.payload, loading: false };
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // ✅ Add to Cart
      .addCase(addToCart.pending, (state) => {
        state.loading = true;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        return { ...state, ...action.payload, loading: false };
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // ✅ Update Item Quantity
      .addCase(updateCartItemQuantity.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateCartItemQuantity.fulfilled, (state, action) => {
        return { ...state, ...action.payload, loading: false };
      })
      .addCase(updateCartItemQuantity.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // ✅ Remove Item from Cart
      .addCase(removeFromCart.pending, (state) => {
        state.loading = true;
      })
      .addCase(removeFromCart.fulfilled, (state, action) => {
        return { ...state, ...action.payload, loading: false };
      })
      .addCase(removeFromCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // ✅ Clear Cart
      .addCase(clearCart.pending, (state) => {
        state.loading = true;
      })
      .addCase(clearCart.fulfilled, () => {
        return {
          _id: "",
          userId: "",
          products: [],
          __v: 0,
          loading: false,
          error: null,
        };
      })
      .addCase(clearCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default cartSlice.reducer;
