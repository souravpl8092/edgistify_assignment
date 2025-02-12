import React, { useState, useEffect } from "react";
import { fetchProducts } from "../api/productApi";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import {
  fetchCart,
  addToCart,
  removeFromCart,
  updateCartItemQuantity,
} from "../store/slices/cartSlice";
import { Product } from "../types/Product";
import "../styles/ProductList.css";

interface ProductListProps {
  searchQuery: string;
}

const ProductList: React.FC<ProductListProps> = ({ searchQuery }) => {
  const dispatch = useDispatch<AppDispatch>();
  const cart = useSelector((state: RootState) => state.cart);
  const cartItems = cart.products ?? [];
  const token = useSelector((state: RootState) => state.auth.token);
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isInitialLoading, setIsInitialLoading] = useState<boolean>(true);
  const productsPerPage = 20;

  useEffect(() => {
    if (token) {
      setIsInitialLoading(true);
      dispatch(fetchCart(token)).finally(() => setIsInitialLoading(false));
    } else {
      setIsInitialLoading(false);
    }
  }, [dispatch, token]);

  const formatPrice = (price: number) => {
    return `₹ ${price.toLocaleString("en-IN", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  };

  const getProducts = async () => {
    setError(null);
    try {
      const data = await fetchProducts(
        searchQuery,
        currentPage,
        productsPerPage
      );
      const updatedData = data.map((product) => {
        const priceMultiplied = product.price * 100;
        const discountPercentage = getRandomDiscount();
        const discountAmount = (priceMultiplied * discountPercentage) / 100;
        const mrp = priceMultiplied + discountAmount;
        const youSave = discountAmount;

        return {
          ...product,
          price: priceMultiplied,
          discountPercentage,
          mrp,
          youSave,
        };
      });

      setProducts(updatedData);
    } catch (error) {
      setError("Failed to fetch products.");
    }
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  useEffect(() => {
    if (token) {
      dispatch(fetchCart(token));
    }
  }, [dispatch, token]);

  useEffect(() => {
    getProducts();
  }, [searchQuery, currentPage]);

  // Function to generate a random discount
  const getRandomDiscount = (): number => {
    const discounts = [5, 10, 15, 20, 25, 30];
    return discounts[Math.floor(Math.random() * discounts.length)];
  };

  const handleAddToCart = (product: Product) => {
    if (!token) return alert("Please log in to add items to cart");
    const productData = {
      _id: product._id,
      productId: String(product._id),
      title: product.title,
      price: product.price,
      image: product.image,
      quantity: 1,
    };

    dispatch(addToCart({ token, product: productData }));
    dispatch(fetchCart(token));
  };

  const handleIncreaseQuantity = (product: Product) => {
    if (!token) return alert("Please log in to update cart items");

    const cartItem = cartItems.find((item) => item.productId === product._id);
    if (!cartItem) return;

    const updatedQuantity = cartItem.quantity + 1;

    dispatch(
      updateCartItemQuantity({
        token,
        productId: String(product._id),
        quantity: updatedQuantity,
      })
    ).then(() => dispatch(fetchCart(token)));
  };

  const handleDecreaseQuantity = (product: Product) => {
    if (!token) return alert("Please log in to update cart items");

    const cartItem = cartItems.find((item) => item.productId === product._id);
    if (!cartItem || cartItem.quantity === undefined) return;

    if (cartItem.quantity > 1) {
      const updatedQuantity = cartItem.quantity - 1;

      dispatch(
        updateCartItemQuantity({
          token,
          productId: String(product._id),
          quantity: updatedQuantity,
        })
      ).then(() => dispatch(fetchCart(token)));
    } else {
      dispatch(removeFromCart({ token, productId: String(product._id) })).then(
        () => dispatch(fetchCart(token))
      );
    }
  };

  return (
    <div className="product-list-container">
      <div className="content">
        {isInitialLoading && (
          <div className="loader-container">
            <div className="loader"></div>
          </div>
        )}
        {error && <p className="error">{error}</p>}
        <main className="product-list">
          {products.map((product) => {
            const cartItem = Array.isArray(cartItems)
              ? cartItems.find((item) => item.productId === product._id)
              : undefined;
            const quantity = cartItem ? cartItem.quantity : 0;

            return (
              <div key={product.id} className="product-card">
                <img src={product.image} alt={product.title} />
                <h2 className="product-title">{product.title}</h2>
                <div className="pricing-container">
                  <p className="deal-price">
                    Deal Price: <strong> {formatPrice(product.price)}</strong>
                  </p>
                  <p className="mrp">
                    MRP:{" "}
                    <span className="strike">
                      {formatPrice(product.mrp ?? 0)}
                    </span>
                  </p>
                  <p className="you-save">
                    You Save: {formatPrice(product.youSave ?? 0)} (
                    {product.discountPercentage}%)
                  </p>
                  <p className="you-save">
                    Total Stock: {product.quantity} units
                  </p>
                  <p className="rating">
                    {Array(5)
                      .fill("")
                      .map((_, i) => (
                        <span
                          key={i}
                          className="star"
                          style={{
                            color:
                              i < Math.round(product.rating.rate)
                                ? "#ffcc00"
                                : "#ddd",
                          }}
                        >
                          ★
                        </span>
                      ))}{" "}
                    ({product.rating.count} reviews)
                  </p>
                </div>
                {quantity > 0 ? (
                  <div className="cart-quantity">
                    <button
                      className="quantity-btn"
                      onClick={() => handleDecreaseQuantity(product)}
                    >
                      ➖
                    </button>
                    <span className="quantity">{quantity}</span>
                    <button
                      className="quantity-btn"
                      onClick={() => handleIncreaseQuantity(product)}
                    >
                      ➕
                    </button>
                  </div>
                ) : (
                  <button
                    className="add-to-cart-btn"
                    onClick={() => handleAddToCart(product)}
                  >
                    Add to Cart
                  </button>
                )}
              </div>
            );
          })}
        </main>
      </div>
    </div>
  );
};

export default ProductList;
