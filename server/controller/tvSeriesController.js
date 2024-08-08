/* eslint-disable no-unused-vars */
import { extractUrlData, formateMediagData } from "../utils/dataFormater.js";
import fetchFromTmdb from "../utils/fetcher.js";
import { asyncHandler } from "../utils/handlers.js";

let statusInfo = {
  successStatusCode: 200,
  errorMessage: "page not found",
  errorStatusCode: 404,
};

export const fetchTvSeries = asyncHandler(async function (req, res, next) {
  console.log(req.params);
  const page = parseInt(req.query.page) || 1;
  const endPoint = "discover/tv";
  const params = `&include_adult=true&&language=en-US&page=${page}&sort_by=popularity.desc`;
  const data = await fetchFromTmdb(endPoint, params);
  const tvSeries = formateMediagData(data?.results, "tv");
  return tvSeries;
}, statusInfo);

export const fetchTvSeriesDetails = asyncHandler(async function (
  req,
  res,
  next
) {
  const endpoint = `tv/${req.params.id}`;
  const params = "";
  const data = await fetchFromTmdb(endpoint, params);
  return data;
},
statusInfo);

export const fetchTvSeriesCast = asyncHandler(async function (req, res, next) {
  const endpoint = `tv/${req.params.id}/credits`;
  const params = "&language=en-US";
  const data = await fetchFromTmdb(endpoint, params);
  return data.cast;
}, statusInfo);

export const fetchTvSeriesUrl = asyncHandler(async function (req, res, next) {
  const endpoint = `tv/${req.params.id}/videos`;
  const params = `&language=en-US`;
  const data = await fetchFromTmdb(endpoint, params);
  const urlData = extractUrlData(data.results);
  return urlData;
}, statusInfo);
