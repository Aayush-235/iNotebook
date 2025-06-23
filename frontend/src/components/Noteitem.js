import React, { useContext } from 'react'
import noteContext from '../context/notes/noteContext';


export default function Noteitem(props) {

    const context = useContext(noteContext);
    const { deleteNote } = context
    const { note, updateNote } = props;

    const deleteNoteidpass = () => {
        // console.log(note._id)
        deleteNote(note._id);
        props.showtAlert("Deleted Successfully!!!","success")

    }
    return (<>
        <div className="col-md-3">
            <div className="card my-3">
                <div className="card-body">
                    <div className="d-flex justify-content-between align-items-center">
                        <h5 className="card-title mb-0">{note.title}</h5>
                        <div>
                            <i className="fa-regular fa-pen-to-square text-primary mx-2" onClick={() => { updateNote(note) }}></i>
                            <i className="fa-solid fa-trash text-danger mx-2" onClick={deleteNoteidpass} ></i>
                        </div>
                    </div>
                    <p className="card-text mt-2">{note.description}</p>

                </div>
            </div>

        </div>


    </>



    )
}
