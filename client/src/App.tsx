import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import ProductList from "./pages/ProductList";
import Cart from "./pages/Cart";
import ProtectedRoute from "./routes/ProtectedRoute";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ShippingForm from "./pages/ShippingForm";
import OrderHistory from "./pages/OrderHistory";

function App() {
  const [searchQuery, setSearchQuery] = useState<string>("");
  return (
    <>
      <Navbar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

      <Routes>
        <Route path="/" element={<ProductList searchQuery={searchQuery} />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/cart" element={<Cart />} />
        </Route>
        <Route element={<ProtectedRoute />}>
          <Route path="/shipping" element={<ShippingForm />} />
        </Route>
        <Route element={<ProtectedRoute />}>
          <Route path="/order" element={<OrderHistory />} />
        </Route>
      </Routes>
      <Footer />
    </>
  );
}

export default App;
