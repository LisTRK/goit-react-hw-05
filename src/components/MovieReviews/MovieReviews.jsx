import { useEffect, useState } from 'react';
import { getReviews } from '../../api/ApiFun';
import { useParams } from 'react-router-dom';

export default function MovieReviews() {
  const { movieId } = useParams();
  const [movieReviews, setMovieReviews] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getReviews(movieId)
      .then((res) => {
        setMovieReviews(res.results);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [movieId]);
  return (
    <>
      {loading ? (
        <p>Loading... Awaiting...</p>
      ) : (
        <ul>
          {movieReviews.length === 0
            ? 'Something went wrong... Try again later...'
            : movieReviews.map((movRev) => {
                return (
                  <li key={movRev.id}>
                    <h3>Author: {movRev.author}</h3>
                    <p>{movRev.content}</p>
                  </li>
                );
              })}
        </ul>
      )}
    </>
  );
}
