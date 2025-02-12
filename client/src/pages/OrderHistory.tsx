import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { getOrderHistory } from "../store/slices/orderSlice";
import "../styles/OrderHistory.css";

interface Product {
  productId: string;
  title: string;
  image: string;
  quantity: number;
  price: number;
}

interface Order {
  _id: string;
  orderId: string;
  shippingAddress: string;
  totalPrice: number;
  paymentStatus: "Pending" | "Paid" | "Failed";
  orderStatus: "Pending" | "Processing" | "Shipped" | "Delivered";
  date: string;
  products: Product[];
}

const OrderHistory: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { orderHistory, loading } = useSelector(
    (state: RootState) => state.order
  );
  const token = localStorage.getItem("token") || undefined;

  useEffect(() => {
    dispatch(getOrderHistory({ token }));
  }, [dispatch, token]);

  const formatPrice = (price: number) => {
    return ` ₹ ${price.toLocaleString("en-IN", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  };

  const convertToDateFormat = (utcTimestamp: string): string => {
    const date = new Date(utcTimestamp);
    return date.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  return (
    <div className="order-history-container">
      <h2>📦 Order History</h2>

      {/* Loading Indicator */}
      {loading && (
        <div className="loading">
          <span className="spinner"></span> Fetching orders...
        </div>
      )}

      {/* No Orders Found */}
      {!loading && orderHistory.length === 0 && (
        <p className="empty-message">No orders placed yet.</p>
      )}

      {/* Orders List */}
      {!loading && orderHistory.length > 0 && (
        <div className="order-list">
          {orderHistory.map((order: Order) => {
            if (!order.products || order.products.length === 0) {
              return null; // Skip rendering if no products in order
            }
            const firstProduct = order.products[0];

            return (
              <div className="order-card" key={order._id}>
                <img src={firstProduct.image} alt={firstProduct.title} />
                <div className="order-details">
                  <h3>{firstProduct.title}</h3>
                  <p>
                    <strong>Order ID:</strong> {order.orderId}
                  </p>
                  <p>
                    <strong>Quantity:</strong> {firstProduct.quantity}
                  </p>
                  <p>
                    <strong>Price:</strong> {formatPrice(firstProduct.price)}
                  </p>
                  <p>
                    <strong>Total Price:</strong>{" "}
                    {formatPrice(order.totalPrice)}
                  </p>
                  <p>
                    <strong>Shipping Address:</strong> {order.shippingAddress}
                  </p>
                  <p>
                    <strong>Payment Status:</strong> {order.paymentStatus}
                  </p>
                </div>
                <div className="status-section">
                  <p className="order-date">
                    📅 <strong>Date:</strong> {convertToDateFormat(order.date)}
                  </p>
                  <p>
                    <strong>Order Status:</strong> {order.orderStatus}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default OrderHistory;
