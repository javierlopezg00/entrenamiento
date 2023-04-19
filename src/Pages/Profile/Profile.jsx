import React from "react";
import './Profile.scss';
import { useState, useEffect } from "react";
import axios from 'axios'



export default function Profile(){

            const [userData, setUserData] = useState({})

            useEffect(() => {
                let userName = JSON.parse(localStorage.getItem("username"));
                const url = 'http://localhost:3000/api/v1/userInfo/';
    
                axios.get(url+userName).then(response => response.data)
                .then((data) => {
                  //localStorage.setItem("username", data[0].id);
                  console.log(data[0]);
                  setUserData(data[0]);
                  //history("/diet");
    
                });
        
              }, []);


    return(
        <div>
            <h1>Profile</h1>
            <p>Age: {userData.age}</p>
            <p>Weight: {userData.weight} lbs</p>
            <p>Height: {userData.height} m</p>
            <p>Calories to Eat: {userData.caloriesPrediction}</p>
            <p>Areas to train:</p>
            {userData.areaArms=="1"?<p>-Arms</p>:null}
            {userData.areaLegs=="1"?<p>-Legs</p>:null}
            {userData.areaBack=="1"?<p>-Back</p>:null}
            {userData.areaAbs=="1"?<p>-Abs</p>:null}
            {userData.areaCardio=="1"?<p>-Cardio</p>:null}
            {userData.areaChest=="1"?<p>-Chest</p>:null}
            <p>Recommended Level: {userData.trainingPrediction}</p>


        
        </div>
    );
}