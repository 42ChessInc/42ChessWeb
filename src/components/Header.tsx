import {HorseIcon} from "@phosphor-icons/react";
// import { useNavigate } from "react-router-dom";

export const Header = () => {
	const isLogged = false;
	// const nav = useNavigate();

	// function handleClickButtonLogin () {

	// }
	return (
		<header className="absolute w-full h-15 flex justify-end pr-2 pt-2">
			{isLogged ? (
				<HorseIcon size={52} className="cursor-pointer hover:scale-105 transition-all"/>
			) : (
				<button
					className="py-2 px-4 bg-[var(--color-primary)] rounded-2xl cursor-pointer transition-all hover:scale-105 active:scale-100"
					
				>Login</button>
			)}
		</header>
	);
};
