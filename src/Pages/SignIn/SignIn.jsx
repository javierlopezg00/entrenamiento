import React, { useState, useEffect } from 'react';
import './SignIn.scss'
import axios from "axios";

export default function SignIn(){
    useEffect(() => {
        
        axios.request(options)
          .then(response => setExercises(response.data))
          .catch(error => console.error(error));
      }, [muscleSelected]);

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
      
        const options = {
          method: 'POST',
          url: 'https://example.com/login', // Cambiar esto con la URL del servidor de autenticación
          data: {
            username: username,
            password: password
          },
          headers: {
            'Content-Type': 'application/json',
            //'Authorization': 'Bearer ' + token
          }
        };
      
        axios(options)
          .then((response) => {
            if (response.status === 200) {
              // Las credenciales del usuario son correctas, permitir acceso
              console.log('Inicio de sesión exitoso');
              // Agregar aquí la lógica para redirigir al usuario a la funcionalidad deseada
            } else {
              // Las credenciales del usuario son incorrectas
              console.log('Credenciales incorrectas');
            }
          })
          .catch((error) => {
            console.error(error);
          });
      };
      

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
