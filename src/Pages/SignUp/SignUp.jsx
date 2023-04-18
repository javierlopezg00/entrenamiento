import React from "react";
import './SignUp.scss'

export default function SignUp(){

    return(
        <div style={{textAlign: "center"}}>
            <h1>Sign Up</h1>
            <div className="subSignUpBox">
                <input type="text" placeholder="First Name" className="inputSignUpBox"/>
                <input type="text" placeholder="Last Name" className="inputSignUpBox"/>
            </div>
            <div className="subSignUpBox">
                <input type="text" placeholder="User" className="inputSignUpBox"/>
                <input type="text" placeholder="Mail" className="inputSignUpBox"/>
            </div>
            <div className="subSignUpBox">
            <input type="text" placeholder="BirthDay" className="inputSignUpBox"/>
            <input type="password" placeholder="Password" className="inputSignUpBox"/>
            </div>
            <button className='recipeButton' style={{width: "53%"}}>Sign Up</button>
        </div>
    );
}