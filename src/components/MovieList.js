import React from "react";
import MovieCard from "./MovieCard";

const MovieList = ({ title, movies }) => {
  return (
    <div>
      <h1 className="font-sans font-semibold md:text-xl p-4 capitalize text-white">
        {title}
      </h1>
      <div className="w-full h-full overflow-x-scroll whitespace-nowrap scrollbar-hide">
        {movies &&
          movies.map((movie) => (
            <MovieCard key={movie.id} posterPath={movie.poster_path} />
          ))}
      </div>
    </div>
  );
};

export default MovieList;
