import { NavLink } from "react-router-dom";

function Link({ to, page }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) => (isActive ? "font-extrabold" : "")}
    >
      {page}
    </NavLink>
  );
}

export default Link;
