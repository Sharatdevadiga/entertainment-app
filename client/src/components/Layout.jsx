import { Outlet } from "react-router-dom";
import Navigation from "./navigation/Navigation";

function Layout() {
  return (
    <div className="flex h-screen flex-col p-6 md:flex-row">
      <section>
        <Navigation />
      </section>
      <section>
        <Outlet />
      </section>
    </div>
  );
}

export default Layout;
