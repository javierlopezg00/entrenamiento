import React, { useState } from "react";
import './SignIn.scss'

export default function SignIn(){

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
