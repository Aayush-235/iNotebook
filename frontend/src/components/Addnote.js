import React, { useContext, useState } from 'react'
import noteContext from '../context/notes/noteContext';

export default function Addnote() {
    const context = useContext(noteContext);
    const { addNote } = context
    const [note, setNote] = useState({title : "", description : "", tag: ""})

    const handleClick = (e) => {
        e.preventDefault()
        addNote(note.title, note.description, note.tag)
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
                        <input type="text" className="form-control" id="title" name="title" aria-describedby="emailHelp" onChange={onChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="description" className="form-label">Description</label>
                        <input type="text" className="form-control" id="description" name="description" onChange={onChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="tag" className="form-label">Tag</label>
                        <input type="text" className="form-control" id="tag" name="tag" onChange={onChange} />
                    </div>
                    
                    <button type="submit" className="btn btn-primary my-3" onClick={handleClick}>Add note</button>
                </form>


            </div>
        </div>
    )
}
