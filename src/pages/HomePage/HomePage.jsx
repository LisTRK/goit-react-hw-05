import { useEffect, useState } from 'react';
import { searchMovieRamdom } from '../../api/ApiFun';
import css from './HomePage.module.css';
import MovieList from '../../components/MovieList/MovieList';

export default function HomePage() {
  const [moviesData, setMoviesData] = useState([]);
  const [loading, setLoading] = useState(false);

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
          <MovieList moviesData={moviesData} />
        </ul>
      )}
    </>
  );
}
