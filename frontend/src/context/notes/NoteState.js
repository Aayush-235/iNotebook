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
                    "auth-token":
                        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiNjg1MjhmMWY2ZTdhOGM5N2Q4NjEyNjRiIiwiaWF0IjoxNzUwMjQxMTU0fQ.WIHRl1rDdr9HBwQJK-QOpVIQUdmhTlJu_UwyDdokBVI",
                }
            }
        );
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
                    "auth-token":
                        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiNjg1MjhmMWY2ZTdhOGM5N2Q4NjEyNjRiIiwiaWF0IjoxNzUwMjQxMTU0fQ.WIHRl1rDdr9HBwQJK-QOpVIQUdmhTlJu_UwyDdokBVI",
                },
                body: JSON.stringify({ title, description, tag }),
            }
        );
        console.log("Adding a new note");
        const note = {
            _id: "6852ba32sfvfd30afc8ce0afb8d2f5",
            user: "68528f1ffssf6e7a8c97d861264b",
            title: title,
            description: description,
            tag: tag,
            date: "2025-06-18T13:08:02.268Z",
            __v: 0,
        };
        setnotes(notes.concat(note));
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
                    "auth-token":
                        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiNjg1MjhmMWY2ZTdhOGM5N2Q4NjEyNjRiIiwiaWF0IjoxNzUwMjQxMTU0fQ.WIHRl1rDdr9HBwQJK-QOpVIQUdmhTlJu_UwyDdokBVI",
                },
            }
        );
        const json = await response.json();
        console.log(json)

        
        console.log("Deleting the note with id : " + _id);
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
                    "auth-token":
                        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiNjg1MjhmMWY2ZTdhOGM5N2Q4NjEyNjRiIiwiaWF0IjoxNzUwMjQxMTU0fQ.WIHRl1rDdr9HBwQJK-QOpVIQUdmhTlJu_UwyDdokBVI",
                },
                body: JSON.stringify({ title, description, tag }),
            }
        );
        const json = response.json();

        //Logic for edit in local client
        for (let index = 0; index < notes.length; index++) {
            const element = notes[index];
            if (element._id === id) {
                element.title = title;
                element.description = description;
                element.tag = tag;
            }
        }
    };




    return (
        <NoteContext.Provider value={{ notes, getNote, addNote, deleteNote, editNote }}>
            {props.children}
        </NoteContext.Provider>
    );
};

export default NoteState;
