import {createBrowserRouter} from "react-router-dom";
import {Home} from "./pages/Home";
import {Error404} from "./pages/Error404";
import {DefaultLayout} from "./layouts/DefaultLayout";
// import {UnderConstruction} from "./pages/UnderConstruction";

export const Router = createBrowserRouter([
	{
		path: "",
		element: <DefaultLayout />,
		children: [
			{path: "", element: <Home />},
			{path: "*", element: <Error404 />},
		],
	},
]);
