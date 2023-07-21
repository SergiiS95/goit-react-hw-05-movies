import { Loader } from 'components/Loader/Loader';
import { MoviesList } from 'components/MoviesList/MoviesList';
import { SearchBox } from 'components/SearchBox/SearchBox';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { fetchSearchMovies } from 'services/Api';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const Movies = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchFilms, setSerchFilms] = useState([]);
  const quary = searchParams.get('quary') || '';
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (quary === '') {
      return;
    }
    const fetchMovieCast = () => {
      setLoading(true);

      fetchSearchMovies(quary)
        .then(movieSearch => {
          if (movieSearch.length === 0) {
            Notify.failure('Sorry movie not found...');
            return;
          }
          setSerchFilms(movieSearch);
        })
        .catch(error => {
          console.log(error);
        })
        .finally(() => {
          setLoading(false);
        });
    };
    fetchMovieCast();
  }, [quary]);

  const handleSubmitSearch = quary => setSearchParams({ quary: quary });
  return (
    <div>
      <SearchBox onSubmit={handleSubmitSearch} />
      <MoviesList films={searchFilms} />
      {loading && <Loader />}
    </div>
  );
};

export default Movies;
