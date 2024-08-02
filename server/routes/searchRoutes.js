import express from "express";
import {
  searchMedia,
  searchMovies,
  searchTvSeries,
} from "../controller/searchController.js";
const searchRouter = express.Router();

searchRouter.get("/", searchMedia);
searchRouter.get("/movie", searchMovies);
searchRouter.get("/tvSeries", searchTvSeries);

export default searchRouter;
