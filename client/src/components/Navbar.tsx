import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  FaShoppingCart,
  FaUser,
  FaSignOutAlt,
  FaBoxOpen,
  FaSearch,
  FaHome,
} from "react-icons/fa";
import { RootState } from "../store/store";
import { logout } from "../store/slices/authSlice";
import { logoutApi } from "../api/authApi";
import Login from "./Auth/Login";
import Signup from "./Auth/Signup";
import "../styles/Navbar.css";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface NavbarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ searchQuery, setSearchQuery }) => {
  const navigate = useNavigate();
  const [modalType, setModalType] = useState<"login" | "signup" | null>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();

  const { isAuthenticated, user } = useSelector(
    (state: RootState) => state.auth
  );

  const cartItems = useSelector((state: RootState) => state.cart.products);

  // ✅ Calculate total cart item count
  const cartItemCount =
    cartItems?.reduce((total, item) => total + item.quantity, 0) || 0;

  const handleLogout = () => {
    logoutApi();
    dispatch(logout());
    toast.success("Logged out successfully!");
    setDropdownOpen(false);
    setTimeout(() => {
      window.location.reload();
    }, 100);
  };

  // ✅ Handle navigation and close dropdown
  const handleNavigate = (path: string) => {
    navigate(path);
    setDropdownOpen(false); // Close dropdown after navigation
  };

  // ✅ Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav className="navbar">
      <div
        className="logo"
        onClick={() => navigate("/")}
        title="Back to Home Page"
      >
        <h1 className="shopkart-title">
          Shop<span>kart</span>
        </h1>
      </div>

      {/* Search Bar */}
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search for products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          aria-label="Search products"
        />
        <button type="button" className="search-btn" title="Search">
          <FaSearch />
        </button>
      </div>

      {/* Icons & Profile */}
      <div className="nav-icons">
        {isAuthenticated && (
          <button
            type="button"
            title="View Cart"
            className="cart-btn"
            aria-label="Cart"
            onClick={() => navigate("/cart")}
          >
            <FaShoppingCart className="icon" />
            {cartItemCount > 0 && (
              <span className="cart-badge">{cartItemCount}</span>
            )}
          </button>
        )}

        {isAuthenticated ? (
          <div className="profile-container" ref={dropdownRef}>
            <button
              type="button"
              className={`profile-btn ${dropdownOpen ? "open" : ""}`}
              onClick={() => setDropdownOpen(!dropdownOpen)}
              title="Profile Menu"
            >
              <FaUser className="icon" />
              <span className="username">{user?.name}</span>
            </button>
            {dropdownOpen && (
              <div className="dropdown-menu">
                {/* ✅ Back to Home */}
                <button
                  type="button"
                  className="dropdown-item"
                  title="Back to Home"
                  onClick={() => handleNavigate("/")}
                >
                  <FaHome /> Home
                </button>

                {/* ✅ View Cart */}
                <button
                  type="button"
                  className="dropdown-item"
                  title="View Cart"
                  onClick={() => handleNavigate("/cart")}
                >
                  <FaShoppingCart /> View Cart
                </button>

                {/* ✅ Order History */}
                <button
                  type="button"
                  className="dropdown-item"
                  title="Order History"
                  onClick={() => handleNavigate("/order")}
                >
                  <FaBoxOpen /> Order History
                </button>

                {/* ✅ Logout */}
                <button
                  type="button"
                  className="dropdown-item logout"
                  onClick={handleLogout}
                  title="Logout"
                >
                  <FaSignOutAlt /> Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <button
            type="button"
            onClick={() => setModalType("login")}
            className="login-btn"
            title="Login"
          >
            Login
          </button>
        )}
      </div>

      {/* Login & Signup Modals */}
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
