import NoteContext from "./noteContext";
import { useState } from "react";

const NoteState = (props) => {
    const notesinitial = [
        {
            "_id": "6852ba2d30ac8ce0afb8d2ed",
            "user": "68528f1f6e7a8c97d861264b",
            "title": "aayush updated 2",
            "description": "aayush is my name updated 2",
            "tag": "nirma",
            "date": "2025-06-18T13:07:57.522Z",
            "__v": 0
        },
        {
            "_id": "6852ba2f30ac8ce0afb8d2f1",
            "user": "68528f1f6e7a8c97d861264b",
            "title": "aayush",
            "description": "aayush is my name",
            "tag": "nirma",
            "date": "2025-06-18T13:07:59.909Z",
            "__v": 0
        },
        {
            "_id": "6852ba3230ac8ce0afb8d2f5",
            "user": "68528f1f6e7a8c97d861264b",
            "title": "aayush updated",
            "description": "aayush is my name updated",
            "tag": "nirma",
            "date": "2025-06-18T13:08:02.268Z",
            "__v": 0
        }
    ]
    const [notes, setnotes] = useState(notesinitial)

    return (
        <NoteContext.Provider value={{notes, setnotes}}>
            {
                props.children
            }
        </NoteContext.Provider>
    )
}

export default NoteState;