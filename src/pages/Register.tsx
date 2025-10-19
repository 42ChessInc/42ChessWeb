import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import board from "../assets/pieces/chess_board_2.webp";

export const Register: React.FC = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const palette = {
    text: "#131628",
    background: "#CFB18C",
    primary: "#C19A6B",
    secondary: "#E6D9C2",
    accent: "#7D4B32",
  };

  const validateEmail = (value: string) => /\S+@\S+\.\S+/.test(value);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email) return setError("Email is required.");
    if (!validateEmail(email))
      return setError("Please enter a valid email address.");
    // check is username available
    if (!username) return setError("Username is required.");
    if (!password) return setError("Password is required.");
    if (password !== confirm) return setError("Passwords do not match.");

    setLoading(true);
    try {
      // prefer VITE_API_URL, fallback to localhost for local dev
      const baseUrl = import.meta.env.VITE_API_URL || "http://localhost:3000";
      const res = await fetch(`${baseUrl.replace(/\/+$/, "")}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: username, email, password }),
      });

      const json = await res.json();
      // If the backend returned an error status show its message
      if (!res.ok) {
        setError(json?.message ?? "Registration failed");
        setLoading(false);
        return;
      }

      // expected response: { user, token }
      const token = json?.token;
      if (token) {
        localStorage.setItem("token", token);
      }

      // avoid logging sensitive tokens
      console.debug("register successful", { email });
      // Only navigate after a successful registration
      navigate("/login", { replace: true });
    } catch (err: unknown) {
      if (err instanceof Error) setError(err.message);
      else if (typeof err === "string") setError(err);
      else setError("Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      style={{ backgroundColor: palette.background, minHeight: "100vh" }}
      className="relative"
    >
      <div
        aria-hidden
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 50,
          height: "60%",
          backgroundImage: `url(${board})`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center bottom",
          backgroundSize: "contain",
          pointerEvents: "none",
        }}
      />

      <div className="flex items-center justify-center min-h-screen px-4">
        <form
          onSubmit={handleSubmit}
          style={{
            background: palette.secondary,
            color: palette.text,
            position: "relative",
            zIndex: 10,
          }}
          className="w-full max-w-md p-8 rounded-lg shadow-md"
          aria-label="register-form"
        >
          <h2
            className="text-2xl font-semibold mb-6"
            style={{ color: palette.text }}
          >
            Create account
          </h2>

          {error && (
            <div
              role="alert"
              style={{ background: palette.primary, color: palette.background }}
              className="p-2 mb-4 rounded"
            >
              {error}
            </div>
          )}

          <label className="block mb-4">
            <span
              className="text-sm font-medium"
              style={{ color: palette.text }}
            >
              Email
            </span>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
              style={{
                background: palette.background,
                color: palette.text,
                borderColor: palette.accent,
              }}
              className="mt-1 block w-full px-3 py-2 border rounded focus:outline-none"
            />
          </label>

          <label className="block mb-4">
            <span
              className="text-sm font-medium"
              style={{ color: palette.text }}
            >
              Username
            </span>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="username"
              required
              style={{
                background: palette.background,
                color: palette.text,
                borderColor: palette.accent,
              }}
              className="mt-1 block w-full px-3 py-2 border rounded focus:outline-none"
            />
          </label>

          <label className="block mb-4">
            <span
              className="text-sm font-medium"
              style={{ color: palette.text }}
            >
              Password
            </span>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••"
              required
              style={{
                background: palette.background,
                color: palette.text,
                borderColor: palette.accent,
              }}
              className="mt-1 block w-full px-3 py-2 border rounded focus:outline-none"
            />
          </label>

          <label className="block mb-6">
            <span
              className="text-sm font-medium"
              style={{ color: palette.text }}
            >
              Confirm Password
            </span>
            <input
              type="password"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              placeholder="••••••"
              required
              style={{
                background: palette.background,
                color: palette.text,
                borderColor: palette.accent,
              }}
              className="mt-1 block w-full px-3 py-2 border rounded focus:outline-none"
            />
          </label>

          <button
            type="submit"
            disabled={loading}
            style={{ background: palette.accent, color: palette.background }}
            className="w-full py-2 rounded font-semibold"
          >
            {loading ? "Creating..." : "Create account"}
          </button>
        </form>
      </div>
    </section>
  );
};

// named export to match Router imports
