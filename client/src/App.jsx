// import { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";
// import Loader from "./components/general/Loader";
import Layout from "./components/general/Layout";
import { lazy } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Provider } from "react-redux";
import { store } from "./store";
import UserPage from "./pages/UserPage";

// Lazy loading components
const SignupPage = lazy(() => import("./pages/SignupPage"));
const LoginPage = lazy(() => import("./pages/LoginPage"));
const HomePage = lazy(() => import("./pages/HomePage"));
const MoviesPage = lazy(() => import("./pages/MoviesPage"));
const TvShowsPage = lazy(() => import("./pages/TvShowsPage"));
const BookmarksPage = lazy(() => import("./pages/BookmarksPage"));
const MediaDetails = lazy(() => import("./pages/MediaDetails"));

function App() {
  return (
    <Provider store={store}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="movies" element={<MoviesPage />} />
          <Route path="tv" element={<TvShowsPage />} />
          <Route path="user/bookmarks" element={<BookmarksPage />} />
          <Route path="mediaDetails/:type/:id" element={<MediaDetails />} />
          <Route path="user" element={<UserPage />} />
        </Route>
        <Route path="signup" element={<SignupPage />} />
        <Route path="login" element={<LoginPage />} />
      </Routes>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition:Bounce
      />
    </Provider>
  );
}

export default App;
