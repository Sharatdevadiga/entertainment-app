// import { createSlice } from "@reduxjs/toolkit";

// const bookmarksSlice = createSlice({
//   name: "bookmarks",
//   initialState: {
//     bookmarks: [],
//   },
//   reducers: {
//     setBookmarks: (state, action) => {
//       state.bookmarks = action.payload;
//     },
//     addBookmark: (state, action) => {
//       state.bookmarks.push(action.payload);
//     },
//     deleteBookmark: (state, action) => {
//       state.bookmarks = state.bookmarks.filter(
//         (bookmark) => bookmark.id !== action.payload,
//       );
//     },
//     clearBookmarks: (state) => {
//       state.bookmarks = [];
//     },
//   },
// });

// export const { setBookmarks, addBookmark, deleteBookmark, clearBookmarks } =
//   bookmarksSlice.actions;

// export const { reducer: bookmarksReducer } = bookmarksSlice;

// src / store / bookmarksSlice.js;
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getBookMarks } from "../../utils/api";
import { endpoints } from "../../config/config";

export const fetchBookmarks = createAsyncThunk(
  "bookmarks/fetchBookmarks",
  async (_, { rejectWithValue }) => {
    try {
      const result = await getBookMarks(endpoints.bookmark);
      if (result?.status === 401) {
        return rejectWithValue("Unauthorized");
      }

      // Store bookmarks in localStorage for persistence
      localStorage.setItem("bookmarks", JSON.stringify(result.data));

      return result.data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  },
);

const initialState = {
  data: JSON.parse(localStorage.getItem("bookmarks")) || [], // Load bookmarks from localStorage
  isLoading: false,
  isError: false,
  error: null,
};

const bookmarksSlice = createSlice({
  name: "bookmarks",
  initialState,
  reducers: {
    addBookmarkToSlice: (state, action) => {
      const bookmark = action.payload;
      if (!state.data.some((item) => item.id === bookmark.id)) {
        state.data.push(bookmark);

        // Update localStorage
        localStorage.setItem("bookmarks", JSON.stringify(state.data));
      }
    },
    removeBookmarkFromSlice: (state, action) => {
      const bookmarkId = action.payload;
      state.data = state.data.filter((item) => item.id !== bookmarkId);

      // Update localStorage
      localStorage.setItem("bookmarks", JSON.stringify(state.data));
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBookmarks.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.error = null;
      })
      .addCase(fetchBookmarks.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(fetchBookmarks.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.payload;
      });
  },
});

export const { addBookmarkToSlice, removeBookmarkFromSlice } =
  bookmarksSlice.actions;
export const { reducer: bookmarksReducer } = bookmarksSlice;
