import React, { useContext } from 'react'
import noteContext from '../context/notes/noteContext';

export default function Home() {

  const context = useContext(noteContext);
  const {notes, setNotes} = context


  return (
    <>
      <div>
        <div className="container">

          <h1 className='my-3'>Add Note</h1>

          <form>
            <div className="mb-3">
              <label for="exampleInputEmail1" className="form-label">Email address</label>
              <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
              <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
            </div>
            <div className="mb-3">
              <label for="exampleInputPassword1" className="form-label">Password</label>
              <input type="password" className="form-control" id="exampleInputPassword1" />
            </div>
            <div className="mb-3 form-check">
              <input type="checkbox" className="form-check-input" id="exampleCheck1" />
              <label className="form-check-label" for="exampleCheck1">Check me out</label>
            </div>
            <button type="submit" className="btn btn-primary my-3">Submit</button>
          </form>


        </div>
        <div className="container">

          <h1>Your Notes</h1>
          {
            notes.map((notes)=>{
              return notes.title
            })
          }
        </div>

      </div >

    </>

  )
}
