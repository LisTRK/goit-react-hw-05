import { Link, useLocation } from 'react-router-dom';
import css from './MovieList.module.css';
export default function MovieList({ moviesData }) {
  const location = useLocation();
  return (
    <>
      {moviesData.map((movie) => (
        <li key={movie.id} className={css.item}>
          <Link to={`/movies/${movie.id}`} state={location}>
            <img
              src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
              alt={movie.title}
            />
            <p>{movie.title}</p>
            <p className={css.average}>
              Release:
              {movie.release_date}
            </p>
            <p className={css.average}>Avarage: {movie.vote_average}</p>
          </Link>
        </li>
      ))}
    </>
  );
}
