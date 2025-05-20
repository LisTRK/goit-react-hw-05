import SearchMovie from '../../components/SearchMovie/SearchMovie';

import { useEffect, useRef, useState } from 'react';

import { searchMovieName } from '../../api/ApiFun';

import css from './MoviesPage.module.css';
import {
  Link,
  Outlet,
  useLocation,
  useParams,
  useSearchParams,
} from 'react-router-dom';

export default function MoviesPage() {
  const [mov, setMov] = useState([]);
  // const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const locRef = useRef(location.state);
  const [linkLocation, setLinkLocation] = useState(location.state);
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query') ?? '';
  const urlParams = useParams();

  const submitForm = (newQuery) => {
    setMov([]);
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
        setMov(response.data);
      } catch (error) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [query]);

  const renderMoviesTitle = () => {
    const render = mov.map((movie) => {
      return (
        <li key={movie.id} className={css.item}>
          <Link to={`/movies/${movie.id}`} state={location}>
            <p>{movie.title}</p>
          </Link>
          <p>
            {'  Release: '}
            {movie.release_date ?? ''}
          </p>
        </li>
      );
    });

    return <ul>{render}</ul>;
  };

  return (
    <>
      {loading ? (
        <p>Loading movies... Awaiting...</p>
      ) : (
        <div>
          <SearchMovie onSubmit={submitForm} />
          {renderMoviesTitle()}
        </div>
      )}
    </>
  );
}
