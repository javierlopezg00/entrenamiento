import './DietBox.scss';
import axios from 'axios';
import React, { useState, useEffect } from 'react';

export default function DietBox() {
  const [diet, setDiet] = useState(null);
  const [calories, setCalories] = useState(-1);
  const [maxCalories, setMaxCalories] = useState(10000);

const API_KEY = 'c8551bcf446d4c15b470468ab996cf62';
const API_URL = 'https://api.spoonacular.com/recipes/findByNutrients';

const getRecipesByCalories = (calories) => {
  const params = {
    apiKey: API_KEY,
    maxCalories: calories,
    number: 24, // Number of recipes you want to get
  };

  return axios.get(API_URL, { params })
    .then((response) => setDiet(response.data))
    .catch((error) => console.log(error));
};

  useEffect(() => {
    
    
      if (localStorage.getItem('calories')) {
        setCalories(localStorage.getItem('calories'));
      }

      getRecipesByCalories(localStorage.getItem('calories')? localStorage.getItem('calories'): 1000);

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
            diet.map(recipeN => (
              <div className="recipeBox" key={recipeN.id}>
                <div className="flexBox">
                  <p>kcal: {recipeN.calories.toFixed(2)}</p>
                  <p id='displayR'> {recipeN.fat}</p> <p>'cuisine</p>
                </div>
                <h1 id='title'>{recipeN.title}</h1>
                <img className='imagen' src={recipeN.image} alt={recipeN.title} />
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
