import SearchMovie from '../../components/SearchMovie/SearchMovie';

import { useEffect, useState } from 'react';

import { searchMovieName } from '../../api/ApiFun';

import css from './MoviesPage.module.css';
import { useSearchParams } from 'react-router-dom';
import MovieList from '../../components/MovieList/MovieList';

export default function MoviesPage() {
  const [moviesData, setMoviesData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query') ?? '';

  const submitForm = (newQuery) => {
    setMoviesData([]);
    const nextSearchParams = new URLSearchParams(searchParams);
    nextSearchParams.set('query', newQuery);
    setSearchParams(nextSearchParams);
  };

  useEffect(() => {
    if (!query) {
      return;
    }

    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await searchMovieName(query);
        setMoviesData(response.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [query]);
  return (
    <>
      {loading ? (
        <p>Loading movies... Awaiting...</p>
      ) : (
        <div>
          <SearchMovie onSubmit={submitForm} />
          {moviesData.length !== 0 && (
            <ul className={css.list}>
              <MovieList moviesData={moviesData} />
            </ul>
          )}
        </div>
      )}
    </>
  );
}
