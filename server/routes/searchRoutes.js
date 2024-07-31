import express from "express";
import {
  searchCollection,
  searchMovies,
  searchTvSeries,
} from "../controller/searchController.js";
const searchRouter = express.Router();

searchRouter.get("/", searchCollection);
searchRouter.get("/movie", searchMovies);
searchRouter.get("/tvSeries", searchTvSeries);

export default searchRouter;
