/* eslint-disable no-unused-vars */
import fetchFromTmdb from "../utils/fetcher.js";
import { asyncHandler } from "../utils/handlers.js";

let statusInfo = {
  successStatusCode: 200,
  errorMessage: "page not found",
  errorStatusCode: 404,
};

export const fetchTvSeries = asyncHandler(async function (req, res, next) {
  const page = req.body.page ? req.body.page : 1;
  const endPoint = "discover/tv";
  const params = `&include_adult=true&&language=en-US&page=${page}&sort_by=popularity.desc`;
  const data = await fetchFromTmdb(endPoint, params);
  const movies = data?.results.slice(0, 14);
  return movies;
}, statusInfo);

export const fetchOneTvSeries = asyncHandler(async function (req, res, next) {
  const endpoint = `tv/${req.params.id}`;
  const params = "";
  const data = await fetchFromTmdb(endpoint, params);
  return data;
}, statusInfo);

export const fetchTvSeriesCast = asyncHandler(async function (req, res, next) {
  const endpoint = `tv/${req.params.id}/credits`;
  const params = "&language=en-US";
  const data = await fetchFromTmdb(endpoint, params);
  return data;
}, statusInfo);

export const fetchTvSeriesUrl = asyncHandler(async function (req, res, next) {
  const endpoint = `tv/${req.params.id}/videos`;
  const params = `&language=en-US`;
  const data = await fetchFromTmdb(endpoint, params);
  return data;
}, statusInfo);
