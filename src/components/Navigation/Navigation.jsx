import { NavLink } from "react-router-dom";
import clsx from "clsx";
import style from "./Navigation.module.css";

const buildStylesClasses = ({ isActive }) =>
  clsx(style.link, isActive && style.active);

export default function Navigation() {
  return (
    <nav className={style.nav}>
      <NavLink className={buildStylesClasses} to="/">
        Home
      </NavLink>
      <NavLink className={buildStylesClasses} to="/movies">
        Movies
      </NavLink>
    </nav>
  );
}
