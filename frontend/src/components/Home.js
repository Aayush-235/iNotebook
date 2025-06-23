import React from 'react'
import Notes from './Notes';


export default function Home(props) {
  const {showtAlert} = props
  return (
    <>
      <div>
        
        <Notes showtAlert={showtAlert}/>

      </div >

    </>

  )
}
