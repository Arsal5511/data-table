import React, { useEffect, useState } from 'react'
import supabase from '../config/SupabaseClient'

import SmoothieCard from '../components/SmoothieCard'

function Home() {
  const [fetchError, setFetchError] = useState(null)
  const [smoothies, setSmoothies] = useState(null)

  useEffect(() => {
    const fetchSmoothies = async () => {
      const {data, error} = await supabase
        .from('smoothies')
        .select()

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
  }, [])

  const handleDelete = (id) =>{
    setSmoothies(prevSmoothie => {
      return prevSmoothie.filter(smoothie => smoothie.id !== id)
    })

  }

  return (
    <div className='page home'>
      {fetchError && (<p>{fetchError}</p>)}
      {smoothies && (
        // order by buttons
        <div className="smoothie-grid">
          {smoothies.map(smoothie => (
            <SmoothieCard key={smoothie.id} smoothie={smoothie} onDelete={handleDelete} />
          ))}
        </div>
      )}
      

    </div>
  )
}

export default Home
