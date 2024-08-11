import mongoose from "mongoose";
import { errorHandler, successHandler } from "../utils/handlers.js";
import Media from "../models/media.js";
import UserBookmark from "../models/userBookmark.js";

function createMediaInstance(data) {
  const mediaData = {
    id: data.id,
    poster: data?.poster || "",
    title: data?.title || "",
    type: data?.type || "movie",
    adult: data?.adult ? data.adult : false,
    date: data?.releaseDate || "",
  };
  return new Media(mediaData);
}

export const addUserBookmark = async function (req, res) {
  // console.log(req.body);
  const userId = req.user._id;
  const id = req.body.id;

  // CREATE A TRANSACTION TO ENSURE CONSISTENCY
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    // 1. CREATE AND SAVE A NEW MEDIA IF ITS NOT IN DATABASE
    let media = await Media.findOne({ id }).session(session);
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
    successHandler(res, 201, media);
    // next();
  } catch (err) {
    // 5. ON FAILED TRANSACTION ABORT AND END IT
    await session.abortTransaction();
    session.endSession();

    // 6. SEND ERROR RESPONSE
    errorHandler(res, 500, "Error adding bookmark", err);
  }
};

export const deleteUserBookmark = async function (req, res) {
  const userId = req.user._id;
  const { mediaId } = req.body;

  try {
    const data = await UserBookmark.findOneAndDelete({ userId, mediaId });
    console.log(data);
    if (data === null) {
      return errorHandler(res, 404, "No bookmark found");
    }

    successHandler(res, 200, []);
    // next();
  } catch (err) {
    errorHandler(res, 500, "Failed to remove the bookmark", err);
  }
};

export const getUserBookMarks = async function (req, res) {
  const userId = req.user._id;
  try {
    const userBookmarks = await UserBookmark.find({ userId })
      .populate("mediaId")
      .select("-_id -userId");

    const bookmarks = userBookmarks.map((bookmark) => bookmark.mediaId);
    successHandler(res, 200, bookmarks);
    // next();
  } catch (err) {
    errorHandler(res, 500, "Failed to get user bookmarks", err);
  }
};
