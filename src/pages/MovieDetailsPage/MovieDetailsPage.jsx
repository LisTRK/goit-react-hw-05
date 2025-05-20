import { useEffect, useState, useRef, Suspense } from 'react';
import { getDetalesMovie } from '../../api/ApiFun';
import { NavLink, Outlet, useParams, useLocation } from 'react-router-dom';
import GoBackBtn from '../../components/GoBackBtn/GoBackBtn';
import css from './MovieDetailsPage.module.css';

export default function MovieDetailsPage() {
  const { movieId } = useParams();
  const [movieData, setMovieData] = useState({});
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const backLinkRef = useRef(location.state ?? '/movies');

  useEffect(() => {
    setLoading(true);
    getDetalesMovie(movieId)
      .then((res) => {
        setMovieData(res);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [movieId]);

  return (
    <>
      {loading ? (
        <p>Loading movie details...</p>
      ) : (
        <div>
          <GoBackBtn backLinkRef={backLinkRef} />
          <div className={css.aboutMovie}>
            <div className={css.poster}>
              {movieData.poster_path && (
                <img
                  src={`https://image.tmdb.org/t/p/w300${movieData.poster_path}`}
                  alt={movieData.title}
                />
              )}
            </div>
            <div>
              <h2>{movieData.title}</h2>
              <h3>Overview</h3>
              <p>{movieData.overview}</p>
              <h4>Release: {movieData.release_date}</h4>
              <h4>Avarage: {movieData.vote_average}</h4>
              <h3>Genres</h3>
              <ul className={css.genrInfo}>
                {movieData.genres && Array.isArray(movieData.genres) ? (
                  movieData.genres.map((genr) => (
                    <li key={genr.id}>{genr.name}</li>
                  ))
                ) : (
                  <li>No genres available</li>
                )}
              </ul>
            </div>
          </div>
          <div className={css.info}>
            <h3>Addetional information</h3>
            <ul>
              <li className={css.link}>
                <NavLink to="cast">Cast</NavLink>
              </li>
              <li className={css.link}>
                <NavLink to="reviews">Reviews</NavLink>
              </li>
            </ul>
          </div>
          <div className={css.castReviewsDetales}>
            <Suspense fallback={<strong>Loading subcomponent...</strong>}>
              <Outlet />
            </Suspense>
          </div>
        </div>
      )}
    </>
  );
}
