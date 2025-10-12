import {Outlet} from "react-router-dom";
import {Header} from "../components/Header";
import {Queen3d} from "../components/Queen";

export const DefaultLayout = () => {
	return (
		<div className="relative flex flex-col h-screen w-screen bg-[var(--color-background)] overflow-x-hidden">
			<Header />
			<main className="w-full h-full">
				<Queen3d />
				<Outlet />
			</main>
		</div>
	);
};
