import React, { useEffect, useState } from 'react'
import supabase from '../config/SupabaseClient'

import SmoothieCard from '../components/SmoothieCard'

function Home() {
  const [fetchError, setFetchError] = useState(null)
  const [smoothies, setSmoothies] = useState(null)
  const [orderBy, setOrderBy] = useState('created_at')


  useEffect(() => {
    const fetchSmoothies = async () => {
      const {data, error} = await supabase
        .from('smoothies')
        .select()
        .order(orderBy, { ascending: false })

        if(error){
          setFetchError('Could not fetch the smoothies')
          setSmoothies(null)
          console.log(error)
        }
        if(data) {
          setSmoothies(data)
          setFetchError(null)
        }

    }
    fetchSmoothies();
  }, [orderBy])

  const handleDelete = (id) =>{
    setSmoothies(prevSmoothie => {
      return prevSmoothie.filter(smoothie => smoothie.id !== id)
    })

  }

  return (
    <div className='page home'>
      {fetchError && (<p>{fetchError}</p>)}
      {smoothies && (
        <div className="smoothies">
          <div className="order-by">
            <p>Order by:</p> 
            <button onClick={() => setOrderBy('created_at')} >Time Create</button>
            <button onClick={() => setOrderBy('title')} >Title</button>
            <button onClick={() => setOrderBy('rating')} >Rating</button>
            {orderBy}
            
          </div>

        <div className="smoothie-grid">
          {smoothies.map(smoothie => (
            <SmoothieCard key={smoothie.id} smoothie={smoothie} onDelete={handleDelete} />
          ))}
        </div>
        </div>

      )}
      

    </div>
  )
}

export default Home
