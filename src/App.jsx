import { Routes, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';

import './App.css';
const HomePage = lazy(() => import('./pages/HomePage/HomePage'));
const MovieDetailsPage = lazy(() =>
  import('./pages/MovieDetailsPage/MovieDetailsPage'),
);
const MoviesPage = lazy(() => import('./pages/MoviesPage/MoviesPage'));
const MovieCast = lazy(() => import('../src/components/MovieCast/MovieCast'));
const MovieReviews = lazy(() =>
  import('../src/components/MovieReviews/MovieReviews'),
);

import AppHeader from '../src/components/Header/AppHeader';

function App() {
  return (
    <>
      <div className="container">
        <AppHeader />
        <div>
          <Suspense fallback={<strong>Loading page...</strong>}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/movies" element={<MoviesPage />} />
              <Route path="/movies/:movieId" element={<MovieDetailsPage />}>
                <Route path="cast" element={<MovieCast />} />
                <Route path="reviews" element={<MovieReviews />} />
              </Route>
              <Route
                path="*"
                element={<p>404 Page not found... Try again...</p>}
              />
            </Routes>
          </Suspense>
        </div>
      </div>
    </>
  );
}

export default App;
