import express from "express";
import {
  fetchTvSeries,
  fetchTvSeriesCast,
  fetchTvSeriesDetails,
  fetchTvSeriesUrl,
} from "../controller/tvSeriesController.js";

const tvSeriesRouter = express.Router();

tvSeriesRouter.get("/", fetchTvSeries);
tvSeriesRouter.get("/:id", fetchTvSeriesDetails);
tvSeriesRouter.get("/:id/cast", fetchTvSeriesCast);
tvSeriesRouter.get("/:id/url", fetchTvSeriesUrl);

export default tvSeriesRouter;
