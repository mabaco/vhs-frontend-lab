import React, { useState } from "react";
import useFetch from "../useFetch";
import MovieList from "../components/MovieList";
const Home = () => {
  const [search, setSearch] = useState("");

  const {
    data: movies,
    isPending,
    error,
  } = useFetch('http://localhost:3000/api/vhs');
  
  return (
    <div className="home">
      <form >
        <input 
          id="movie-searchbox" 
          name="movie-searchbox"
          placeholder="enter search"
          onChange={(e)=>setSearch(e.target.value)} 
        ></input>
      </form>
      {isPending && <div>Loading...</div>}
      {error && <div>{error}</div>}
      {movies && <MovieList movies={movies} search={search} title="All movies!" />}
    </div>
  );
};

export default Home;
