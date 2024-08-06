import BoxName from "./BoxName";

/* eslint-disable react/prop-types */
function Genres({ mediaDetails }) {
  return (
    <div className="space-y-2">
      <p>Genres</p>
      <div className="flex flex-wrap gap-3">
        {mediaDetails.genres.map((genre) => (
          <BoxName type="filled" key={genre.id}>
            {genre.name}
          </BoxName>
        ))}
      </div>
    </div>
  );
}

export default Genres;
