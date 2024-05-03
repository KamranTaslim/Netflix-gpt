import React from "react";
import GptSearchBar from "./GptSearchBar";
import GptMovieSuggestions from "./GptMovieSuggestions";
import { BG_URL } from "../utils/constants";

function GptSearch() {
  return (
    <div className="w-full h-screen ">
      <img
        className="sm:block absolute -z-10 w-full h-full object-cover"
        src={BG_URL}
        alt="netflix logo"
      />
      <GptSearchBar />
      <GptMovieSuggestions />
    </div>
  );
}

export default GptSearch;
