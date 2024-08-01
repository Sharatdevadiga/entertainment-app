import mongoose, { Schema } from "mongoose";

const userBookmarkSchema = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User Id must be specified for a bookmark"],
    },
    mediaId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Media",
      required: [true, "A bookmark must have a media Id"],
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
  },
  { toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

// Define a compound index on userId and mediaId to ensure uniqueness
userBookmarkSchema.index({ userId: 1, mediaId: 1 }, { unique: true });

const UserBookmark = mongoose.model("UserBookmark", userBookmarkSchema);
export default UserBookmark;
