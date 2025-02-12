import axios from "axios";

const apiUrl = process.env.REACT_APP_API_URL;

// ✅ Fetch Cart
export const fetchCartAPI = async (token: string) => {
  const response = await axios.get(`${apiUrl}/api/cart`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

// ✅ Add Item to Cart
export const addToCartAPI = async (token: string, product: any) => {
  const response = await axios.post(`${apiUrl}/api/cart`, product, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  return response.data;
};

// ✅ Update Cart Item Quantity
export const updateCartItemAPI = async (
  token: string,
  productId: string,
  quantity: number
) => {
  const response = await axios.patch(
    `${apiUrl}/api/cart`,
    { quantity, productId },
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );
  return response.data;
};

// ✅ Remove Item from Cart
export const removeFromCartAPI = async (token: string, productId: string) => {
  const response = await axios.delete(`${apiUrl}/api/cart/${productId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

// ✅ Clear Cart
export const clearCartAPI = async (token: string) => {
  const response = await axios.delete(`${apiUrl}/api/cart`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};
