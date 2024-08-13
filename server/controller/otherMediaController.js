/* eslint-disable no-unused-vars */
import { defaultStatusInfo } from "../config/defaultStatusInfo.js";
import { formateMediagData, randomSorter } from "../utils/dataFormater.js";
import fetchFromTmdb from "../utils/fetcher.js";
import { asyncHandler } from "../utils/handlers.js";

export const fetchTrending = asyncHandler(async (req, res, next) => {
  const endpoint = `trending/all/day`;
  const params = "&language=en-US";
  const data = await fetchFromTmdb(endpoint, params);
  return formateMediagData(data?.results || data);
}, defaultStatusInfo);

export const fetchRecommendations = asyncHandler(async (req, res, next) => {
  const MovieEndPoint = "discover/movie";
  const tvSeriesEndPoint = "discover/tv";
  const params = `&include_adult=false&language=en-US&page=1&sort_by=popularity.desc`;

  const movieData = await fetchFromTmdb(MovieEndPoint, params);
  const tvSeriesdata = await fetchFromTmdb(tvSeriesEndPoint, params);

  const movies = formateMediagData(movieData?.results.slice(0, 14), "movie");
  const tvSeries = formateMediagData(tvSeriesdata?.results.slice(0, 14), "tv");

  return randomSorter(movies, tvSeries);
}, defaultStatusInfo);
