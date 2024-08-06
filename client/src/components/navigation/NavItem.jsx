/* eslint-disable react/prop-types */

import { NavLink } from "react-router-dom";

function NavItem({ to = "/", icon }) {
  return (
    <NavLink
      to={`${to}`}
      className={({ isActive }) =>
        isActive ? "opacity-100 transition-all" : "opacity-50 transition-all"
      }
    >
      {icon}
    </NavLink>
  );
}

export default NavItem;

// import { NavLink } from "react-router-dom";

// function NavItem({ to = "/", icon }) {
//   return (
//     <NavLink
//       to={to}
//       className={({ isActive }) =>
//         `flex items-center p-2 ${
//           isActive ? "text-blue-500 opacity-100" : "text-gray-500 opacity-50"
//         }`
//       }
//     >
//       {icon}
//     </NavLink>
//   );
// }

// export default NavItem;
