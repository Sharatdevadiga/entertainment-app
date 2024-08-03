import express from "express";
import { fetchTrending } from "../controller/otherMediaController.js";

const otherMediaRouter = express.Router();

otherMediaRouter.get("/trending", fetchTrending);

export default otherMediaRouter;
