import { Outlet } from "react-router-dom";
import { Header } from "../components/Header";

export const DefaultLayout = () => {
  return (
    <main className="relative h-screen w-screen bg-[var(--color-background)]">
      <Header />
      <Outlet />
    </main>
  );
};
