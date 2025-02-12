import { useState } from "react";
import { FaShoppingCart, FaSearch } from "react-icons/fa";
import "../styles/Navbar.css";
import Login from "./Auth/Login";
import Signup from "./Auth/Signup";

const Navbar: React.FC = () => {
  const [modalType, setModalType] = useState<"login" | "signup" | null>(null);

  return (
    <nav className="navbar">
      <div className="brand">
        <h1 className="shopkart-title">
          Shop<span>Kart</span>
        </h1>
      </div>
      <div className="search-container">
        <div className="search-bar">
          <input type="text" placeholder="Search for products" />
          <button aria-label="Search">
            <FaSearch />
          </button>
        </div>
      </div>
      <div className="nav-icons">
        <button type="button" title="Cart">
          <FaShoppingCart className="icon" />
        </button>
        <button onClick={() => setModalType("login")} className="login-btn">
          Login
        </button>
      </div>

      {modalType === "login" && (
        <Login
          onClose={() => setModalType(null)}
          onSwitch={() => setModalType("signup")}
        />
      )}
      {modalType === "signup" && (
        <Signup
          onClose={() => setModalType(null)}
          onSwitch={() => setModalType("login")}
        />
      )}
    </nav>
  );
};

export default Navbar;
