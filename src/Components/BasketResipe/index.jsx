import { Link } from 'react-router-dom';
import { useCart } from '../CartContent';

const BasketRecipe = () => {
  const { cart, removeFromCart } = useCart();

  const getCombinedIngredients = () => {
    const ingredients = {};

    cart.forEach((recipe) => {
      for (let i = 1; i <= 20; i++) {
        const ingredient = recipe[`strIngredient${i}`];
        const measure = recipe[`strMeasure${i}`];

        if (ingredient && ingredient.trim() !== '') {
          ingredients[ingredient] = ingredients[ingredient]
            ? `${ingredients[ingredient]}, ${measure}`
            : measure;
        }
      }
    });

    return Object.entries(ingredients).map(([ingredient, measure]) => ({
      ingredient,
      measure,
    }));
  };

  const combinedIngredients = getCombinedIngredients();

  return (
    <div className='container'>
      <div className="navigation">
        <Link to="/" className="back-button">
          &#8592; Back to Recipes
        </Link>
      </div>
      <div className="cards-list">
        {cart.length === 0 ? (
          <p>Your basket is empty!</p>
        ) : (
          cart.map((recipe) => (
            <div key={recipe.idMeal} className="cards">
              <img src={recipe.strMealThumb} alt={recipe.strMeal} />
              <div className='info'>
                <h3>{recipe.strMeal}</h3>
                <p>Category: {recipe.strCategory}</p>
                <p>Area: {recipe.strArea}</p>
                <button onClick={() => removeFromCart(recipe.idMeal)}>Remove</button>
              </div>
              <div className='instructions'>
                <h4>Instructions:</h4>
                <p>{recipe.strInstructions}</p>
              </div>
            </div>
          ))
        )}
      </div>

      {cart.length > 0 && (
        <div className="ingredients-list">
          <h3>Combined Ingredients</h3>
          <ul>
            {combinedIngredients.map((item, index) => (
              <li key={index}>
                {item.ingredient}: {item.measure}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default BasketRecipe;
