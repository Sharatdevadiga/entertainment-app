/* eslint-disable react/prop-types */
import { FaMagnifyingGlass } from "react-icons/fa6";

const searchBarDetails = {
  media: {
    placeholder: "Search for Movies or Tv Series",
  },
  movie: {
    placeholder: "Search for Movie",
  },
  tv: {
    placeholder: "Search for Tv Series",
  },
};

function SearchBar({ type = "media", onSearch }) {
  const searchBardata = searchBarDetails[`${type}`];

  function handleSearch(e) {
    onSearch(e.target.value);
  }

  return (
    <div className="z-40 flex w-full items-center justify-center gap-1 rounded-lg border-b-[1px] border-gray bg-gray-dark px-6 focus-within:border-stone-500">
      <FaMagnifyingGlass />
      <input
        name="searchBar"
        placeholder={searchBardata.placeholder}
        className="w-full bg-gray-dark px-4 py-2 caret-primary outline-none placeholder:opacity-60"
        onChange={handleSearch}
      />
    </div>
  );
}

export default SearchBar;
