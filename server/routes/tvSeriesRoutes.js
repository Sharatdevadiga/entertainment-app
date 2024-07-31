import express from "express";
import {
  fetchOneTvSeries,
  fetchTvSeries,
  fetchTvSeriesCast,
  fetchTvSeriesUrl,
} from "../controller/tvSeriesController.js";

const tvSeriesRouter = express.Router();

tvSeriesRouter.get("/", fetchTvSeries);
tvSeriesRouter.get("/:id", fetchOneTvSeries);
tvSeriesRouter.get("/:id/cast", fetchTvSeriesCast);
tvSeriesRouter.get("/:id/url", fetchTvSeriesUrl);

export default tvSeriesRouter;
