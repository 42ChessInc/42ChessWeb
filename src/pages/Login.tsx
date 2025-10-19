import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import board from "../assets/pieces/chess_board_1.webp";

export const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [btnHover, setBtnHover] = useState(false);

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

    if (!email) {
      setError("Email is required.");
      return;
    }
    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    if (!password) {
      setError("Password is required.");
      return;
    }

    setLoading(true);

    try {
      const baseUrl = import.meta.env.VITE_API_URL || "http://localhost:3000";
      const res = await fetch(`${baseUrl.replace(/\/+$/, "")}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const json = await res.json();

      if (!res.ok) {
        // backend sends { message: "..."} for errors
        throw new Error(json?.message ?? "Login failed");
      }

      // Example returned shape: { id, name, email, ..., token }
      const token = json.token;
      if (!token) throw new Error("No token returned from server");

      // Store token (simple approach)
      localStorage.setItem("token", token);
      // Optionally store user data
      localStorage.setItem(
        "user",
        JSON.stringify({ id: json.id, name: json.name, email: json.email })
      );

      // avoid logging sensitive tokens
      console.debug("login successful", { email: json.email });
      // navigate on success
      navigate("/", { replace: true });
    } catch (err: unknown) {
      // Narrow the unknown to extract a useful message safely
      if (err instanceof Error) {
        setError(err.message);
      } else if (typeof err === "string") {
        setError(err);
      } else {
        setError("Login failed");
      }
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
          aria-label="login-form"
        >
          <h2
            className="text-2xl font-semibold mb-6"
            style={{ color: palette.text }}
          >
            Log in
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
              name="email"
              autoComplete="email"
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

          <label className="block mb-6">
            <span
              className="text-sm font-medium"
              style={{ color: palette.text }}
            >
              Password
            </span>
            <input
              type="password"
              name="password"
              autoComplete="current-password"
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

          <div className="flex flex-col gap-3">
            <button
              type="submit"
              disabled={loading}
              onMouseEnter={() => setBtnHover(true)}
              onMouseLeave={() => setBtnHover(false)}
              style={{
                background: btnHover ? palette.primary : palette.accent,
                color: palette.background,
              }}
              className="w-full py-2 rounded font-semibold transition-colors duration-150 cursor-pointer"
            >
              {loading ? "Logging in..." : "Log in"}
            </button>
            <span className="">
              Still does not have an account?{" "}
              <a className="font-bold" href="/register">
                Register
              </a>
            </span>
          </div>
        </form>
      </div>
    </section>
  );
};
