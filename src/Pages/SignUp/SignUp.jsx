import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import './SignUp.scss'
import axios from 'axios'
import { Link } from "react-router-dom";


export default function SignUp(){

    const [id, setId] = useState("")
    const [name, setName]=useState("");
    const [last, setLast] = useState("");
    const [user, setUser] = useState("");
    const [mail, setMail] = useState("");
    const [birthday, setBirthday] = useState("");
    const [password, setPassword] = useState("");
    const [openLink, setOpenLink] = useState(false)

    const history = useNavigate();

    useEffect(() => {
        localStorage.setItem("username", JSON.stringify(id));
        

      }, [id]);

    const createUser =  () => {
    
        const url = 'http://localhost:3000/api/v1/users/createUser';
        const url2 = 'http://localhost:3000/api/v1/users/login/';

        let datos = {
            "userN": user, 
            "firstName": name, 
            "lastName": last, 
            "mail": mail, 
            "password": password, 
            "birthday": birthday
        }
        
        axios.post(url, datos)
        .then((response)=>{
            console.log(response);
            axios.get(url2+user).then(response => response.data)
            .then((data) => {
              localStorage.setItem("username", data[0].id);
              setId(data[0].id);
              setOpenLink(true)
            });

        })
        .catch((response)=>{
            console.log(response);
        });
     
     

      }

    return(
        <div style={{textAlign: "center"}}>
            <h1>Sign Up</h1>
            <div className="subSignUpBox">
                <input type="text" placeholder="First Name" className="inputSignUpBox" onChange={(e) => setName(e.target.value)}/>
                <input type="text" placeholder="Last Name" className="inputSignUpBox" onChange={(e) => setLast(e.target.value)}/>
            </div>
            <div className="subSignUpBox">
                <input type="text" placeholder="User" className="inputSignUpBox" onChange={(e) => setUser(e.target.value)}/>
                <input type="text" placeholder="Mail" className="inputSignUpBox" onChange={(e) => setMail(e.target.value)}/>
            </div>
            <div className="subSignUpBox">
            <input type="date" placeholder="BirthDay" className="inputSignUpBox" onChange={(e) => setBirthday(e.target.value)}/>
            <input type="password" placeholder="Password" className="inputSignUpBox" onChange={(e) => setPassword(e.target.value)}/>
            </div>
            <button className='recipeButton' style={{width: "53%"}} onClick={createUser}>Sign Up</button>
            {openLink==true?
            <Link to='/Register'>
                <br/>
                <p>Ir a registro de datos</p>

            </Link>
            :
            null}
        </div>
    );
}