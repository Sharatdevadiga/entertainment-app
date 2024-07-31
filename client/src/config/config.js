export const example_url =
  "https://api.themoviedb.org/3/discover/tv?api_key=71ca9d7b191fb64e1be0a9925148e929&include_adult=true&include_null_first_air_dates=false&language=en-US&page=1&sort_by=popularity.desc";

export const MOVIES_LIST_URL =
  "https://api.themoviedb.org/3/discover/movie?include_adult=true&include_video=true&language=en-US&page=1&sort_by=popularity.desc";

export const SERIAL_LIST_URL =
  "https://api.themoviedb.org/3/discover/tv?include_adult=true&include_null_first_air_dates=false&language=en-US&page=1&sort_by=popularity.desc";

export const MOVIE_SEARCH_URL =
  "https://api.themoviedb.org/3/search/movie?query=FAST%20AND%20FURIOUS&include_adult=false&language=en-US&page=1";

export const BASE_URL =
  "https://api.themoviedb.org/3/movie/157336?api_key=71ca9d7b191fb64e1be0a9925148e929&append_to_response=videos,images";

//   MAIN MOVIE
export const Main_movie =
  "https://api.themoviedb.org/3/search/movie?query=Jack+Reacher&api_key=71ca9d7b191fb64e1be0a9925148e929";

export const Movie_details =
  "https://api.themoviedb.org/3/movie/343611?api_key=71ca9d7b191fb64e1be0a9925148e929";

export const append_req =
  "https://api.themoviedb.org/3/movie/157336?api_key=${API_kEY}&append_to_response=videos,credits";

//   images
// base_url, a file_size and a file_path.
export const imageUrl =
  "https://image.tmdb.org/t/p/w500/1E5baAaEse26fej7uHcjOgEE2t2.jpg";

export const imageUrlOriginal =
  "https://image.tmdb.org/t/p/original/9l1eZiJHmhr5jIlthMdJN5WYoff.jpg";

export const searchCollection =
  "https://api.themoviedb.org/3/search/collection?query=fast%20and%20furious&include_adult=true&language=en-US&page=1";

// cast
export const movieCast =
  "https://api.themoviedb.org/3/movie/343611/credits?language=en-US";

export const videos =
  "https://api.themoviedb.org/3/movie/movie_id/videos?language=en-US";

export const providers =
  "https://api.themoviedb.org/3/movie/{movie_id}/watch/providers";
