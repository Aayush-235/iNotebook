import React, { useState,useContext, useEffect, useRef } from 'react'
import noteContext from '../context/notes/noteContext';
import Noteitem from './Noteitem';
import Addnote from './Addnote';

export default function Notes() {

    const context = useContext(noteContext);
    const { notes, getNote } = context
    useEffect(() => {
        getNote()
        // eslint-disable-next-line
    }, [])

    const upnoteNote = (note) => {
        ref.current.click()

        setNote({
            etitle : note.title,
            edescription : note.description,
            etag : note.tag
        })
    }

    const ref = useRef(null)
        const [note, setNote] = useState({etitle : "", edescription : "", etag: ""})

    const handleClick = (e) => {
        e.preventDefault()
        console.log("Updating note", note)
    }
    const onChange = (e) => {
        setNote({...note, [e.target.name] : e.target.value})
    }



    return (
        <>
            <Addnote />

            <button type="button" className="btn btn-primary d-none" ref={ref} data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>

            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Note</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="title" className="form-label">Title</label>
                                    <input type="text" className="form-control" id="etitle" name="etitle" value={note.etitle} aria-describedby="emailHelp" onChange={onChange} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="description" className="form-label">Description</label>
                                    <input type="text" className="form-control" id="edescription" name="edescription" value={note.edescription }onChange={onChange} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="tag" className="form-label">Tag</label>
                                    <input type="text" className="form-control" id="etag" name="etag" value={note.etag} onChange={onChange} />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary" onClick={handleClick}>Update Note</button>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <div className="row my-3">

                    <h1>Your Notes</h1>
                    {
                        notes.map((notes) => {
                            return <Noteitem key={notes._id} updateNote={upnoteNote} note={notes} />
                        })
                    }
                </div>
            </div>
        </>

    )
}
