/* eslint-disable no-undef */
import dotenv from "dotenv";
dotenv.config();
import fetch from "node-fetch";

const BASE_URL = process.env.BASE_URL;
const API_kEY = process.env.TMDB_KEY;
const FETCH_RETRY = parseInt(process.env.FETCH_RETRY);
const RETRY_DALAY = parseInt(process.env.RETRY_DALAY);

// Debug: Check if environment variables are loaded
console.log("BASE_URL:", BASE_URL);

// create the complete url, then fetch data,
// if error occurs then try again till a limit, if still error occurs throw an error
const fetchFromTmdb = async (endpoint, params = "") => {
  const url = `${BASE_URL}${endpoint}?api_key=${API_kEY}${params}`;
  let attempts = 0;

  console.log("API call to Url:", url);

  while (attempts <= FETCH_RETRY) {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        console.log("Response not ok:", response.status);
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (err) {
      console.log(`Fetch attempt ${attempts + 1} failed: ${err}`);
      attempts++;
      if (attempts >= FETCH_RETRY) throw new Error(err);
      await new Promise((res) => setTimeout(res, RETRY_DALAY));
    }
  }
};

export default fetchFromTmdb;
