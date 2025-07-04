import NoteContext from "./noteContext";
import { useState } from "react";

const NoteState = (props) => {
    const host = "http://localhost:5000";
    const notesinitial = []
    const [notes, setnotes] = useState(notesinitial);




    //...........................Get all notes....................................






    const getNote = async () => {
        //API CALL
        const response = await fetch(
            `${host}/api/notes/fetchallnotes`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": localStorage.getItem('token'),
                }
            }
        );
        // eslint-disable-next-line
        const json = await response.json()
        console.log(json)
        setnotes(json)


    };







    //...........................Add a note....................................


    const addNote = async (title, description, tag) => {
        // TODO : API CALLL
        //API CALL
        const response = await fetch(
            `${host}/api/notes/addnotes`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "auth-token":localStorage.getItem('token'),
                },
                body: JSON.stringify({ title, description, tag }),
            }
        );
        const addNotee = await response.json()
        console.log("New note added:", addNotee);
        setnotes((prevNotes) => [...prevNotes, addNotee]);
    };




    // ..............................Delete a note......................................




    const deleteNote = async (_id) => {
        //API CALL
        const response = await fetch(
            `${host}/api/notes/deletenotes/${_id}`,
            {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "auth-token":localStorage.getItem('token'),
                },
            }
        );
        // eslint-disable-next-line
        const json = await response.json();
        const newNotes = notes.filter((note) => {
            return note._id !== _id;
        });
        setnotes(newNotes);
    };




    // ...........................Edit a note.......................................




    const editNote = async (id, title, description, tag) => {
        //API CALL
        const response = await fetch(
            `${host}/api/notes/updatenotes/${id}`,
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "auth-token":localStorage.getItem('token'),
                },
                body: JSON.stringify({ title, description, tag }),
            }
        );
        // eslint-disable-next-line
        const json = await response.json();

        let newNotes = JSON.parse(JSON.stringify(notes))
        // Create a deep copy of the notes array to avoid mutating the original state directly.
        // React does not detect changes if we directly modify the state, which may cause UI bugs.

        //Logic for edit in local client
        for (let index = 0; index < newNotes.length; index++) {
            if (newNotes[index]._id === id) {
                newNotes[index].title = title;
                newNotes[index].description = description;
                newNotes[index].tag = tag;
                break;
            }


        }
        // Set the updated notes array in state to trigger UI re-render

        setnotes(newNotes)


    };




    return (
        <NoteContext.Provider value={{ notes, getNote, addNote, deleteNote, editNote }}>
            {props.children}
        </NoteContext.Provider>
    );
};

export default NoteState;
