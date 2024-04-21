import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';

const EditMovie = () => {
  const { id } = useParams();
  const history = useHistory();
  const [formData, setFormData] = useState({});
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);
  const [inputError, setInputError] = useState('');

  useEffect(() => {
    fetch(`http://localhost:3000/api/vhs/${id}`)
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      return response.json();
    })
    .then(data => {
      setFormData(data);
      setIsPending(false);
      setError(null);
    })
    .catch(error => {
      setIsPending(false);
      setError(error.message);
    });
  }, [id]);
    
  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  
    if ((name === 'duration' || name === 'releasedAt' || name === 'rentalPrice' || name === 'rentalDuration' || name === 'quantity') && !/^\d+$/.test(value)) {
      e.target.classList.add("invalid-input");
    } else {
      e.target.classList.remove("invalid-input");
    }
  
    const formInputs = Array.from(document.querySelectorAll("input"));
    const hasInvalidInput = formInputs.some(input => input.classList.contains("invalid-input"));
    setInputError(hasInvalidInput ? 'Field must not contain string' : '');
  };

  const handleEdit = event => {
    event.preventDefault();
    fetch(`http://localhost:3000/api/vhs/${id}`,{
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData) 
    }).then(response => response.json())
      .then(history.push(`/movies/${id}`))
      .catch(error => {
        console.error('Error updating movie:', error);
      });
  };
  if (isPending) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="create">
      <form onSubmit={handleEdit} >
        <label>Title:</label>
        <input type="text" name="title" defaultValue={formData.title || ''} onChange={handleChange} required/>
        <label htmlFor="description" >Movie description:</label>
        <textarea id="description" name="description" value={formData.description || ''} onChange={handleChange} required></textarea> 
        <label htmlFor="genre" >Movie genre:</label>
        <input type="text" id="genre" name="genre" value={formData.genre || ''} onChange={handleChange} required></input>
        <label htmlFor="duration" >Movie duration:</label>
        <input type="text" id="duration" name="duration" value={formData.duration || ''} onChange={handleChange} required></input>
        <label htmlFor="releasedAt">Year of release:</label>
        <input type="text" id="releasedAt" name="releasedAt" value={formData.releasedAt || ''} onChange={handleChange} required></input>
        <label htmlFor="rentalPrice">Movie rental price:</label>
        <input type="text" id="rentalPrice" name="rentalPrice" value={formData.rentalPrice || ''} onChange={handleChange} required></input>
        <label htmlFor="rentalDuration">Movie rental duration:</label>
        <input type="text" id="rentalDuration" name="rentalDuration" value={formData.rentalDuration || ''} onChange={handleChange} required></input>
        <label htmlFor="quantity">Movie quantity:</label>
        <input type="text" id="quantity" name="quantity" value={formData.quantity || ''} onChange={handleChange} required></input>
        <label htmlFor="thumbnail">Movie thumbnail:</label>
        <input type="text" id="thumbnail" name="thumbnail" value={formData.thumbnail || ''}  onChange={handleChange}></input> 
        {inputError && <div className="error">{inputError}</div>}
        {inputError && <button disabled type="submit">Cant submit</button>}
        {!inputError && <button  type="submit">Submit</button>}
      </form>
         <button className="return-btn" onClick={()=>{history.go(-1)}} >Go back</button>
    </div>
  )
}

export default EditMovie
