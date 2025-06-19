import NoteContext from "./noteContext";
import { useState } from "react";

const NoteState = (props) => {
    const s1 = {
        "name": "Aayush",
        "class": "5B",
        "age": "18"
    }
    const [state, setState] = useState(s1)

    const update = () => {
        setTimeout(() => {
            setState ({
                "name": "Nikhil",
                "class": "10B",
                "age": "28"
            })
        }, 3000);
    }
    return (
        <NoteContext.Provider value={{ state, update }}>
            {
                props.children
            }
        </NoteContext.Provider>
    )
}

export default NoteState;