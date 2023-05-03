import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import './Coach.scss';

import axios from 'axios';


export default function Coach(){
  const history = useNavigate();
 
    function selectMuscle(event) {
      const muscle = event.target.value;
      console.log(muscle);
      history(`/${muscle}`);
    }

    return(
        <div className='mainBox'>
          <h3>Which muscle do you want to train?</h3>
           <select className='selectBox' onChange={selectMuscle}>
                <option></option>
                <option>Chest</option>
                <option>Abdominals</option>
                <option>Glutes</option>
                <option>Biceps</option>
                <option>Triceps</option>
                <option>Shoulders</option>
           </select>
        </div>
    );
}