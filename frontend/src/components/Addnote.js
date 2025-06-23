import React, { useContext, useState } from 'react'
import noteContext from '../context/notes/noteContext';

export default function Addnote(props) {
    const context = useContext(noteContext);
    const { addNote } = context
    const [note, setNote] = useState({title : "", description : "", tag: ""})

    const handleClick = (e) => {
        e.preventDefault()
        addNote(note.title, note.description, note.tag)
        setNote({title : "", description : "", tag: ""})
        props.showtAlert("Your note is successfully add in MongoDB!!!","success")
    }
    const onChange = (e) => {
        setNote({...note, [e.target.name] : e.target.value})
    }

    return (
        <div>
            <div className="container">

                <h1 className='my-3'>Add Note</h1>

                <form>
                    <div className="mb-3">
                        <label htmlFor="title" className="form-label">Title</label>
                        <input type="text" className="form-control" id="title" name="title" value={note.title}aria-describedby="emailHelp" onChange={onChange} minLength={5} required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="description" className="form-label">Description</label>
                        <input type="text" className="form-control" id="description" name="description" value={note.description} onChange={onChange} minLength={5} required/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="tag" className="form-label">Tag</label>
                        <input type="text" className="form-control" id="tag" name="tag" value={note.tag} onChange={onChange} minLength={5} required/>
                    </div>
                    
                    <button disabled={note.title.length<5 || note.description.length<5  || note.tag.length<5 }type="submit" className="btn btn-primary my-3" onClick={handleClick}>Add note</button>
                </form>


            </div>
        </div>
    )
}
