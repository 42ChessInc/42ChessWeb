import {Outlet} from "react-router-dom";
import {Header} from "../components/Header";
import {Queen3d} from "../components/Queen";
import {Footer} from "../components/Footer";

export const DefaultLayout = () => {
	return (
		<main className="relative h-screen w-screen bg-[var(--color-background)]">
			<Header />
			<Queen3d />
			<Outlet />
      <Footer />
		</main>
	);
};
