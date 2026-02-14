import { useState } from "react";
import type { FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthLayout from "../../components/layout/AuthLayout";
import { useAuth } from "../../context/AuthContext";

import hero1 from "../../assets/images/hero-1.jpg";
import hero2 from "../../assets/images/hero-2.jpg";
import hero3 from "../../assets/images/hero-3.jpg";
import hero4 from "../../assets/images/hero-4.jpg";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState("");

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      await login({ identifier, password, remember });
      navigate("/dashboard");
    } catch (err: any) {
      setError(err?.message || "Login failed.");
    }
  };

  return (
    <AuthLayout
      left={
        <>
          {/* Images */}
          <div className="polaroids">
            <img className="polaroid p1" src={hero1} alt="hero 1" />
            <img className="polaroid p2" src={hero2} alt="hero 2" />
            <img className="polaroid p3" src={hero3} alt="hero 3" />
            <img className="polaroid p4" src={hero4} alt="hero 4" />
          </div>

          {/* ✅ Center branding (middle) */}
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
                Empowering people to connect with deaf and mute individuals through
                seamless communication.
              </p>
            </div>
          </div>
        </>
      }
      right={
        <div className="form-card">
          <h2 className="form-title">Welcome Back</h2>
          <p className="form-desc">Sign in to access your dashboard</p>

          {error ? <div className="alert">{error}</div> : null}

          <form onSubmit={onSubmit} className="form">
            <label className="label">Username or Email</label>
            <input
              className="input"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              placeholder="Enter your username or email"
              autoComplete="username"
              required
            />

            <label className="label">Password</label>
            <div className="input-wrap">
              <input
                className="input"
                type={showPass ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                autoComplete="current-password"
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

            <div className="row">
              <label className="checkbox">
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                />
                <span>Remember me</span>
              </label>

              <button
                type="button"
                className="link-btn"
                onClick={() => alert("Connect this to your reset-password flow later.")}
              >
                Forgot Password?
              </button>
            </div>

            <button className="primary-btn" type="submit">
              Sign In
            </button>

            <p className="bottom-text">
              Don&apos;t have an account? <Link to="/signup">Sign Up</Link>
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