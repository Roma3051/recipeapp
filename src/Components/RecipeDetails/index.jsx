import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

const fetchRecipe = async (id) => {
  const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
  const data = await response.json();
  return data.meals[0];
};

const RecipeDetails = () => {
  const { id } = useParams(); 

  const { data: recipe, isLoading, error } = useQuery({
    queryKey: ['recipe', id], 
    queryFn: () => fetchRecipe(id),
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading recipe details.</div>;
  }

  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    if (recipe[`strIngredient${i}`]) {
      ingredients.push(`${recipe[`strIngredient${i}`]} - ${recipe[`strMeasure${i}`]}`);
    }
  }

  return (
    <div className="recipe-detail-container">
      <div className="navigation">
        <Link to="/" className="back-button">
          &#8592; Back to Recipes
        </Link>
      </div>

      <div className="recipe-detail">
        <img src={recipe.strMealThumb} alt={recipe.strMeal} />
        <div className="recipe-info">
          <h2>{recipe.strMeal}</h2>
          <h3>Category: {recipe.strCategory}</h3>
          <h3>Area: {recipe.strArea}</h3>
          <h4>Ingredients:</h4>
          <ul>
            {ingredients.map((ingredient, index) => (
              <li key={index}>{ingredient}</li>
            ))}
          </ul>
          <h4>Instructions:</h4>
          <p>{recipe.strInstructions}</p>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetails;
