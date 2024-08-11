/* eslint-disable react/prop-types */
import { FaCirclePlay } from "react-icons/fa6";
import { fetcher } from "../../utils/api";
import { endpoints } from "../../config/config";
import { useState } from "react";
import VideoModal from "./VideoModal";
import { toast } from "react-toastify";

function PlayButton({ className, id, mediaType = "movie" }) {
  const [urlData, setUrlData] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const endPoint =
    mediaType === "movie"
      ? `${endpoints.movies}${id}/url`
      : `${endpoints.tvSeries}${id}/url`;

  async function handleClick() {
    try {
      const data = await fetcher(endPoint);
      if (data) {
        setUrlData(data.data);
        setIsModalOpen(true);
      }
      console.log(data);
    } catch (err) {
      console.log(err);
      toast("No trailer found! try something else");
    }
  }

  return (
    <>
      <div
        onClick={handleClick}
        className={`${className} group absolute left-[50%] top-[50%] flex translate-x-[-50%] translate-y-[-50%] cursor-pointer items-center gap-3 rounded-full bg-gray-transparent px-3 py-1 transition-all backdrop:blur-md`}
      >
        <FaCirclePlay className="transition-all group-active:scale-75" />
        <span>Play</span>
      </div>
      {urlData && isModalOpen && (
        <VideoModal data={urlData} onClose={() => setIsModalOpen(false)} />
      )}
    </>
  );
}

export default PlayButton;
