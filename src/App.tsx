import {RouterProvider} from "react-router-dom";
import {Router} from "./Router";

export default function App() {
	return (
		<div className="">
			<RouterProvider router={Router} />
		</div>
	);
}

