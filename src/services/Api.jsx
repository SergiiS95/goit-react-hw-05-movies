import axios from 'axios';

const URL = 'https://api.themoviedb.org/3';
const API_KEY = '0b7ed72c0b07bc683ffc3b8a0e430792';

export const fetchTrending = async () => {
  const response = await axios.get(
    `${URL}/trending/movie/day?api_key=${API_KEY}`
  );
  return response.data.results;
};

export const fetchSearchMovies = async quare => {
  const response = await axios.get(
    `${URL}/search/movie?api_key=${API_KEY}&query=${quare}`
  );
  return response.data.results;
};

export const fetchMoviesDetails = async movieId => {
  const response = await axios.get(
    `${URL}/movie/${movieId}?api_key=${API_KEY}`
  );
  return response.data;
};

export const fetchMovieCredits = async movieId => {
  const response = await axios.get(
    `${URL}/movie/${movieId}/credits?api_key=${API_KEY}`
  );
  return response.data.cast;
};

export const fetchMovieReviews = async movieId => {
  const response = await axios.get(
    `${URL}/movie/${movieId}/reviews?api_key=${API_KEY}`
  );
  return response.data.results;
};
