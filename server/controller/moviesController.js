/* eslint-disable no-unused-vars */
import fetchFromTmdb from "../utils/fetcher.js";
import { asyncHandler } from "../utils/handlers.js";
import { defaultStatusInfo } from "../config/defaultStatusInfo.js";
import { extractUrlData, formateMediagData } from "../utils/dataFormater.js";

export const fetchMovies = asyncHandler(async function (req, res, next) {
  const page = parseInt(req.query.page) || 1;
  const endPoint = "discover/movie";
  const params = `&include_adult=true&include_video=true&language=en-US&page=${page}&sort_by=popularity.desc`;
  const data = await fetchFromTmdb(endPoint, params);
  const movies = formateMediagData(data?.results, "movie");
  return movies;
}, defaultStatusInfo);

export const fetchMovieDetails = asyncHandler(async function (req, res, next) {
  const endpoint = `movie/${req.params.id}`;
  // const appendTo = "&append_to_response=videos";
  const params = "";
  const data = await fetchFromTmdb(endpoint, params);
  return data;
}, defaultStatusInfo);

export const fetchMovieCast = asyncHandler(async function (req, res, next) {
  const endpoint = `movie/${req.params.id}/credits`;
  const params = "&language=en-US";
  const data = await fetchFromTmdb(endpoint, params);
  console.log(data.cast);
  return data.cast;
}, defaultStatusInfo);

export const fetchMovieUrl = asyncHandler(async function (req, res, next) {
  const endpoint = `movie/${req.params.id}/videos`;
  const params = `&language=en-US`;
  const data = await fetchFromTmdb(endpoint, params);
  const urlData = extractUrlData(data.results);
  return urlData;
}, defaultStatusInfo);
