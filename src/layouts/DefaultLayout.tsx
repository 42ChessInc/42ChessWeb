import { Outlet } from "react-router-dom";

export const DefaultLayout = () => {
  return (
    <main className="h-screen w-screen bg-white">
      {/* <NavBar /> */}
      <Outlet />
    </main>
  );
};
