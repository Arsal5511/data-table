import React from 'react'
import { useParams } from 'react-router-dom'
function Update() {
  const { id} = useParams();
  return (
    <div className='page update'>
      update - {id}
    </div>
  )
}

export default Update
