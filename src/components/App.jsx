import { Suspense, lazy } from 'react';
import { NavLink, Route, Routes } from 'react-router-dom';
import css from './App.module.css'

const Cast = lazy(() => import('pages/Cast'));
const HomePage = lazy(() => import('pages/HomePage'));
const MovieDetails = lazy(() => import('pages/MovieDetails'));
const Movies = lazy(() => import('pages/Movies'));
const Reviews = lazy(() => import('pages/Reviews'));

export const App = () => {
  return (
    <div className={css.container}>
      <header className={css.header}>
        <nav>
          <NavLink to="/" className={css.headerLink}>
            Home
          </NavLink>
          <NavLink to="/movies" className={css.headerLink}>
            Movies
          </NavLink>
        </nav>
      </header>
      <main>
        <Suspense>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/movies" element={<Movies />} />
            <Route path="/movies/:movieId" element={<MovieDetails />}>
              <Route path="cast" element={<Cast />} />
              <Route path="reviews" element={<Reviews />} />
            </Route>
          </Routes>
        </Suspense>
      </main>
    </div>
  );
};
