import { Loader } from 'components/Loader/Loader';
import { MoviesList } from 'components/MoviesList/MoviesList';
import { useEffect, useState } from 'react';
import { fetchTrending } from 'services/Api';

const HomePage = () => {
  const [movieTrends, setMovieTrends] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchTrendingFilms = () => {
      setLoading(true);
      fetchTrending()
        .then(trendingFilm => setMovieTrends(trendingFilm))
        .catch(error => console.log(error))
        .finally(() => setLoading(false));
    };
    fetchTrendingFilms();
  }, []);

  return (
    <div>
      <h3>Trending today</h3>
      <MoviesList films={movieTrends} />
      {loading && <Loader />}
    </div>
  );
};

export default HomePage;
