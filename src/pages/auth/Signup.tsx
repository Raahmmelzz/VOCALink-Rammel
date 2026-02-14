import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthLayout from "../../components/layout/AuthLayout";
import { useAuth } from "../../context/AuthContext";

import hero1 from "../../assets/images/hero-1.jpg";
import hero2 from "../../assets/images/hero-2.jpg";
import hero3 from "../../assets/images/hero-3.jpg";

export default function Signup() {
  const navigate = useNavigate();
  const { signup } = useAuth();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState("");

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      await signup({ username, email, password });
      navigate("/login");
    } catch (err: any) {
      setError(err?.message || "Signup failed.");
    }
  };

  return (
    <AuthLayout
      left={
        <>
          <div className="polaroids">
            <img className="polaroid p1" src={hero1} alt="community" />
            <img className="polaroid p2" src={hero2} alt="classroom" />
            <img className="polaroid p3" src={hero3} alt="learning" />
          </div>

          <div className="brand-panel">
            <div className="brand-badge" aria-hidden="true" />
            <h1 className="brand-title">VocaLink</h1>
            <p className="brand-subtitle">
              Create an account to start using the platform.
            </p>
          </div>
        </>
      }
      right={
        <div className="form-card">
          <h2 className="form-title">Create Account</h2>
          <p className="form-desc">Sign up to access your dashboard</p>

          {error ? <div className="alert">{error}</div> : null}

          <form onSubmit={onSubmit} className="form">
            <label className="label">Username</label>
            <input
              className="input"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
              required
            />

            <label className="label">Email</label>
            <input
              className="input"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />

            <label className="label">Password</label>
            <div className="input-wrap">
              <input
                className="input"
                type={showPass ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Create a password"
                required
              />
              <button
                type="button"
                className="eye"
                onClick={() => setShowPass((v) => !v)}
                aria-label="Toggle password visibility"
              >
                👁
              </button>
            </div>

            <button className="primary-btn" type="submit">
              Sign Up
            </button>

            <p className="bottom-text">
              Already have an account? <Link to="/login">Sign In</Link>
            </p>
          </form>
        </div>
      }
    />
  );
}