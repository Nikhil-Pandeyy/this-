import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import AdBanner from "./AdBanner";

export default function Layout() {
  const location = useLocation();
  const isHome = location.pathname === "/";

  return (
    <div className="min-h-screen">
      {isHome && <AdBanner />}
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
