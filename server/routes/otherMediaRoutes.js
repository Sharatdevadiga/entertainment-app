import express from "express";
import {
  fetchRecommendations,
  fetchTrending,
} from "../controller/otherMediaController.js";

const otherMediaRouter = express.Router();

otherMediaRouter.get("/trending", fetchTrending);
otherMediaRouter.get("/recommendations", fetchRecommendations);

export default otherMediaRouter;
