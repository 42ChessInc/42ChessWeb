import { HorseIcon } from "@phosphor-icons/react";
import { useNavigate } from "react-router-dom";
import { LoginButton } from "./style";

export const Header = () => {
  const isLogged = false;
  const navigate = useNavigate();

  function handleClickButtonLogin() {
    navigate("/login");
  }

  return (
    <header className="w-full flex flex-col md:flex-row md:justify-between p-6 bg-transparent">
      <a
        href="/"
        className="font-jersey text-center text-6xl duration-500 transition-all hover:translate-x-5"
      >
        42ChessClub
      </a>
      {isLogged ? (
        <HorseIcon
          size={52}
          className="cursor-pointer hover:scale-105 transition-all"
        />
      ) : (
        <LoginButton onClick={handleClickButtonLogin}>Login</LoginButton>
      )}
    </header>
  );
};
