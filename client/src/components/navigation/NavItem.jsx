/* eslint-disable react/prop-types */

import { NavLink } from "react-router-dom";

function NavItem({ to = "/", icon }) {
  return <NavLink to={`${to}`}>{icon}</NavLink>;
}

export default NavItem;
