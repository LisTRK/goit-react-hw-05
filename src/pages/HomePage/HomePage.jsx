import { useEffect, useState } from 'react';
import { searchMovieRamdom } from '../../api/ApiFun';
import css from './HomePage.module.css';
import { Link, useLocation } from 'react-router-dom';

export default function HomePage() {
  const [moviesData, setMoviesData] = useState([]);
  const [loading, setLoading] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setLoading(true);
    searchMovieRamdom()
      .then((responseData) => {
        setMoviesData(responseData.data);
      })
      .catch(() => {
        console.log(console.error());
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);
  return (
    <>
      {loading ? (
        <p>Loading movies...</p>
      ) : (
        <ul className={css.list}>
          {moviesData.map((movie) => (
            <li key={movie.id} className={css.item}>
              <Link to={`/movies/${movie.id}`} state={location}>
                <img
                  src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                  alt={movie.title}
                />
                <p>{movie.original_title}</p>
                <p className={css.average}>
                  Release:
                  {movie.release_date}
                </p>
                <p className={css.average}>Avarage: {movie.vote_average}</p>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
