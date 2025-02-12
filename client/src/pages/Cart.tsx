import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../store/store";
import {
  fetchCart,
  removeFromCart,
  clearCart,
  updateCartItemQuantity,
} from "../store/slices/cartSlice";
import "../styles/Cart.css";
import { useNavigate } from "react-router-dom";

const getRandomDeliveryDate = () => {
  const days = [2, 4, 3, 5, 6];
  const randomDay = days[Math.floor(Math.random() * days.length)];
  return `Estimated Delivery: ${randomDay} days`;
};

const formatPrice = (price: number) => {
  return `₹ ${price.toLocaleString("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
};

const Cart: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { products: cartItems, loading } = useSelector(
    (state: RootState) => state.cart
  );
  const token = useSelector((state: RootState) => state.auth.token);

  useEffect(() => {
    if (token) {
      dispatch(fetchCart(token));
    }
  }, [dispatch, token]);

  const handleRemove = (productId: string) => {
    if (token) {
      dispatch(removeFromCart({ token, productId }))
        .unwrap()
        .then(() => {
          dispatch(fetchCart(token));
        })
        .catch(() => {
          console.error("Failed to remove item.");
        });
    }
  };

  const handleClearCart = () => {
    if (token) {
      dispatch(clearCart(token)).unwrap();
    }
  };

  const handleQuantityChange = (productId: string, quantity: number) => {
    if (token) {
      dispatch(updateCartItemQuantity({ token, productId, quantity }));
    }
  };

  const totalPrice = cartItems
    ? cartItems.reduce((total, item) => total + item.price * item.quantity, 0)
    : 0;

  return (
    <>
      <h2 className="cart-title">Shopping Cart 🛒</h2>

      {/* 🔄 Show Loading Spinner */}
      {loading && (
        <div className="spinner-container">
          <div className="spinner"></div>
        </div>
      )}

      {!cartItems || cartItems.length === 0 ? (
        <p
          className={
            !cartItems || cartItems.length === 0 ? "empty-cart" : "full-cart"
          }
        >
          Your cart is empty.
        </p>
      ) : (
        <div className="cart-container">
          <div className="cart-content">
            <div className="cart-layout">
              <div className="cart-items-section">
                {cartItems.map((item) => (
                  <div key={item.productId} className="cart-item">
                    <div className="cart-item-details">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="cart-item-image"
                      />
                      <div>
                        <h3 className="cart-item-title">{item.title}</h3>

                        <p className="cart-item-price">
                          Offer Price: {formatPrice(item.price)}
                        </p>
                        <p className="cart-item-quantity">
                          Qty:
                          <button
                            onClick={() =>
                              handleQuantityChange(
                                item.productId,
                                item.quantity - 1
                              )
                            }
                          >
                            ➖
                          </button>
                          <span className="quantity">{item.quantity}</span>
                          <button
                            onClick={() =>
                              handleQuantityChange(
                                item.productId,
                                item.quantity + 1
                              )
                            }
                          >
                            ➕
                          </button>
                        </p>
                        <p className="cart-item-delivery">
                          {getRandomDeliveryDate()}
                        </p>
                      </div>
                    </div>
                    <button
                      className="remove-button"
                      onClick={() => handleRemove(item.productId)}
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
              <div className="cart-summary">
                <h3>Price Details</h3>
                <p>Product Value: {formatPrice(totalPrice)}</p>
                <p>
                  Quantity:{" "}
                  {cartItems.reduce((acc, item) => acc + item.quantity, 0)}
                </p>
                <h3>Total: {formatPrice(totalPrice)}</h3>
                <button
                  className="checkout-button"
                  onClick={() => navigate("/shipping")}
                >
                  Proceed to Checkout
                </button>
                <button className="clear-cart-button" onClick={handleClearCart}>
                  Clear Cart 🗑️
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Cart;
