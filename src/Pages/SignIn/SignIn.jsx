import React, { useState } from "react";
import './SignIn.scss'
import { useNavigate } from 'react-router-dom';
import axios from 'axios'

export default function SignIn(){
    const history = useNavigate();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    }

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log("Username:", username);
        console.log("Password:", password);

        const url = 'http://localhost:3000/api/v1/users/login/';

        axios.get(url+username).then(response => response.data)
            .then((data) => {
              localStorage.setItem("username", data[0].id);
            //   console.log(data);

              setUsername("");
              setPassword("");
              history("/diet");
            });

    }

    return(
        <div className="mainSigInBox">
            <form onSubmit={handleSubmit}>
                <h2>Username: </h2>
                <input className="inputText" type="text" value={username} onChange={handleUsernameChange} />
                <h2>Password: </h2>
                <input className="inputText" type="password" value={password} onChange={handlePasswordChange} /> <br/>
                <button className='recipeButton' style={{width: "53%"}}>Sign In</button>
            </form>
        </div>
    );
}