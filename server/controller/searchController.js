/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import fetchFromTmdb from "../utils/fetcher.js";
import { asyncHandler } from "../utils/handlers.js";
import { defaultStatusInfo } from "../config/defaultStatusInfo.js";
import { formateMediagData } from "../utils/dataFormater.js";

const searchMovieOrTv = async function (req, type = "movie") {
  const encodedQuery = encodeURIComponent(req.query.query);
  console.log(encodedQuery);
  // const pageNum = req.body.page ? req.body.page : 1;
  const endpoint = `search/${type}`;
  const params = `&query=${encodedQuery}&include_adult=false`;

  const data = await fetchFromTmdb(endpoint, params);
  const formatedData = formateMediagData(data.results, type);
  return formatedData;
};

export const searchMovies = asyncHandler(async function (req, res, next) {
  const data = await searchMovieOrTv(req, "movie");

  return data;
}, defaultStatusInfo);

export const searchTvSeries = asyncHandler(async function (req, res, next) {
  const data = await searchMovieOrTv(req, "tv");
  return data;
}, defaultStatusInfo);

export const searchMedia = asyncHandler(async function (req, res, next) {
  const movie = await searchMovieOrTv(req, "movie");
  const tv = await searchMovieOrTv(req, "tv");

  return [...movie, ...tv];
}, defaultStatusInfo);
