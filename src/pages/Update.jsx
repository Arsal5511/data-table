import React from 'react'
import { useState, useEffect } from 'react';
import Supabase from '../config/SupabaseClient'
import { useParams, useNavigate } from 'react-router-dom'
function Update() {
  const { id } = useParams();
  const navigate = useNavigate()
  const [smoothie, setSmoothie] = useState({
    title: '',
    method: '',
    rating: '',
  })
  console.log(smoothie)

  useEffect( () => {
    const fetchSmoothies = async () => {
      try{
     const {data, error}  = await Supabase
        .from('smoothies')
      .select()
      .eq('id', id)
      .single()
        if(error){
          console.log(error)
          navigate('/' + { replace: true })
        }
        if(data){
          setSmoothie(data)
          console.log(data)
        }}catch (error){
          navigate('/', { replace: true });
          }
    }
    fetchSmoothies();
  }, [id, navigate])

  return (
    <div className='page update'>
      <form>
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          value={setSmoothie.title}
          onChange={(e) => setSmoothie((prevData) => ({...prevData, title:e.target.value}))}
        />

        <label htmlFor="method">Method:</label>
        <textarea
          id="method"
          value={setSmoothie.method}
          onChange={(e) => setSmoothie((prevData) => ({...prevData, method:e.target.value}))}
        />

        <label htmlFor="rating">Rating:</label>
        <input
          type="number"
          id="rating"
          value={setSmoothie.rating}
          onChange={(e) => setSmoothie((prevData) => ({...prevData, rating: e.target.value}))}
        />

        <button>Update Smoothie Recipe</button>

      </form>
    </div>
  )
}

export default Update
