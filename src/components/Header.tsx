import {HorseIcon, ShareFatIcon} from "@phosphor-icons/react";
import { useEffect, useState } from "react";
import {useLocation, useNavigate} from "react-router-dom";

export const Header = () => {
	const isLogged = false;
	const navigate = useNavigate();
	const location = useLocation();
	const [isOnHomePage, setIsOnHomePage] = useState(false);

	useEffect(() => {
		if (location.pathname == "/")
			setIsOnHomePage(true);
		else
			setIsOnHomePage(false);
	}, [location])

	function handleClickButtonLogin() {
		navigate("/login");
	}
	function handleClickButtonBack() {
		navigate(-1);
	}
	return (
		<header className="absolute w-full h-15 flex justify-between p-2 z-50">
			<button>
				{!isOnHomePage && <ShareFatIcon
					size={52}
					className="rotate-y-180 cursor-pointer text-[var(--color-primary)] hover:text-[var(--color-accent)] transition-all active:scale-95"
					weight="fill"
					onClick={handleClickButtonBack}
				/>}
			</button>
			{isLogged ? (
				<HorseIcon
					size={52}
					className="cursor-pointer hover:scale-105 transition-all"
				/>
			) : (
				<button
					className="py-2 px-4 bg-[var(--color-primary)] rounded-2xl cursor-pointer transition-all hover:scale-105 font-bold active:scale-100"
					onClick={handleClickButtonLogin}
				>
					Login
				</button>
			)}
		</header>
	);
};
