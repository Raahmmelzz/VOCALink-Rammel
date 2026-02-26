import { useState } from "react";
import type { FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthLayout from "../../components/layout/AuthLayout";
import { useAuth } from "../../context/AuthContext";
import AuthBranding from "../../components/layout/AuthBranding";
import AuthFooter from "../../components/layout/AuthFooter";

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
  left={<AuthBranding description="Empowering people to connect with deaf and mute individuals through seamless communication." 
    />
  }
      right={
        <div className="form-card">
          <h2 className="form-title">Welcome Back</h2>
          <p className="form-desc">Sign in to access your dashboard</p>

          {error && <div className="alert">{error}</div>}

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
              <button type="button" className="link-btn" onClick={() => alert("Reset flow coming soon!")}>
                Forgot Password?
              </button>
            </div>

            <button className="primary-btn" type="submit">Sign In</button>

            <p className="bottom-text">
              Don&apos;t have an account? <Link to="/signup">Sign Up</Link>
            </p>

            <AuthFooter />
          </form>
        </div>
      }
    />
  );
}