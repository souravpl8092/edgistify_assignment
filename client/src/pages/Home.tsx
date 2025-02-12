import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../styles/Home.css";

const Home: React.FC = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<any[]>([
    {
      id: 1,
      title: "Essence Mascara Lash Princess",
      description:
        "The Essence Mascara Lash Princess is a popular mascara known for its volumizing and lengthening effects. Achieve dramatic lashes with this long-lasting and cruelty-free formula.",
      category: "beauty",
      price: 9.99,
      discountPercentage: 7.17,
      rating: 4.94,
      stock: 5,
      tags: ["beauty", "mascara"],
      brand: "Essence",
      sku: "RCH45Q1A",
      weight: 2,
      dimensions: {
        width: 23.17,
        height: 14.43,
        depth: 28.01,
      },
      warrantyInformation: "1 month warranty",
      shippingInformation: "Ships in 1 month",
      availabilityStatus: "Low Stock",
      reviews: [
        {
          rating: 2,
          comment: "Very unhappy with my purchase!",
          date: "2024-05-23T08:56:21.618Z",
          reviewerName: "John Doe",
          reviewerEmail: "john.doe@x.dummyjson.com",
        },
        {
          rating: 2,
          comment: "Not as described!",
          date: "2024-05-23T08:56:21.618Z",
          reviewerName: "Nolan Gonzalez",
          reviewerEmail: "nolan.gonzalez@x.dummyjson.com",
        },
        {
          rating: 5,
          comment: "Very satisfied!",
          date: "2024-05-23T08:56:21.618Z",
          reviewerName: "Scarlett Wright",
          reviewerEmail: "scarlett.wright@x.dummyjson.com",
        },
      ],
      returnPolicy: "30 days return policy",
      minimumOrderQuantity: 24,
      meta: {
        createdAt: "2024-05-23T08:56:21.618Z",
        updatedAt: "2024-05-23T08:56:21.618Z",
        barcode: "9164035109868",
        qrCode: "https://assets.dummyjson.com/public/qr-code.png",
      },
      images: [
        "https://cdn.dummyjson.com/products/images/beauty/Essence%20Mascara%20Lash%20Princess/1.png",
      ],
      thumbnail:
        "https://cdn.dummyjson.com/products/images/beauty/Essence%20Mascara%20Lash%20Princess/thumbnail.png",
    },
    {
      id: 2,
      title: "Eyeshadow Palette with Mirror",
      description:
        "The Eyeshadow Palette with Mirror offers a versatile range of eyeshadow shades for creating stunning eye looks. With a built-in mirror, it's convenient for on-the-go makeup application.",
      category: "beauty",
      price: 19.99,
      discountPercentage: 5.5,
      rating: 3.28,
      stock: 44,
      tags: ["beauty", "eyeshadow"],
      brand: "Glamour Beauty",
      sku: "MVCFH27F",
      weight: 3,
      dimensions: {
        width: 12.42,
        height: 8.63,
        depth: 29.13,
      },
      warrantyInformation: "1 year warranty",
      shippingInformation: "Ships in 2 weeks",
      availabilityStatus: "In Stock",
      reviews: [
        {
          rating: 4,
          comment: "Very satisfied!",
          date: "2024-05-23T08:56:21.618Z",
          reviewerName: "Liam Garcia",
          reviewerEmail: "liam.garcia@x.dummyjson.com",
        },
        {
          rating: 1,
          comment: "Very disappointed!",
          date: "2024-05-23T08:56:21.618Z",
          reviewerName: "Nora Russell",
          reviewerEmail: "nora.russell@x.dummyjson.com",
        },
        {
          rating: 5,
          comment: "Highly impressed!",
          date: "2024-05-23T08:56:21.618Z",
          reviewerName: "Elena Baker",
          reviewerEmail: "elena.baker@x.dummyjson.com",
        },
      ],
      returnPolicy: "30 days return policy",
      minimumOrderQuantity: 32,
      meta: {
        createdAt: "2024-05-23T08:56:21.618Z",
        updatedAt: "2024-05-23T08:56:21.618Z",
        barcode: "2817839095220",
        qrCode: "https://assets.dummyjson.com/public/qr-code.png",
      },
      images: [
        "https://cdn.dummyjson.com/products/images/beauty/Eyeshadow%20Palette%20with%20Mirror/1.png",
      ],
      thumbnail:
        "https://cdn.dummyjson.com/products/images/beauty/Eyeshadow%20Palette%20with%20Mirror/thumbnail.png",
    },
  ]);
  const [filter, setFilter] = useState("");
  const [page, setPage] = useState(1);
  const cart = useSelector((state: any) => state.cart);

  useEffect(() => {
    console.log("filteredProducts :", filteredProducts);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [page]);

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop >=
      document.documentElement.offsetHeight - 50
    ) {
      setPage((prev) => prev + 1);
    }
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(e.target.value);
    setFilteredProducts(
      products.filter((product) =>
        product.brand.toLowerCase().includes(e.target.value.toLowerCase())
      )
    );
  };

  return (
    <div className="container">
      {/*  <nav className="navbar">
        <h1>Mobile Store</h1>
        <div className="user-info">
          <span>Username</span>
          <button>Logout</button>
        </div>
      </nav> */}
      <Navbar />
      <div className="content">
        {/* <aside className="sidebar">
          <h3>Filter</h3>
          <input
            type="text"
            placeholder="Search by brand"
            value={filter}
            onChange={handleFilterChange}
          />
        </aside> */}
        <main className="product-list">
          {filteredProducts.map((product) => {
            const mrp = (
              product.price /
              (1 - product.discountPercentage / 100)
            ).toFixed(2);
            const youSave = (parseFloat(mrp) - product.price).toFixed(2);
            const randomRatingCount = Math.floor(Math.random() * 500) + 1;
            return (
              <div key={product.id} className="product-card">
                <img src={product.images[0]} alt={product.title} />
                <h2 className="product-title">{product.title}</h2>
                {/* <p>{product.description}</p>
                <p>Brand: {product.brand}</p> */}
                <div className="pricing-container">
                  <p className="deal-price">
                    Deal Price: <strong>₹ {product.price}</strong>
                  </p>
                  <p className="mrp">
                    MRP: <span className="strike">₹ {mrp}</span>
                  </p>
                  <p className="you-save">
                    You Save: ₹ {youSave} ({product.discountPercentage}%)
                  </p>
                  <p className="rating">
                    {"⭐".repeat(Math.round(product.rating))} (
                    {randomRatingCount} reviews)
                  </p>
                </div>
                <button>Add to Cart</button>
              </div>
            );
          })}
        </main>
      </div>
      <Footer />
      {/* <footer className="footer">&copy; 2025 Mobile Store</footer> */}
    </div>
  );
};

export default Home;
