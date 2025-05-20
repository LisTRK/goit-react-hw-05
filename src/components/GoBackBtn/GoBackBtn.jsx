import { NavLink, useLocation } from 'react-router-dom';
import css from './GoBackBtn.module.css';
const GoBackBtn = ({ backLinkRef }) => {
  return (
    <NavLink className={css.link} to={backLinkRef.current}>
      Go Back
    </NavLink>
  );
};

export default GoBackBtn;
