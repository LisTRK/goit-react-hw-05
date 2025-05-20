import { Routes, Route } from 'react-router-dom';
import { lazy } from 'react';

import './App.css';
const HomePage = lazy(() => import('./pages/HomePage/HomePage'));
const MovieDetailsPage = lazy(() =>
  import('./pages/MovieDetailsPage/MovieDetailsPage'),
);
const MoviesPage = lazy(() => import('./pages/MoviesPage/MoviesPage'));

import AppHeader from '../src/components/Header/AppHeader';
import MovieCast from '../src/components/MovieCast/MovieCast';
import MovieReviews from '../src/components/MovieReviews/MovieReviews';

function App() {
  return (
    <>
      <div className="container">
        <AppHeader />
        <div>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/movies" element={<MoviesPage />} />
            <Route path="/movies/:movieId" element={<MovieDetailsPage />}>
              <Route path="/movies/:movieId/cast" element={<MovieCast />} />
              <Route
                path="/movies/:movieId/reviews"
                element={<MovieReviews />}
              />
            </Route>
            <Route
              path="*"
              element={<p>404 Page not found... Try again...</p>}
            />
          </Routes>
        </div>
      </div>
    </>
  );
}

export default App;
