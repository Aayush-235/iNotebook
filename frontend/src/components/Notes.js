import React, { useContext } from 'react'
import noteContext from '../context/notes/noteContext';
import Noteitem from './Noteitem';
import Addnote from './Addnote';

export default function Notes() {

    const context = useContext(noteContext);
    const { notes } = context

    return (
        <>
            <Addnote/>
            <div>
                <div className="row my-3">

                    <h1>Your Notes</h1>
                    {
                        notes.map((notes) => {
                            return <Noteitem key={notes._id} note={notes} />
                        })
                    }
                </div>
            </div>
        </>

    )
}
