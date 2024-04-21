import { useState } from "react";
import { useHistory } from "react-router-dom";

const Create = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [genre, setGenre] = useState("");
    const [duration, setDuration] = useState("");
    const [releasedAt, setReleasedAt] = useState("");
    const [rentalPrice, setRentalPrice] = useState("");
    const [rentalDuration, setRentalDuration] = useState("");
    const [quantity, setQuantity] = useState("");
    const [thumbnail, setThumbnail] = useState("");
    const [isPending, setIsPending]= useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const history= useHistory();
    
    const handleSubmit= (e) =>{
        e.preventDefault();

        const movie= {title, description, genre, duration, releasedAt, rentalPrice, rentalDuration, quantity };
        setIsPending(true);
        fetch('http://localhost:3000/api/vhs', {
            method:'POST',
            headers:{"Content-Type": "application/json"},
            body:JSON.stringify(movie)
        }).then(()=>{
            console.log("item added "+ JSON.stringify(movie))
            setIsPending(false);
            history.push("/");
        })
    }

    const isNumber = (value) => {
        return !isNaN(value);
    }

    const handleInputChange = (e, setter) => {
        const value = e.target.value;
        if (setter !== setTitle && setter !== setDescription) {
            if (!isNumber(value)) {
                e.target.classList.add("invalid-input");
                setErrorMessage(`Field must be a number.`);
            } else {
                e.target.classList.remove("invalid-input");
                setErrorMessage("");
            }
        } 
        setter(value);
    };

    return (
        <div className="create">
            <h2>Add a new movie!</h2> 
            <form onSubmit={handleSubmit}>
            <label htmlFor="title">Movie title:</label>
            <input id="title" name="title" type="text" value={title} onChange={(e)=> setTitle(e.target.value)}></input>
            
            <label htmlFor="description" >Movie description:</label>
            <textarea id="description" name="description" value={description} onChange={(e)=>setDescription(e.target.value)}></textarea>

            <label htmlFor="genre" >Movie genre:</label>
            <input type="text" id="genre" name="genre" value={genre} onChange={(e)=>setGenre(e.target.value)}></input>
            
            <label htmlFor="duration" >Movie duration:</label>
            <input type="text" id="duration" name="duration" value={duration} onChange={(e)=> handleInputChange(e, setDuration)}></input>

            <label htmlFor="yearOfRelease">Year of release:</label>
            <input type="text" id="yearOfRelease" name="yearOfRelease" value={releasedAt} onChange={(e)=> handleInputChange(e, setReleasedAt)}></input>

            <label htmlFor="rentalPrice">Movie rental price:</label>
            <input type="text" id="rentalPrice" name="rentalPrice" value={rentalPrice} onChange={(e)=> handleInputChange(e, setRentalPrice)}></input>

            <label htmlFor="rentalDuration">Movie rental duration:</label>
            <input type="text" id="rentalDuration" name="rentalDuration" value={rentalDuration} onChange={(e)=> handleInputChange(e, setRentalDuration)}></input>

            <label htmlFor="quantity">Movie quantity:</label>
            <input type="text" id="quantity" name="quantity" value={quantity} onChange={(e)=> handleInputChange(e, setQuantity)}></input>

            <label htmlFor="thumbnail">Movie thumbnail:</label>
            <input type="text" id="thumbnail" name="thumbnail" value={thumbnail} onChange={(e)=>setThumbnail(e.target.value)}></input> 
                
            {errorMessage && <div className="error">{errorMessage}</div>}
            { !isPending && <button>Add Movie</button>}
            { isPending && <button disabled>Adding...</button>} 
            </form>
        </div>
    );
}

export default Create;