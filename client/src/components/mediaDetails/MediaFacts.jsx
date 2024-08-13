/* eslint-disable react/prop-types */
function MediaFacts({ data, type }) {
  let languages = [];
  data?.spoken_languages.forEach((lng) => languages.push(lng.name));

  if (type === "movie")
    return (
      <div className="flex flex-wrap justify-between gap-3 text-body-s">
        <div>
          <p className="opacity-60">Length</p>
          <p>{data?.runtime}min.</p>
        </div>
        <div>
          <p className="opacity-60">Languases</p>
          <p>{languages.join(", ")}</p>
        </div>
        <div>
          <p className="opacity-60">Year</p>
          <p>{data?.release_date.split("-")[0]}</p>
        </div>
        <div>
          <p className="opacity-60">Status</p>
          <p>{data?.status || "N/A"}</p>
        </div>
      </div>
    );

  return (
    <div className="flex flex-wrap justify-between gap-3 text-body-s">
      <div>
        <p className="opacity-60">Languases</p>
        <p>{languages.join(", ") || "N/A"}</p>
      </div>
      <div>
        <p className="opacity-60">First Air</p>
        <p>{data?.first_air_date || "N/A"}</p>
      </div>
      <div>
        <p className="opacity-60">First Air</p>
        <p>{data?.last_air_date || "N/A"}</p>
      </div>
      <div>
        <p className="opacity-60">Status</p>
        <p>{data?.status || "N/A"}</p>
      </div>
    </div>
  );
}

export default MediaFacts;
