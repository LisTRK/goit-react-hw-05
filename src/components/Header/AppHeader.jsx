import css from './AppHeader.module.css';
import Navigations from '../Navigations/Navigations';

export default function AppHeader() {
  return (
    <div className={css.wraper}>
      <Navigations />
    </div>
  );
}
