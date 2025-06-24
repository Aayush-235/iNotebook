import React, { useState, useContext, useEffect, useRef } from 'react'
import noteContext from '../context/notes/noteContext';
import Noteitem from './Noteitem';
import Addnote from './Addnote';
import { useNavigate } from 'react-router-dom';

export default function Notes(props) {

    const context = useContext(noteContext);
    const { notes, getNote, editNote } = context
    let navigate = useNavigate()
    useEffect(() => {
        if(localStorage.getItem('token')){
            getNote();
        }
        else{
            navigate('/login')
            
        }
        // eslint-disable-next-line
    }, [])

    const ref = useRef(null)
    const refClose = useRef(null)
    const [note, setNote] = useState({ id: "", etitle: "", edescription: "", etag: "" })


    const upnoteNote = (note) => {
        ref.current.click()

        setNote({
            id: note._id,
            etitle: note.title,
            edescription: note.description,
            etag: note.tag
        })
       
    }


    const handleClick = (e) => {
        refClose.current.click()
        editNote(note.id, note.etitle, note.edescription, note.etag)
        console.log("Updating note", note)
         props.showtAlert("Update Successfully!!!","success")
    }
    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }



    return (
        <>
            <Addnote showtAlert={props.showtAlert}/>

            <button type="button" className="btn btn-primary d-none" ref={ref} data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>

            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" >
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
                                    <input type="text" className="form-control" id="etitle" name="etitle" value={note.etitle} aria-describedby="emailHelp" onChange={onChange} minLength={5} required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="description" className="form-label">Description</label>
                                    <input type="text" className="form-control" id="edescription" name="edescription" value={note.edescription} onChange={onChange} minLength={5} required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="tag" className="form-label">Tag</label>
                                    <input type="text" className="form-control" id="etag" name="etag" value={note.etag} onChange={onChange} minLength={5} required />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary" onClick={handleClick} disabled={note.etitle.length < 5 || note.edescription.length < 5 || note.etag.length<5}>Update Note</button>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <div className="container">
                    <h1>Your Notes</h1>
                    {notes.length === 0 && 'No notes to display'}
                </div>

                <div className="row my-3">
                    {notes.map((note) => (
                        note && note._id ? (
                            <Noteitem key={note._id} updateNote={upnoteNote} showtAlert={props.showtAlert} note={note} />
                        ) : null
                    ))}
                </div>


            </div>
        </>

    )
}
