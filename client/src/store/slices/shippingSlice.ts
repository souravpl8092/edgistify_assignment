import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ShippingState {
  address: string;
  city: string;
  state: string;
  zipCode: string;
  landmark?: string;
  country: string;
  isValid: boolean;
}

const initialState: ShippingState = {
  address: "",
  city: "",
  state: "",
  zipCode: "",
  landmark: "",
  country: "",
  isValid: false,
};

const shippingSlice = createSlice({
  name: "shipping",
  initialState,
  reducers: {
    updateField: (
      state,
      action: PayloadAction<{
        field: keyof Omit<ShippingState, "isValid">;
        value: string;
      }>
    ) => {
      (state[action.payload.field] as string) = action.payload.value; // Explicitly typecasting
      state.isValid = !!(
        state.address &&
        state.city &&
        state.state &&
        state.zipCode &&
        state.country
      );
    },
    resetShipping: () => initialState, // Reset all fields to initial state
  },
});

export const { updateField, resetShipping } = shippingSlice.actions;
export default shippingSlice.reducer;
