import React, { useContext, useEffect } from 'react'
import noteContext from '../context/notes/noteContext'

export default function About() {
  const a = useContext(noteContext)
  
  useEffect(()=>{
    a.update()
    // eslint-disable-next-line
  },[])

  return (
    <div>
      this is about {a.state.name} and his class is {a.state.class} and his age is {a.state.age}
    </div>
  )
}
