import { Outlet } from "react-router-dom"

export const DefaultLayout = () => {
	return (
		<body>
			{/* <NavBar /> */}
			<Outlet />
		</body>
	)
}