import axios from "axios";

const apiUrl = process.env.REACT_APP_API_URL;

export const placeOrder = async (
  orderData: { shippingAddress: string; products: any[] },
  token?: string
) => {
  try {
    const response = await axios.post(`${apiUrl}/api/order`, orderData, {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    });
    return response.data;
  } catch (error) {
    console.error("Error placing order:", error);
    throw error;
  }
};

export const fetchOrderHistory = async (token?: string) => {
  try {
    const response = await axios.get(`${apiUrl}/api/order`, {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching order history:", error);
    throw error;
  }
};
