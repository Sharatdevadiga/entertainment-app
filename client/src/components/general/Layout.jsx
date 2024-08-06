import { Outlet } from "react-router-dom";
import Navigation from "../navigation/Navigation";

function Layout() {
  return (
    <div className="flex h-screen w-screen flex-col gap-6 p-2 xs:p-3 sm:p-4 md:flex-row md:gap-5 md:p-5">
      <section className="flex-none">
        <Navigation />
      </section>
      <section className="flex-grow overflow-auto">
        <Outlet />
      </section>
    </div>
  );
}

export default Layout;
