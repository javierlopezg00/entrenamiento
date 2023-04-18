import React, { useState, useEffect } from 'react';
import './Coach.scss';

import axios from 'axios';


export default function Coach(){
 
    function selectMuscle(event) {
      const muscle = event.target.value;
      window.location.href=`/${muscle}`;

    }
    return(
        <div className='mainBox'>
          <h3>Which muscle do you want to train?</h3>
           <select className='selectBox' onChange={selectMuscle}>
                <option></option>
                <option>Chest</option>
                <option>Back</option>
                <option>Legs</option>
                <option>Abdominals</option>
                <option>Glutes</option>
                <option>Biceps</option>
                <option>Triceps</option>
                <option>Shoulders</option>
           </select>

           <h3>Which category of exercise would you like to do?</h3>
           <select className='selectBox'>
                <option></option>
                <option>Stretches</option>
                <option>Bodyweight</option>
                <option>Barbell</option>
                <option>Cables</option>
                <option>Featured</option>
                <option>Dumbbells</option>
                <option>Kettlebells</option>
                <option>Band</option>
                <option>TRX</option>
                <option>Plate</option>
                <option>Yoga</option>
           </select>
        </div>
    );
}