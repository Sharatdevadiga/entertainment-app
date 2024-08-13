/* eslint-disable no-undef */
import fetch from "node-fetch";

const BASE_URL = process.env.BASE_URL;
const API_kEY = process.env.TMDB_KEY;
const FETCH_RETRY = parseInt(process.env.FETCH_RETRY);
const RETRY_DALAY = parseInt(process.env.RETRY_DALAY);

// create the complete url, then fetch data,
// if error occurs then try again till a limit, if still error occurs throw an error
const fetchFromTmdb = async (endpoint, params = "") => {
  const url = `${BASE_URL}${endpoint}?api_key=${API_kEY}${params}`;
  let attempts = 0;

  while (attempts <= FETCH_RETRY) {
    try {
      const response = await fetch(url);
      if (!response.ok)
        throw new Error(`HTTP error! status: ${response.status}`);
      const data = await response.json();
      return data;
    } catch (err) {
      attempts++;
      if (attempts >= FETCH_RETRY) throw new Error(err);
      await new Promise((res) => setTimeout(res, RETRY_DALAY));
    }
  }
};

export default fetchFromTmdb;
