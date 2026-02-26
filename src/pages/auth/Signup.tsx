import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthLayout from "../../components/layout/AuthLayout";
import { useAuth } from "../../context/AuthContext";
import AuthBranding from "../../components/layout/AuthBranding";
import AuthFooter from "../../components/layout/AuthFooter";

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
      left={<AuthBranding description="Empowering people to connect with deaf and mute individuals through seamless communication." />}
      right={
        <div className="form-card">
          <h2 className="form-title">Create Account</h2>
          <p className="form-desc">Sign up to access your dashboard</p>

          {error && <div className="alert">{error}</div>}

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
              >
                👁
              </button>
            </div>

            <button className="primary-btn" type="submit">Sign Up</button>

            <p className="bottom-text">
              Already have an account? <Link to="/login">Sign In</Link>
            </p>

            <AuthFooter />
          </form>
        </div>
      }
    />
  );
}