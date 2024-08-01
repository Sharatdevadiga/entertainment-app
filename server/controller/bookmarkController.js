import mongoose from "mongoose";
import { errorHandler, successHandler } from "../utils/handlers.js";
import Media from "../models/media.js";
import UserBookmark from "../models/userBookmark.js";

function createMediaInstance(data) {
  const mediaData = {
    tmdbId: data.tmdbId,
    mediaType: data?.mediaType || "movie",
    title: data?.title || "",
    imagePath: data?.imagePath || "",
    adult: data?.adult ? data.adult : false,
    releaseDate: data?.releaseDate || "",
    posterPath: data?.posterPath || "",
    overview: data?.overview || "",
  };
  return new Media(mediaData);
}

export const addUserBookmark = async function (req, res, next) {
  const userId = req.user._id;
  const { tmdbId } = req.body;

  // CREATE A TRANSACTION TO ENSURE CONSISTENCY
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    // 1. CREATE AND SAVE A NEW MEDIA IF ITS NOT IN DATABASE
    let media = await Media.findOne({ tmdbId }).session(session);
    if (!media) media = createMediaInstance(req.body);
    await media.save({ session });

    // 2. CREATE A NEW USERBOOKMARK
    let userBookmark = await UserBookmark.findOne({
      userId,
      mediaId: media._id,
    }).session(session);

    if (!userBookmark) {
      const userBookmark = new UserBookmark({ userId, mediaId: media._id });
      await userBookmark.save({ session });
    }

    // 3. IF EVERYTHING IS OK, COMMIT AND END TRANSACTION
    await session.commitTransaction();
    session.endSession();

    // 4. SEND SUCCESSRESPONSE AND GOTO NEXT MIDDLEWARE
    successHandler(res, 200, media);
    next();
  } catch (err) {
    // 5. ON FAILED TRANSACTION ABORT AND END IT
    await session.abortTransaction();
    session.endSession();

    // 6. SEND ERROR RESPONSE
    errorHandler(res, 500, "Error adding bookmark", err);
  }
};

export const deleteUserBookmark = async function (req, res, next) {
  const userId = req.user._id;
  const { mediaId } = req.body;

  try {
    await UserBookmark.deleteOne({ userId, mediaId });

    successHandler(res, 200, []);
    next();
  } catch (err) {
    errorHandler(res, 500, "Failed to remove the bookmark", err);
  }
};

export const getUserBookMarks = async function (req, res, next) {
  const userId = req.user._id;
  try {
    const userBookmarks = await UserBookmark.find({ userId })
      .populate("mediaId")
      .select("-_id -userId");

    if (!userBookmarks || userBookmarks.length === 0) {
      return errorHandler(res, 404, "User has no bookmarks");
    }
    successHandler(res, 200, userBookmarks);
    next();
  } catch (err) {
    errorHandler(res, 500, "Failed to get user bookmarks", err);
  }
};
