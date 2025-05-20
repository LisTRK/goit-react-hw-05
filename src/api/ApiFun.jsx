import axios from 'axios';
axios.defaults.baseURL = 'https://api.themoviedb.org/3/';
const options = {
  headers: {
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhYjU3MTg5ZWQ2M2FiYWY1MTI5YzA1Yjk0YTQ5NDA5ZSIsIm5iZiI6MTc0NzQwMjgyMi45MDksInN1YiI6IjY4Mjc0MDQ2ZmMyOTA4N2M0ZWExN2IxOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ga1yG8JAcLLFWXpbszDhMLbsxe15e3UgcbA9V4S0Hb4',
  },
};

export async function searchMovieName(query) {
  const url = `search/movie?query=${query}&include_adult=false&language=en-US&page=1`;

  const res = await axios.get(url, { ...options, params: { query } });

  return {
    totalPages: res.data.total_pages,
    data: res.data.results,
  };
}

export async function searchMovieRamdom() {
  const url = `trending/movie/day?language=en-US`;

  const res = await axios.get(url, options);

  return {
    totalPages: res.data.total_pages,
    data: res.data.results,
  };
}

export async function getDetalesMovie(movieId) {
  const url = `/movie/${movieId}?language=en-US`;
  const res = await axios.get(url, options);

  return res.data;
}

export async function getReviews(movieId) {
  const url = `/movie/${movieId}/reviews?language=en-US&page=1`;
  const res = await axios.get(url, options);

  return res.data;
}

export async function getCast(movieId) {
  const url = `/movie/${movieId}/credits?language=en-US`;
  const res = await axios.get(url, options);
  return res.data;
}
