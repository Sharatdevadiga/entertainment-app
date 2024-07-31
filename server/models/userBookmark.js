import mongoose, { Schema } from "mongoose";

const userBookmarkSchema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "User Id must be specified for a bookmark"],
  },
  bookmarks: {
    movies: {
      type: Map,
      of: Number,
    },
    tvSeries: {
      type: Map,
      of: Number,
    },
  },
});

const UserBookmark = mongoose.model("UserBookmark", userBookmarkSchema);
export default UserBookmark;
