import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom';

export default function Login() {

    const [credential, setCredential] = useState({
        email : "",
        password : ""
    })

    let navigate = useNavigate()
    const handleSubmit =async(e)=>{
        e.preventDefault();
        const response = await fetch(
            "http://localhost:5000/api/auth/login",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                 body: JSON.stringify(
                    {
                        email : credential.email,
                        password : credential.password
                    }
                ),
            }
        );
        const json = await response.json()
        console.log(json)

        if(json.success){
            // console.log("Login Success")
            // console.log(json.authToken)
            // Save the authToken and rediract it
            localStorage.setItem('token', json.authToken)
            navigate('/')
        }
        else{
            alert("bhag bhdve!!!")
        }

    }

    const onChange = (e) => {
        setCredential({ ...credential, [e.target.name]: e.target.value })
    }

    return (
        <>

            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" value={credential.email}name="email"aria-describedby="emailHelp" onChange={onChange}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" value={credential.password} name="password" onChange={onChange}/>
                </div>
                
                <button type="submit" className="btn btn-primary" >Submit</button>


            </form >
        </>
    )
}
