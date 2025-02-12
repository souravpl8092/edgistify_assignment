import React, { useState } from "react";
import "../../styles/Auth.css";

interface SignupProps {
  onClose: () => void;
  onSwitch: () => void; // New prop to switch to Login
}

const Signup: React.FC<SignupProps> = ({ onClose, onSwitch }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Signing up with:", { name, email, password });
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <button className="close-btn" onClick={onClose}>
          &times;
        </button>
        <h2>Sign Up</h2>
        <form onSubmit={handleSignup}>
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
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
            Sign Up
          </button>
        </form>
        <p>
          Already have an account?{" "}
          <span onClick={onSwitch} className="link">
            Login
          </span>
        </p>
      </div>
    </div>
  );
};

export default Signup;
