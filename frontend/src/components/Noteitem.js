import React from 'react'

export default function Noteitem(props) {
    const { note } = props;
    return (
        <div className='col-md-3'>
            <div className="card my-3">
                <div className="card-body">
                    <div className="d-flex justify-content-between align-items-center">
                        <h5 className="card-title mb-0">{note.title}</h5>
                        <div>
                            <i className="fa-regular fa-pen-to-square text-primary mx-2"></i>
                            <i className="fa-solid fa-trash text-danger mx-2"></i>
                        </div>
                    </div>
                    <p className="card-text mt-2">{note.description}</p>
                    
                </div>
            </div>

        </div>
    )
}
