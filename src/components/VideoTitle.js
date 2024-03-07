import React from "react";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import InfoIcon from "@mui/icons-material/Info";
const VideoTitle = ({ title, overview }) => {
  return (
    <>
      <div className="w-screen aspect-video absolute  lg:pt-72 md:pt-8 md:px-10   bg-gradient-to-r from-black">
        <h1 className="text-3xl md:text-5xl text-white md:pt-16">{title}</h1>
        <p className="text-white w-1/3 md:pt-6 ">{overview}</p>
        <div className="mt-8 mb-4">
          <button className="capitalize border rounded-md font-bold bg-gray-300 text-black py-2 px-5 cursor-pointer hover:bg-opacity-80">
            <PlayArrowIcon /> Play
          </button>
          <button className="capitalize  rounded-md border font-bold bg-gray-300 text-white py-2 px-5 ml-4 cursor-pointer bg-transparent">
            <InfoIcon /> More Info
          </button>
        </div>
      </div>
    </>
  );
};

export default VideoTitle;
