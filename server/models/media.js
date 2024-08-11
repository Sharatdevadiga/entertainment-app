import mongoose, { Schema } from "mongoose";

// Overview and Posterpath are stored, incase if needed in future
const mediaSchema = new Schema(
  {
    id: {
      type: Number,
      unique: true,
      required: [true, "Tmdb Id must be specified for a media"],
    },
    poster: {
      type: String,
      default: null,
    },
    title: {
      type: String,
      required: [true, "Media must have a title"],
    },
    type: {
      type: String,
      enum: ["movie", "tv"],
      required: true,
      default: "movie",
    },
    adult: {
      type: Boolean,
      required: true,
      default: false,
    },
    date: Date,
    createdAt: {
      type: Date,
      default: Date.now(),
    },
  },
  { toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

const Media = mongoose.model("Media", mediaSchema);
export default Media;
