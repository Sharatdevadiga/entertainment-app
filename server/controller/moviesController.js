/* eslint-disable no-unused-vars */
import fetchFromTmdb from "../utils/fetcher.js";
import { asyncHandler } from "../utils/handlers.js";

let statusInfo = {
  successStatusCode: 200,
  errorMessage: "page not found",
  errorStatusCode: 404,
};

export const fetchMovies = asyncHandler(async function (req, res, next) {
  const page = req.body.page ? req.body.page : 1;
  const endPoint = "discover/movie";
  const params = `&include_adult=true&include_video=true&language=en-US&page=${page}&sort_by=popularity.desc`;
  const data = await fetchFromTmdb(endPoint, params);
  const movies = data?.results.slice(0, 14);
  return movies;
}, statusInfo);

export const fetchOneMovie = asyncHandler(async function (req, res, next) {
  const endpoint = `movie/${req.params.id}`;
  // const appendTo = "&append_to_response=videos";
  const params = "";
  const data = await fetchFromTmdb(endpoint, params);
  return data;
}, statusInfo);

export const fetchMovieCast = asyncHandler(async function (req, res, next) {
  const endpoint = `movie/${req.params.id}/credits`;
  const params = "&language=en-US";
  const data = await fetchFromTmdb(endpoint, params);
  return data;
}, statusInfo);

export const fetchMovieUrl = asyncHandler(async function (req, res, next) {
  // https://api.themoviedb.org/3/movie/movie_id/videos?language=en-US
  const endpoint = `movie/${req.params.id}/videos`;
  const params = `&language=en-US`;
  const data = await fetchFromTmdb(endpoint, params);
  return data;
}, statusInfo);
