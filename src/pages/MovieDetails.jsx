import { Loader } from 'components/Loader/Loader';
import { useEffect, useState } from 'react';
import { Link, Outlet, useLocation, useParams } from 'react-router-dom';
import { fetchMoviesDetails } from 'services/Api';
import css from './MovieDetails.module.css'
const MovieDetails = () => {
  const { movieId } = useParams();
  const [movieInfo, setMovieInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (!movieId) return;

    const fetchMovieDetailsFilms = () => {
      setLoading(true);

      fetchMoviesDetails(movieId)
        .then(detailMovie => {
          setMovieInfo(detailMovie);
        })
        .catch(error => {
          console.log(error);
        })
        .finally(() => {
          setLoading(false);
        });
    };

    fetchMovieDetailsFilms();
  }, [movieId]);

  if (!movieInfo) return;

  const { title, poster_path, genres, overview, vote_average } = movieInfo;
  const rating = (vote_average * 10).toFixed(2);

  return (
    <main>
      <Link to={location.state?.from ?? '/'}>
        <button type="button" className={css.movieDetailsBtn}>
          {' '}
          &#8656; Go back
        </button>
      </Link>
      <div className={css.movieDetails}>
        <hr />
        <img
          src={
            poster_path
              ? `https://image.tmdb.org/t/p/original/${poster_path}`
              : 'https://upload.wikimedia.org/wikipedia/commons/d/d1/Image_not_available.png'
          }
          alt={`Poster ${title}`}
          width="300px"
        />

        <div>
          <h1>{title}</h1>
          <p>User Score: {rating}%</p>
          <h2>Overview</h2>
          <p>{overview}</p>
          <h2>Genres</h2>
          <p>{genres.map(({ name }) => name).join(', ')}</p>
        </div>
      </div>
      <hr />

      <h2>Additional information</h2>
      <ul>
        <li>
          <Link to="cast">Cast</Link>
        </li>
        <li>
          <Link to="reviews">Reviews</Link>
        </li>
      </ul>
      <hr />
      <Outlet />
      {loading && <Loader />}
    </main>
  );
};

export default MovieDetails;
