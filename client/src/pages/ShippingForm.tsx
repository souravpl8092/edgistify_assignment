import React from "react";
import { useSelector } from "react-redux";
import { updateField } from "../store/slices/shippingSlice";
import { createOrder } from "../store/slices/orderSlice";
import { RootState, AppDispatch } from "../store/store";
import { useDispatch as useAppDispatch } from "react-redux";
import { clearCart } from "../store/slices/cartSlice";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { resetShipping } from "../store/slices/shippingSlice";
import "../styles/ShippingForm.css";

const ShippingForm: React.FC = () => {
  const dispatch = useAppDispatch<AppDispatch>();
  const navigate = useNavigate();
  const token = useSelector((state: RootState) => state.auth.token);
  const { address, city, state, zipCode, landmark, country, isValid } =
    useSelector((state: RootState) => state.shipping);

  const cart = useSelector((state: RootState) => state.cart);
  const cartItems = cart.products ?? [];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(
      updateField({ field: e.target.name as any, value: e.target.value })
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const orderData = {
        shippingAddress: `${address}, ${city}, ${state}, ${zipCode}, ${country}`,
        products: cartItems,
        token: token || "",
      };

      const resultAction = await dispatch(createOrder(orderData));

      if (createOrder.fulfilled.match(resultAction)) {
        toast.success("🎉 Order placed successfully!", {
          position: "top-right",
        });

        if (token) {
          dispatch(clearCart(token));
        }

        // Clear shipping form fields after 2 seconds
        setTimeout(() => {
          dispatch(resetShipping());
        }, 2000);

        // Redirect to order history after 1 second
        setTimeout(() => navigate("/order"), 500);
      } else if (createOrder.rejected.match(resultAction)) {
        toast.error("❌ Order creation failed. Please try again.", {
          position: "top-right",
        });
        console.error("Order creation failed:", resultAction.error);
      }
    } catch (error) {
      toast.error("❌ An error occurred while placing the order.", {
        position: "top-right",
      });
      console.error("Error submitting order:", error);
    }
  };

  return (
    <div className="shipping-form-container">
      <h2 className="form-title">Shipping Address 🚚</h2>
      <form onSubmit={handleSubmit} className="shipping-form">
        <div className="form-grid">
          <div className="form-group">
            <label htmlFor="address">Address</label>
            <input
              id="address"
              className="form-input"
              name="address"
              value={address}
              onChange={handleChange}
              placeholder="Enter your address"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="city">City</label>
            <input
              id="city"
              className="form-input"
              name="city"
              value={city}
              onChange={handleChange}
              placeholder="Enter your city"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="state">State</label>
            <input
              id="state"
              className="form-input"
              name="state"
              value={state}
              onChange={handleChange}
              placeholder="Enter your state"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="zipCode">Zip Code</label>
            <input
              id="zipCode"
              className="form-input"
              name="zipCode"
              value={zipCode}
              onChange={handleChange}
              placeholder="Enter your zip code"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="country">Country</label>
            <input
              id="country"
              className="form-input"
              name="country"
              value={country}
              onChange={handleChange}
              placeholder="Enter your country"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="landmark">Landmark</label>
            <input
              id="landmark"
              className="form-input"
              name="landmark"
              value={landmark}
              onChange={handleChange}
              placeholder="Enter a landmark (Optional)"
            />
          </div>
        </div>

        <button type="submit" className="submit-button" disabled={!isValid}>
          Place Order
        </button>
      </form>
    </div>
  );
};

export default ShippingForm;
