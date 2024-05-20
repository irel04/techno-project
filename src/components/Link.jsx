import { NavLink } from "react-router-dom";

function Link({ to, page }) {
  return (
    <NavLink
      to={to}
      className=""
    >
      {page}
    </NavLink>
  );
}

export default Link;
