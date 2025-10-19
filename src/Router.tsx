import { createBrowserRouter } from "react-router-dom";
import { Home } from "./pages/Home";
import { Error404 } from "./pages/Error404";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { Learn } from "./pages/Learn";
import { About } from "./pages/About";
import { Tournament } from "./pages/Tournament";
import { DefaultLayout } from "./layouts/DefaultLayout";

// import {UnderConstruction} from "./pages/UnderConstruction";

export const Router = createBrowserRouter([
  {
    path: "",
    element: <DefaultLayout />,
    children: [
      { path: "", element: <Home /> },
      { path: "*", element: <Error404 /> },
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },
      { path: "/learn", element: <Learn /> },
      { path: "/about", element: <About /> },
      { path: "/tournament", element: <Tournament /> },
    ],
  },
]);
