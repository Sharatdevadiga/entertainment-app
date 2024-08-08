import { Route, Routes } from "react-router-dom";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import Layout from "./components/general/Layout";
import MoviesPage from "./pages/MoviesPage";
import TvShowsPage from "./pages/TvShowsPage";
import BookmarksPage from "./pages/BookmarksPage";
import MediaDetails from "./pages/MediaDetails";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="movies" element={<MoviesPage />} />
          <Route path="tv" element={<TvShowsPage />} />
          <Route path="user/bookmarks" element={<BookmarksPage />} />
        </Route>
        <Route path="mediaDetails/:type/:id" element={<MediaDetails />} />
        <Route path="signup" element={<SignupPage />} />
        <Route path="login" element={<LoginPage />} />
      </Routes>
    </div>
  );
}

export default App;
