import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthLayout from "../../components/layout/AuthLayout";
import { useAuth } from "../../context/AuthContext";

import hero1 from "../../assets/images/hero-1.jpg";
import hero2 from "../../assets/images/hero-2.jpg";
import hero3 from "../../assets/images/hero-3.jpg";
import hero4 from "../../assets/images/hero-4.jpg";

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
            <img className="polaroid p1" src={hero1} alt="hero 1" />
            <img className="polaroid p2" src={hero2} alt="hero 2" />
            <img className="polaroid p3" src={hero3} alt="hero 3" />
            <img className="polaroid p4" src={hero4} alt="hero 4" />
          </div>

          <div className="left-center">
            <div className="branding">
              <div className="logo" aria-hidden="true">
                <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="12" cy="12" r="3" fill="white" />
                  <circle
                    cx="12"
                    cy="12"
                    r="7"
                    fill="none"
                    stroke="white"
                    strokeWidth="2"
                  />
                  <circle
                    cx="12"
                    cy="12"
                    r="10"
                    fill="none"
                    stroke="white"
                    strokeWidth="1.5"
                    opacity="0.5"
                  />
                </svg>
              </div>

              <h1 className="brand-title">VocaLink</h1>
              <p className="brand-desc">
                Create an account to start using the platform.
              </p>
            </div>
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
              autoComplete="username"
              required
            />

            <label className="label">Email</label>
            <input
              className="input"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              autoComplete="email"
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
                autoComplete="new-password"
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

            <div className="footer">
              <p>© 2026 VocaLink v1.0.0</p>
              <p>Designed for Deaf &amp; Mute Individuals</p>
            </div>
          </form>
        </div>
      }
    />
  );
}