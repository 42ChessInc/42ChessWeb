import { Outlet } from "react-router-dom"

export const DefaultLayout = () => {
	return (
		<main className="h-screen w-screen bg-[#0D1426]">
			{/* <NavBar /> */}
			<Outlet />
		</main>
	)
}