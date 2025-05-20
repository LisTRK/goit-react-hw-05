import css from './Navigation.module.css';
import { NavLink } from 'react-router-dom';
import clsx from 'clsx';

export default function Navigation() {
  const getActiveGetClass = ({ IsActive }) => {
    return clsx(css.link, IsActive && css.isActive);
  };
  return (
    <div className={css.wraper}>
      <nav className={css.nav}>
        <NavLink className={getActiveGetClass} to="/">
          Home
        </NavLink>
        <NavLink className={getActiveGetClass} to="/movies">
          Movies
        </NavLink>
      </nav>
    </div>
  );
}
