/* eslint-disable react/prop-types */
import { FaCirclePlay } from "react-icons/fa6";

function PlayButton({ className }) {
  return (
    <div
      className={`${className} group absolute left-[50%] top-[50%] flex translate-x-[-50%] translate-y-[-50%] cursor-pointer items-center gap-3 rounded-full bg-gray-transparent px-3 py-1 transition-all backdrop:blur-md`}
    >
      <FaCirclePlay className="transition-all group-active:scale-75" />
      <span>Play</span>
    </div>
  );
}

export default PlayButton;
