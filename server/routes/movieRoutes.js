import express from "express";
import {
  fetchMovieCast,
  fetchMovies,
  fetchMovieUrl,
  fetchMovieDetails,
} from "../controller/moviesController.js";

const movieRouter = express.Router();

movieRouter.get("/", fetchMovies);
movieRouter.get("/:id", fetchMovieDetails);
movieRouter.get("/:id/cast", fetchMovieCast);
movieRouter.get("/:id/url", fetchMovieUrl);

export default movieRouter;
