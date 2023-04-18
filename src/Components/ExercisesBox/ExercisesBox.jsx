import React, { useState, useEffect } from 'react';
import './ExercisesBox.scss'

export default function ExercisesBox(props){
    console.log
  return (
    <div className='mainEBox'>
      <div className='headerExerciseBox'>
        <p className='headerTitles'>Category: {props.category}</p>
        <p className='headerTitles'>Force: {props.force}</p>
      </div>
      <div className='videoBox'>
        <div className='verticalExerciseBox' style={{backgroundColor:"#050a11"}}>
          <h3 className='headerTitles'>{props.exerciseName}</h3>
          <p className='stepsText'>Steps: {props.steps}</p>
                </div>
                <div className='verticalExerciseBox' >
                    <h3>Target</h3>
                    <p>{props.targetsP.map(target => (
                        <p>{target}</p>
                    ))}</p>
                </div>
                <iframe 
                    src={props.videoLink}
                    title={props.exerciseName}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    muted
                    controls
                    className='exerciseShowVideo'  
                    style={{ "pointer-events": "none" }}  
                />
            </div>
                <button className='recipeButton'>See more</button>

                
        </div>

    );
}