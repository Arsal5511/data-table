import React, { useEffect, useState } from 'react'
import supabase from '../config/SupabaseClient'

function Home() {

  const [fetchError, setFetchError] = useState(null)
  const [smoothies, setSmoothies ] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase
      .from('smoothies')
      .select()

      console.log('this is smoothi', data)

      if(error){
        setFetchError('could not fetch the data')
        setSmoothies(null)
        console.log(error)
      }
      if(data){
        setSmoothies(data)
        console.log(data)
        setFetchError(null)
      }
    }
    fetchData()
  }, [])
  return (
    <div className='page home'>

        {fetchError && (<p>{fetchError}</p>)}

        {smoothies && (
          <div className="smoothies">
            {smoothies.map(smoothie => (
              <p>{smoothie.title}</p>
              ))}
          </div>
        )
        }

    </div>
  )
}

export default Home
