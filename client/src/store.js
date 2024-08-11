import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./features/auth/authSlice";
import { bookmarksReducer } from "./features/bookmark/bookmarkSlice";

export const store = configureStore({
  reducer: {
    bookmarks: bookmarksReducer,
    auth: authReducer,
  },
});
