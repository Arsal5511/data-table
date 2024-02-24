import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Supabase from '../config/SupabaseClient'

function Create() {
  const navigate = useNavigate();
  const [data, setData] = useState({
    title: "",
    method: "",
    rating: "",
  });
const [formError, setFormError] = useState(null);

const handleSubmit =(e) =>{
  e.preventDefault();
   
  if(!data.title || !data.method || !data.rating){
    setFormError("All fields are required")
    return
  }

  Supabase
  .from('smoothies')
  .insert([
      {
        title: data.title,
        method: data.method,
        rating: data.rating,
      }
    ])

  .then(({data: newEntry , error}) => {
    if(error){
      setFormError('Error creating smoothie')
    }
    else{
      setFormError(null)
      navigate('/')}
  
  });
    

}

  return (
    <div className="page create">
      <form
       onSubmit={handleSubmit}
      >
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          value={setData.title}
          onChange={(e) => setData((prevData) => ({...prevData, title:e.target.value}))}
        />

        <label htmlFor="method">Method:</label>
        <textarea
          id="method"
          value={setData.method}
          onChange={(e) => setData((prevData) => ({...prevData, method:e.target.value}))}
        />

        <label htmlFor="rating">Rating:</label>
        <input
          type="number"
          id="rating"
          value={setData.rating}
          onChange={(e) => setData((prevData) => ({...prevData, rating: e.target.value}))}
        />

        <button>Create Smoothie Recipe</button>

        {formError && <p className="error">{formError}</p>}
      </form>
    </div>
  );
}

export default Create;
