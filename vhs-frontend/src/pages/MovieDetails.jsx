 import { useHistory } from "react-router-dom";
import useFetch from "../useFetch";
import { Link, useParams } from "react-router-dom/cjs/react-router-dom.min";
const MovieDetails= ()=>{

    const {id} = useParams();
    const {data: movie, error, isPending}= useFetch(`http://localhost:3000/api/vhs/${id}`);
    const history= useHistory();
    const handleDelete= () => {
        fetch('http://localhost:3000/api/vhs/'+ id, {method: "DELETE"
        }).then(() => {
            history.push("/");
        })
    }

    return(
        <div className="movie-details">
            {isPending && <div>Loading...</div>}
            {error && <div> {error}</div>}
            {movie && (
                <article>
                    <h2>{movie.title}</h2>
                    <div className="movie-head">
                        <div className="thumbnail-details-container"><img className="thumbnail" src= {movie.thumbnail} alt="movie thumbnail"></img></div>
                        
                            <div className="movie-info">
                            <p>Year of release: {movie.releasedAt}</p>
                            <p>Genre: {movie.genre}</p>
                            <p>Duration: {movie.duration} min</p>
                            
                                <p>Rent duration: {movie.rentalDuration} Days </p>
                                <p>Quantity: {movie.quantity} in stock</p>
                                <p>Rent price: {movie.rentalPrice}$</p>
                                
                            </div>
                        
                    </div>
                    
                    <div>
                        <p>{movie.description}</p>
                    </div>
                    <button className="button" onClick={handleDelete}>Delete</button>
                    <Link className="button" to={`/editMovie/${movie.id}`}>Edit</Link>
                </article>
            )}
        </div>
    )
};

export default MovieDetails;

