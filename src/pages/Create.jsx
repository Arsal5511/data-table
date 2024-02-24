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
console.log(data)
const [formError, setFormError] = useState(null);
const {title, method, rating} = data

const handleSubmit =(e) =>{
  e.preventDefault();
   
  if(!title || !method || !rating){
    setFormError("All fields are required")
    return
  }
  const {smoothie, error }= Supabase
  .from('smoothies')
  .insert([
      {title, method, rating}
    ])

    if(error){
      console.log(error)
      setFormError('Error creating smoothie')
    }
    if(smoothie){
      setFormError(null)
      console.log(smoothie)
      navigate('/')

    }
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
