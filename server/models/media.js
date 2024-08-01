import mongoose, { Schema } from "mongoose";

// Overview and Posterpath are stored, incase if needed in future
const mediaSchema = new Schema({
  tmdbId: {
    type: Number,
    unique: true,
    required: [true, "Tmdb Id must be specified for a media"],
  },
  mediaType: {
    type: String,
    enum: ["movie", "tv"],
    required: true,
    default: "movie",
  },
  title: {
    type: String,
    required: [true, "Media must have a title"],
  },
  imagePath: {
    type: String,
  },
  adult: {
    type: Boolean,
    retuired: true,
    default: false,
  },
  releaseDate: Date,
  posterPath: String,
  overview: String,
});

const Media = mongoose.model("Media", mediaSchema);
export default Media;
