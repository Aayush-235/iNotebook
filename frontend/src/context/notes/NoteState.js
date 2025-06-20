import NoteContext from "./noteContext";
import { useState } from "react";

const NoteState = (props) => {
    const notesinitial = [
        {
            "_id": "6852ba2d30avvsc8ce0afb8d2ed",
            "user": "68528f1f6e7a8c97d861264b",
            "title": "aayush updated 2",
            "description": "aayush is my name updated 2",
            "tag": "nirma",
            "date": "2025-06-18T13:07:57.522Z",
            "__v": 0
        },
        {
            "_id": "6852ba2f30ac8ce0afb8d2fgg1",
            "user": "68528f1f6e7a8c97d861264b",
            "title": "aayush",
            "description": "aayush is my name",
            "tag": "nirma",
            "date": "2025-06-18T13:07:59.909Z",
            "__v": 0
        },
        {
            "_id": "68d52ba3230ac8ce0afb8d2f5",
            "user": "68528f1f6e7a8c97d861264b",
            "title": "aayush updated",
            "description": "aayush is my name updated",
            "tag": "nirma",
            "date": "2025-06-18T13:08:02.268Z",
            "__v": 0
        },
        {
            "_id": "6852ba2d30ac8ce0afb8gd2ed",
            "user": "68528f1f6e7a8c97d861264b",
            "title": "aayush updated 2",
            "description": "aayush is my name updated 2",
            "tag": "nirma",
            "date": "2025-06-18T13:07:57.522Z",
            "__v": 0
        },
        {
            "_id": "6852bad2f30ac8ce0afb8d2f1",
            "user": "68528f1f6e7a8c97d861264b",
            "title": "aayush",
            "description": "aayush is my name",
            "tag": "nirma",
            "date": "2025-06-18T13:07:59.909Z",
            "__v": 0
        },
        {
            "_id": "6852ba3230afc8ce0afb8d2f5",
            "user": "68528f1f6e7a8c97d861264b",
            "title": "aayush updated",
            "description": "aayush is my name updated",
            "tag": "nirma",
            "date": "2025-06-18T13:08:02.268Z",
            "__v": 0
        }
    ]
    const [notes, setnotes] = useState(notesinitial)


    //  Add a note
    const addNote = (title, description, tag) => {
        // TODO : API CALLL
        console.log("Adding a new note")
        const note = {
            "_id": "6852ba32sfvfd30afc8ce0afb8d2f5",
            "user": "68528f1ffssf6e7a8c97d861264b",
            "title": title,
            "description": description,
            "tag": tag,
            "date": "2025-06-18T13:08:02.268Z",
            "__v": 0
        }
        setnotes(notes.concat(note))
    }
    // Delete a note
    const deleteNote = () => {

    }
    // Edit a note
    const editNote = () => {

    }
    return (
        <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote }}>
            {
                props.children
            }
        </NoteContext.Provider>
    )
}

export default NoteState;