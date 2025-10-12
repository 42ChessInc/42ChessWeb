import {HorseIcon, ShareFatIcon} from "@phosphor-icons/react";
import {useEffect, useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import {LoginButton} from "./style";

export const Header = () => {
	const isLogged = false;
	const navigate = useNavigate();
	const location = useLocation();
	const [isOnHomePage, setIsOnHomePage] = useState(false);

	useEffect(() => {
		if (location.pathname == "/") setIsOnHomePage(true);
		else setIsOnHomePage(false);
	}, [location]);

	function handleClickButtonLogin() {
		navigate("/login");
	}
	function handleClickButtonBack() {
		navigate(-1);
	}
	return (
		<header className="w-full flex justify-between p-6 bg-transparent">
			<div className="flex items-center justify-between w-1/4">
				<button>
					{!isOnHomePage && (
						<ShareFatIcon
							size={52}
							className="rotate-y-180 cursor-pointer text-[var(--color-primary)] hover:text-[var(--color-accent)] transition-all active:scale-95"
							weight="fill"
							onClick={handleClickButtonBack}
						/>
					)}
				</button>
				<h1 className="font-jersey text-6xl">42ChessClub</h1>
			</div>

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
