import { Outlet } from "react-router-dom";
import { Footer } from "../components/Footer"

export const DefaultLayout = () => {
  return (
    <main className="h-screen w-screen bg-white">
      {/* <NavBar /> */}
      <Outlet />
      <Footer />
    </main>
  );
};
