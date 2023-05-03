import React from "react";
import { useNavigate } from "react-router-dom";
import './Profile.scss';
import { useState, useEffect } from "react";
import axios from 'axios'



export default function Profile(){

            const [userData, setUserData] = useState({})
            const [personalData, setPersonalData] = useState({})
            const navigate = useNavigate();

            useEffect(() => {
                if (localStorage.getItem("username") === null || localStorage.getItem("username") === undefined || localStorage.getItem("username") === "") {
                  navigate('/SignIn');
                }
              
                let userName = JSON.parse(localStorage.getItem("username"));
                const url = 'http://localhost:3000/api/v1/userInfo/';
                const personalInfoURL = 'http://localhost:3000/api/v1/users/';
    
                axios.get(url+1).then(response => response.data)
                .then((data) => {
                  data[0].caloriesPrediction = localStorage.getItem("calories");
                  data[0].trainingPrediction = localStorage.getItem("predictedDifficulty");
                  
                  setUserData(data[0]);
                  //history("/diet");
                });
                
                axios.get(personalInfoURL+userName).then(response => response.data)
                .then((data) => {
                  //localStorage.setItem("username", data[0].id);
                  setPersonalData(data[0]);
                  //history("/diet");
    
                });
        
              }, []);

              function bodyFatCategory(bodyFat) {
                if (bodyFat < 2) {
                  return "Underfat";
                } else if (bodyFat >= 2 && bodyFat < 6) {
                  return "Essential";
                } else if (bodyFat >= 6 && bodyFat < 14) {
                  return "Athletes";
                } else if (bodyFat >= 14 && bodyFat < 18) {
                  return "Fitness";
                } else if (bodyFat >= 18 && bodyFat < 25) {
                  return "Average";
                } else {
                  return "Obese";
                }
              }
              function trainingDay(dayInterval){
                if(dayInterval == 0){
                  return "3-4 days"
                }else if(dayInterval == 1){
                  return "1-2 days"
                }else if(dayInterval == 2){
                  return "Everyday"
                }else if(dayInterval == 3){
                  return "5-6 days"
                }else{
                  return ""
                }
              }

              function priorityExercise(exercise){
                if(exercise == 0){
                  return "Resistence"
                }else if(exercise == 1){
                  return "Strengthening"
                }else if(exercise == 2){
                  return "Flexibility"
                }else{
                  return "Full body"
                }
              }

              function timeAvailability(availabilit){
                if(availabilit == 0){
                  return "1 hour"
                }else if(availabilit == 1){
                  return "1-2 hours"
                }else if(availabilit == 2){
                  return "More than 4 hours"
                }else if(availabilit == 3){
                  return "3-4 hours"
                }
              }

              function exerciseType(exercisePredict){
                if(exercisePredict == 1 || exercisePredict == 3){
                  return "Beginner"
                }else if(exercisePredict == 0 || exercisePredict == 2){
                  return "Intermediate"
                }else if(exercisePredict == 4){
                  return "Advanced"
                }
              }

              function trainingPredictionConvert(trainingPred){
                if(trainingPred == 1){
                  localStorage.setItem("dificultad", "Intermediate");
                }else if(trainingPred == 2){
                  localStorage.setItem("dificultad", "Advanced");
                }else{
                  localStorage.setItem("dificultad", "Beginner");
                }
              }
              trainingPredictionConvert();

    return(
        <div className="mainProfileBox">
            <hr/>
            <h2></h2>
            <div className="infoDiv" >  
              <h4>Actual weight: </h4> <p>{userData.weight} pounds</p>
            </div>
            <div  className="infoDiv" >  
              <h4>Actual height: </h4> <p>{userData.height} m</p>
            </div>
            <div  className="infoDiv" >  
              <h4>Daily Calories: </h4> <p>{userData.caloriesPrediction} kcal</p>
            </div>
            <div  className="infoDiv" >  
              <h4>Trainning type:  </h4> <p>{exerciseType(userData.trainingPrediction)}</p>
            </div>

            <h3 className="infoDiv" >Personal Status</h3> 
            <hr/>
            <div  className="infoDiv" >  
              <h4>Body Fat Category: </h4> <p>{bodyFatCategory(userData.bodyFat)} </p>
            </div>
            <div className="infoDiv"  >  
              <h4>Body Fat: </h4> <p>{userData.bodyFat} %</p>
            </div>

            <div className="infoDiv" >  
              <h4>Body Mass Index: </h4> <p>{userData.bodyMassIndex} </p>
            </div>

            <h3 >Personal Info</h3> 
            <hr/>
            <div className="infoDiv" >  
              <h4>Age: </h4> <p>{userData.age} </p>
            </div>

            <div className="infoDiv" >  
              <h4>Training Days: </h4> <p>{trainingDay(userData.trainingDays)} </p>
            </div>

            <div className="infoDiv" >  
              <h4>Time availability: </h4> <p>{timeAvailability(userData.timeAvailability)} </p>
            </div>
            
            <div className="infoDiv" >  
              <h4>Priority Muscle: </h4> <p>{priorityExercise(userData.areaFocus)} </p>
            </div>

        </div>
    );
}