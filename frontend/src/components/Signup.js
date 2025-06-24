import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';


export default function Signup(props) {
    const [credential, setCredential] = useState({
        name: "",
        email: "",
        password: "",
        cpassword: ""
    })

    let navigate = useNavigate()
    const handleSubmit = async (e) => {
        e.preventDefault();
        const { name, email, password, cpassword } = credential
        const response = await fetch(
            "http://localhost:5000/api/auth/createuser",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(
                    {
                        name,
                        email,
                        password
                    }
                ),
            }
        );
        const json = await response.json()
        console.log(json)

        if (json.success) {
            // console.log("Sign Up -->> Success")
            // console.log(json.authToken)
            // Save the authToken and rediract it
            localStorage.setItem('token', json.authToken)
            navigate('/')

            props.showtAlert("Account Created Successfully!!!", "success")

        }
        else {
            props.showtAlert("Invalid Cradentials", "danger")
        }

    }

    const onChange = (e) => {
        setCredential({ ...credential, [e.target.name]: e.target.value })
    }


    return (
        <>
             <div className="mt-2">
                    <h2 className='my-2'>Create an account to use iNotebook</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">Name</label>
                            <input type="text" className="form-control" id="name" name="name" aria-describedby="emailHelp" onChange={onChange} required />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email address</label>
                            <input type="email" className="form-control" id="email" name="email" aria-describedby="emailHelp" onChange={onChange} required />
                            <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">Password</label>
                            <input type="password" className="form-control" id="password" name="password" onChange={onChange} minLength={5} required />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="cpassword" className="form-label">Confirm Password</label>
                            <input type="password" className="form-control" id="cpassword" name="cpassword" onChange={onChange} minLength={5} required />
                        </div>
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </form>
            </div>
        </>
    )
}
