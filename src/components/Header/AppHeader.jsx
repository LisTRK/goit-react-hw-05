import css from './AppHeader.module.css';
import Navigation from '../Navigation/Navigation';

export default function AppHeader() {
  return (
    <div className={css.wraper}>
      <Navigation />
    </div>
  );
}
