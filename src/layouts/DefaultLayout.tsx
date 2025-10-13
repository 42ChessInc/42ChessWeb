import { Outlet } from "react-router-dom";
import { Header } from "../components/Header";
import Queen from "../components/Queen";
import { Footer } from "../components/Footer";

export const DefaultLayout = () => {
  return (
    <div className="bg-[var(--color-background)]">
      <Header />
      <main className="relative w-screen">
        <div className="hidden lg:block">
          <Queen />
        </div>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};
