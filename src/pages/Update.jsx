import React from 'react'
import { useState, useEffect } from 'react';
import Supabase from '../config/SupabaseClient'
import { useParams, useNavigate } from 'react-router-dom'
function Update() {
  const { id } = useParams();
  const navigate = useNavigate()
  const [formError, setFormError] = useState(null);
  const [smoothie, setSmoothie] = useState({
    title: '',
    method: '',
    rating: '',
  })

  useEffect( () => {
    const fetchSmoothies = async () => {
     const {data, error}  = await Supabase
        .from('smoothies')
      .select()
      .eq('id', id)
      .single()
        if(error){
          navigate('/' , { replace: true })
        }
        if(data){
          setSmoothie(data)
        }
    }
    fetchSmoothies();
  }, [id, navigate])



  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!smoothie.title || !smoothie.method || !smoothie.rating) {
      setFormError("All fields are required");
      return;
    }

    const {  error } = await Supabase
      .from('smoothies')
      .update({ title: smoothie.title, method: smoothie.method, rating: smoothie.rating })
      .eq('id', id);

    if (error) {
      setFormError('Error updating smoothie');
    } else {
      setFormError(null);
      navigate('/');
    }
  };

  return (
    <div className='page update'>
      <form onSubmit={handleSubmit} >
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          value={smoothie.title}
          onChange={(e) => setSmoothie((prevData) => ({...prevData, title:e.target.value}))}
        />

        <label htmlFor="method">Method:</label>
        <textarea
          id="method"
          value={smoothie.method}
          onChange={(e) => setSmoothie((prevData) => ({...prevData, method:e.target.value}))}
        />

        <label htmlFor="rating">Rating:</label>
        <input
          type="number"
          id="rating"
          value={smoothie.rating}
          onChange={(e) => setSmoothie((prevData) => ({...prevData, rating: e.target.value}))}
        />

        <button>Update Smoothie Recipe</button>
        {formError && <p className="error">{formError}</p>}
      </form>
    </div>
  )
}

export default Update
