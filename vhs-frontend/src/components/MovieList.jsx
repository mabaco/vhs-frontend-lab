import { Link } from "react-router-dom";

function MovieList({movies, title, search}) {
  function capitalize(str) {
    if (!str) return '';
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
  return (
    <>
    <div>
      <h2>{title}</h2>
    </div>
    <div className="movie-list">
      {movies.filter((item)=>{return search.toLowerCase()===""? item : item.title.toLowerCase().includes(search)}).map((movie) => (
        <div className="movie-preview" key={movie.id}>
          <Link to={`movies/${movie.id}`}>
            <div className="thumbnail-container">
            <img className="thumbnail" src={movie.thumbnail} alt= "Picture of a movie poster"></img>
            </div>
            <h2>{movie.title}</h2>
            <p className="movie-genre"> {capitalize(movie.genre)}</p>
            <p className="movie-rentalDuration"> Rent Duration: {movie.duration} min</p>
            <p className="movie-price">Price : {movie.rentalPrice}$</p>
          </Link>
        </div>
      ))}
    </div>
    </>
  );
}

export default MovieList;
