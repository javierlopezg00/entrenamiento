import './DietBox.scss';
import axios from 'axios';
import React, { useState, useEffect } from 'react';

export default function DietBox() {
  const [diet, setDiet] = useState(null);
  const [calories, setCalories] = useState(-1);

  useEffect(() => {
    const options = {
      method: 'GET',
      url: 'https://edamam-recipe-search.p.rapidapi.com/search',
      params: {q: 'chicken'},
      headers: {
        'X-RapidAPI-Key': '2df32850c6mshc72ac3b6b81a029p1d3bc6jsn535caa83d8bc',
        'X-RapidAPI-Host': 'edamam-recipe-search.p.rapidapi.com'
      }
    };

    axios.request(options)
      .then(response => setDiet(response.data))
      .catch(error => console.error(error));
    
      if (localStorage.getItem('calories')) {
        setCalories(localStorage.getItem('calories'));
      }
  }, []);

  return (
    <div className="dietContainer">
      <div className="caloriesContainer">
      {calories !== -1 ? (
        <p id="calories">Caloric intake: {calories}</p>
      ) : (
        <p id="calories-missing-data">Please, fill in all the fields in the home section to determine your caloric intake</p>
      )}
      </div>
        
      <div className="dietContainerBox">
        {
          diet ? (
            diet.hits.map(recipeN => (
              <div className="recipeBox" key={recipeN.recipe.label}>
                <div className="flexBox">
                  <p>kcal: {recipeN.recipe.calories.toFixed(2)}</p>
                  <p id='displayR'> {recipeN.recipe.cuisineType}</p> <p>'cuisine</p>
                </div>
                <h1 id='title'>{recipeN.recipe.label}</h1>
                <img className='imagen' src={recipeN.recipe.image} alt={recipeN.recipe.label} />
                <button className='recipeButton'>Recipe</button>
              </div>
            ))) : (
              <h1>Loading...</h1>
            )
        }
      </div>
    </div>
  ); 
}
