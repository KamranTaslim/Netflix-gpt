import React from "react";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import InfoIcon from "@mui/icons-material/Info";
const VideoTitle = ({ title, overview }) => {
  return (
    <>
      <div className="w-screen aspect-video absolute  lg:pt-72 md:p-8 bg-gradient-to-r from-black">
        <h1 className="text-3xl md:text-6xl text-white ">{title}</h1>
        <p className="text-white w-1/3 pt-10">{overview}</p>
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
