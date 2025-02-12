import React, { useState } from "react";
import "../../styles/Auth.css";

interface LoginProps {
  onClose: () => void;
  onSwitch: () => void; // New prop to switch to Signup
}

const Login: React.FC<LoginProps> = ({ onClose, onSwitch }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Logging in with:", { email, password });
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <button className="close-btn" onClick={onClose}>
          &times;
        </button>
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" className="auth-btn">
            Login
          </button>
        </form>
        <p>
          Don't have an account?{" "}
          <span onClick={onSwitch} className="link">
            Sign up
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
