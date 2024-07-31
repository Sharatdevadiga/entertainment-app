/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import fetchFromTmdb from "../utils/fetcher.js";
import { asyncHandler } from "../utils/handlers.js";

let statusInfo = {
  successStatusCode: 200,
  errorMessage: "page not found",
  errorStatusCode: 404,
};

const searchMovieOrTv = async function (req, type = "movie") {
  const encodedQuery = encodeURIComponent(req.body.query);
  const pageNum = req.body.page ? req.body.page : 1;
  const endpoint = `search/${type}`;
  const params = `&query=${encodedQuery}&include_adult=true&page=${pageNum}`;
  const data = await fetchFromTmdb(endpoint, params);
  return data;
};

export const searchMovies = asyncHandler(async function (req, res, next) {
  const data = await searchMovieOrTv(req, "movie");
  return data;
}, statusInfo);

export const searchTvSeries = asyncHandler(async function (req, res, next) {
  const data = await searchMovieOrTv(req, "tv");
  return data;
}, statusInfo);

export const searchCollection = asyncHandler(async function (req, res, next) {
  const movieData = await searchMovieOrTv(req, "movie");
  const tvSeriesData = await searchMovieOrTv(req, "tv");

  return {
    movieData,
    tvSeriesData,
  };
}, statusInfo);
