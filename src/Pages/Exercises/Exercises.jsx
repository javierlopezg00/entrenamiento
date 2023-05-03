import React, { useState, useEffect } from 'react';
import ExercisesBox from '../../Components/ExercisesBox/ExercisesBox';
import axios from 'axios';

export default function Exercises() {

  var bodySelected = window.location.pathname.substring(1);

  const [exercises, setExercises] = useState(null);
  const muscleSelected = window.location.pathname.substring(1);

  var difficulty = localStorage.getItem("dificultad")

  useEffect(() => {
    const options = {
      method: 'GET',
      url: 'https://musclewiki.p.rapidapi.com/exercises',
      params: {muscle: bodySelected, difficulty: difficulty},
      headers: {
        'X-RapidAPI-Key': '2df32850c6mshc72ac3b6b81a029p1d3bc6jsn535caa83d8bc',
        'X-RapidAPI-Host': 'musclewiki.p.rapidapi.com'
      }
    }; 
    axios.request(options)
      .then(response => setExercises(response.data))
      .catch(error => console.error(error));
  }, [muscleSelected]);


  if (!exercises) {
      return <div>Loading...</div>;
    }

  return (
    <div style={{ display: 'flex', padding: '0 4%', flexWrap: 'wrap' }}>
      {exercises.map(exercise => (
        <ExercisesBox
          key={exercise.id}
          exerciseName={exercise.exercise_name}
          category={exercise.Category}
          steps={exercise.steps.length}
          force={exercise.force}
          videoLink={exercise.videoURL[0]}
          targetsP={exercise.target.Primary}
        />
      ))}
    </div>
  );
}
