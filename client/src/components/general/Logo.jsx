import { MdMovie } from "react-icons/md";
import { NavLink } from "react-router-dom";

function Logo() {
  return (
    <NavLink to="/">
      <MdMovie className="h-6 w-6 text-primary md:h-8 md:w-8"></MdMovie>
    </NavLink>
  );
}

export default Logo;
