//import { HorseIcon } from "@phosphor-icons/react";
import { useNavigate } from "react-router-dom";
import { LoginButton } from "./style";
import React, { useEffect, useState } from "react";

type UserProfile = {
  id: string;
  name?: string;
  email?: string;
  img?: string;
} | null;

export const Header: React.FC = () => {
  const [user, setUser] = useState<UserProfile>(null);
  const navigate = useNavigate();

  useEffect(() => {
    try {
      const raw = localStorage.getItem("user");
      if (!raw) return setUser(null);
      const parsed = JSON.parse(raw);
      setUser(parsed);
    } catch {
      setUser(null);
    }
  }, []);

  function handleClickButtonLogin() {
    navigate("/login");
  }

  function handleLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    navigate("/");
  }

  return (
    <header className="w-full flex flex-col md:flex-row md:justify-between p-6 bg-transparent items-center">
      <a
        href="/"
        className="font-jersey text-center text-6xl duration-500 transition-all hover:translate-x-5"
      >
        42ChessClub
      </a>
      <div>
        {user ? (
          <div className="flex items-center gap-3">
            <img
              src={user.img || "https://www.gravatar.com/avatar/?d=mp&s=64"}
              alt={user.name || "user"}
              className="w-10 h-10 rounded-full object-cover"
            />
            <span className="font-medium">{user.name ?? user.email}</span>
            <button
              onClick={handleLogout}
              className="ml-3 px-3 py-1 rounded bg-red-600 text-white text-sm"
            >
              Logout
            </button>
          </div>
        ) : (
          <LoginButton onClick={handleClickButtonLogin}>Login</LoginButton>
        )}
      </div>
    </header>
  );
};
