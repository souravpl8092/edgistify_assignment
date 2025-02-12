export interface Product {
  id: number;
  _id: string;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
  discountPercentage?: number;
  mrp?: number;
  youSave?: number;
  totalPages: number;
  quantity: number;
}

// ✅ Cart Product - A simplified version of `Product` for cart items
export interface CartProduct
  extends Pick<Product, "_id" | "title" | "price" | "image"> {
  productId: string;
  quantity: number;
}

// ✅ Cart State - Represents the cart in Redux
export interface CartState {
  _id: string;
  userId: string;
  products: CartProduct[];
  __v: number;
}

// ✅ Initial State
const initialState: CartState = {
  _id: "",
  userId: "",
  products: [],
  __v: 0,
};
