import { SiWindows11 } from "react-icons/si";
import { MdLocalMovies } from "react-icons/md";
import { TbDeviceTvOld } from "react-icons/tb";
import { FaBookmark } from "react-icons/fa6";
import { FaUser } from "react-icons/fa6";
import NavItem from "./NavItem";
import Logo from "../Logo";

function Navigation() {
  return (
    <nav className="flex w-auto flex-row items-center justify-center gap-6 rounded-lg bg-gray p-6 md:h-full md:w-auto md:flex-col md:gap-6">
      <div className="h-8 w-8 md:mb-12">
        <Logo />
      </div>
      <div className="mx-auto flex w-auto flex-row gap-2 md:h-full md:w-auto md:flex-col md:items-center md:gap-6">
        <NavItem to="/" icon={<SiWindows11 className="h-4 w-5" />} />
        <NavItem to="movies" icon={<MdLocalMovies className="h-4 w-8" />} />
        <NavItem to="tv" icon={<TbDeviceTvOld className="h-4 w-8" />} />
        <NavItem
          to="user/bookmarks"
          icon={<FaBookmark className="h-4 w-8" />}
        />
      </div>
      <div className="ml-auto md:mt-auto">
        <NavItem to="/" icon={<FaUser className="h-4 w-8" />} />
      </div>
    </nav>
  );
}

export default Navigation;
