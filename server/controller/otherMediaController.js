/* eslint-disable no-unused-vars */
import { defaultStatusInfo } from "../config/defaultStatusInfo.js";
import fetchFromTmdb from "../utils/fetcher.js";
import { asyncHandler } from "../utils/handlers.js";

export const fetchTrending = asyncHandler(async function (req, res, next) {
  const endpoint = `trending/all/day`;
  const params = "&language=en-US";
  const data = await fetchFromTmdb(endpoint, params);
  return data;
}, defaultStatusInfo);
