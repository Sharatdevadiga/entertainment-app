/* eslint-disable react/prop-types */
import { POSTER_BASE_URL } from "../../config/config";
import { MdLocalMovies } from "react-icons/md";
import { TbDeviceTvOld } from "react-icons/tb";
import PlayButton from "./PlayButton";
import { NavLink } from "react-router-dom";
import Bookmark from "./Bookmark";

function MediaCard({ data, type = "normal" }) {
  if (type === "trending")
    return (
      <div>
        <LargeCardContainer className="group">
          <div>
            <NavLink to={`/mediaDetails/${data.type}/${data.id}`}>
              <Image posterPath={data?.poster} />
            </NavLink>

            <OverLay className="pointer-events-none" />
          </div>
          <Bookmark className="" data={data}></Bookmark>
          <PlayButton
            id={data?.id}
            mediaType={data?.type}
            className="scale-0 transition-all group-hover:scale-100"
          />
          <Descreption
            className="absolute bottom-2 left-2 w-11/12 xs:bottom-3 md:left-3"
            data={data}
          />
        </LargeCardContainer>
      </div>
    );

  if (data)
    return (
      <div>
        <SmallCardContainer>
          <div className="group relative overflow-hidden rounded-lg">
            <NavLink to={`/mediaDetails/${data.type}/${data.id}`}>
              <Image posterPath={data?.poster} />
            </NavLink>
            <OverLay className="pointer-events-none" />
            <PlayButton
              id={data?.id}
              mediaType={data?.type}
              className="scale-0 transition-all group-hover:scale-100"
            />
          </div>
          <Bookmark className="" data={data}></Bookmark>

          <Descreption className="p-2" data={data} />
        </SmallCardContainer>
      </div>
    );
}

export default MediaCard;

function OverLay({ className }) {
  return (
    <div
      className={`${className} absolute left-0 top-0 h-full w-full bg-gradient-to-b from-transparent to-stone-950`}
    ></div>
  );
}

function LargeCardContainer({ children, className }) {
  return (
    <div
      className={`${className} relative h-auto w-52 overflow-hidden rounded-lg xs:w-64 sm:w-80 md:w-96 lg:w-100`}
    >
      {children}
    </div>
  );
}

function SmallCardContainer({ children, className }) {
  return (
    <div
      className={`${className} relative flex h-auto flex-col overflow-hidden rounded-lg`}
    >
      {children}
    </div>
  );
}

function Image({ posterPath }) {
  const url = posterPath
    ? `${POSTER_BASE_URL}${posterPath}`
    : "/placeholder.jpg";
  return (
    <>
      <img
        className="w-ful rounded-lg bg-gray bg-gradient-to-b"
        src={url}
        alt={posterPath}
      />
      {!posterPath ? <OverLay className="rotate-180" /> : ""}
    </>
  );
}

function Descreption({ data, className }) {
  const { id, date, type, title, adult } = data;
  return (
    <NavLink
      to={`/mediaDetails/${type}/${id}`}
      className={`${className} cursor-pointer`}
    >
      <div className="flex gap-2 text-[10px] xs:text-[10px]">
        <p>{date ? date.split("-")[0] : "N/A"}</p>
        <p className="gap:0.5 flex items-center">
          {type === "movie" ? <MdLocalMovies /> : <TbDeviceTvOld />}
          {type.toUpperCase()}
        </p>
        <p>{adult ? "18+" : "PG"}</p>
      </div>
      <p className="text-[10px] font-semibold xs:text-[12px] md:text-[14px]">
        {title.length > 25 ? title.slice(0, 23) + "..." : title}
      </p>
    </NavLink>
  );
}
