import React, { useState } from 'react';
import { useHistory, useParams } from 'react-router-dom/cjs/react-router-dom.min';
import useFetch from '../useFetch';


function EditMovie() {
    
    const {id} = useParams();
    const {
        data: movie,
        isPending,
        error,
    } =useFetch(`http://localhost:3000/api/vhs/${id}`);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [genre, setGenre] = useState("");
    const [duration, setDuration] = useState("");
    const [releasedAt, setReleasedAt] = useState("");
    const [rentalPrice, setRentalPrice] = useState("");
    const [rentalDuration, setRentalDuration] = useState("");
    const [quantity, setQuantity] = useState("");
    const [thumbnail, setThumbnail] = useState("");
    const [editedThumbnail, setEditedThumbnail] = useState("");
    const [isWaiting, setIsWaiting] = useState(false);
     
    const history= useHistory();
    
    const handleEdit = event => {
        event.preventDefault();
        setIsWaiting(true);
        fetch(`http://localhost:3000/api/vhs/${id}`,{
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ thumbnail: editedThumbnail }) 
        })
          .then(data => {
            setIsWaiting(false);
            history.push(`/movies/${id}`); 
          })
          .catch(error => {
            console.error('Error updating movie:', error);
          });
      };
  return (
    <div className="create">
        {movie && 
          <form onSubmit={handleEdit} >
                <label htmlFor="title">Movie title:</label>
                  <input id="title" name="title" type="text" value={movie.title} onChange={(e)=> setTitle(e.target.value)}></input>
                  <label htmlFor="description" >Movie description:</label>
                  <textarea id="description" name="description" value={movie.description} onChange={(e)=>setDescription(e.target.value)}></textarea>
                  <label htmlFor="genre" >Movie genre:</label>
                  <input type="text" id="genre" name="genre" value={movie.genre} onChange={(e)=>setGenre(e.target.value)}></input>
                  <label htmlFor="duration" >Movie duration:</label>
                  <input type="text" id="duration" name="duration" value={movie.duration} onChange={(e)=>setDuration(e.target.value)}></input>
                  <label htmlFor="yearOfRelease">Year of release:</label>
                  <input type="text" id="yearOfRelease" name="yearOfRelease" value={movie.releasedAt} onChange={(e)=>setReleasedAt(e.target.value)}></input>
                  <label htmlFor="rentalPrice">Movie rental price:</label>
                  <input type="text" id="rentalPrice" name="rentalPrice" value={movie.rentalPrice} onChange={(e)=>setRentalPrice(e.target.value)}></input>
                  <label htmlFor="rentalDuration">Movie rental duration:</label>
                  <input type="text" id="rentalDuration" name="rentalDuration" value={movie.rentalDuration} onChange={(e)=>setRentalDuration(e.target.value)}></input>
                  <label htmlFor="quantity">Movie quantity:</label>
                  <input type="text" id="quantity" name="quantity" value={movie.quantity} onChange={(e)=>setQuantity(e.target.value)}></input>
                  <label htmlFor="thumbnail">Movie thumbnail:</label>
                  <input type="text" id="thumbnail" name="thumbnail" value={editedThumbnail } onChange={(e)=>setEditedThumbnail(e.target.value)}></input> 
              { !isWaiting && <button >Edit</button>}
              { isWaiting && <button disabled>Editing...</button>}
          </form>
        }
    </div>
  )
}

export default EditMovie
