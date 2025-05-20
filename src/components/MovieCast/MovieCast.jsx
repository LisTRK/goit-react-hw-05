import { useParams } from 'react-router-dom';
import { getCast } from '../../api/ApiFun';
import { useEffect, useState } from 'react';
import css from './MovieCast.module.css';

export default function MovieCast() {
  const { movieId } = useParams();
  const [casts, setCasts] = useState([]);

  useEffect(() => {
    getCast(movieId)
      .then((res) => {
        setCasts(res.cast);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally();
  }, [movieId]);

  return (
    <div>
      {casts.length === 0 ? (
        <p>No casts info</p>
      ) : (
        <ul className={css.list}>
          {casts.map((cast) => {
            return (
              <li key={cast.id} className={css.item}>
                <div>
                  <img
                    src={`https://image.tmdb.org/t/p/w200${cast.profile_path}`}
                    alt={`Photo ${cast.original_name}`}
                  />
                </div>
                <div>
                  <h3>{cast.original_name}</h3>
                  <p>{cast.character}</p>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
