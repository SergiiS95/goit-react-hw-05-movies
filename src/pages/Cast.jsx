import { Loader } from 'components/Loader/Loader';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchMovieCredits } from 'services/Api';

const Cast = () => {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!movieId) return;
    const fetchMovieCast = () => {
      setLoading(true);

      fetchMovieCredits(movieId)
        .then(movieCast => {
          setCast(movieCast);
        })
        .catch(error => {
          console.log(error);
        })
        .finally(() => {
          setLoading(false);
        });
    };
    fetchMovieCast();
  }, [movieId]);

  return (
    <div>
      {loading && <Loader />}

      <ul>
        {cast.map(({ name, profile_path, character, id }) => (
          <li key={id}>
            <img
              src={
                profile_path
                  ? `https://image.tmdb.org/t/p/original/${profile_path}`
                  : 'https://upload.wikimedia.org/wikipedia/commons/d/d1/Image_not_available.png'
              }
              alt={`Poster ${name}`}
              width="100px"
            />
            <p>{name}</p>
            <p>Character: {character}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default Cast;
