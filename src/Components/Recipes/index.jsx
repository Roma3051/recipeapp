import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../CartContent';
import { useQuery } from '@tanstack/react-query';

const fetchRecipes = async () => {
  const response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
  const data = await response.json();
  return data.meals || [];
};

const fetchCategories = async () => {
  const response = await fetch('https://www.themealdb.com/api/json/v1/1/categories.php');
  const data = await response.json();
  return data.categories || [];
};

const Recipes = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const recipesPerPage = 5;
  const { cart, addToCart } = useCart();

  const { data: recipes, isLoading: isRecipesLoading, error: recipesError } = useQuery({
    queryKey: ['recipes'],
    queryFn: fetchRecipes,
  });

  const { data: categories, isLoading: isCategoriesLoading, error: categoriesError } = useQuery({
    queryKey: ['categories'],
    queryFn: fetchCategories,
  });

   const filteredRecipes = recipes?.filter((recipe) => {
    const matchesCategory = selectedCategory ? recipe.strCategory === selectedCategory : true;
    const matchesSearch = recipe.strMeal.toLowerCase().includes(searchQuery.toLowerCase());  
    return matchesCategory && matchesSearch; 
  });

  const handleCategoryFilter = (category) => {
    setSelectedCategory(category);
    setCurrentPage(1); 
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const getPaginationPages = () => {
    const totalPages = Math.ceil(filteredRecipes.length / recipesPerPage);
    const pages = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);
      for (let i = 2; i <= 6; i++) {
        if (i <= totalPages - 1) {
          pages.push(i);
        }
      }
      if (totalPages > 7) {
        pages.push('...');
        pages.push(totalPages);
      }
    }
    return pages;
  };

  const currentRecipes = filteredRecipes?.slice(
    (currentPage - 1) * recipesPerPage,
    currentPage * recipesPerPage
  );

  if (isRecipesLoading || isCategoriesLoading) {
    return <div>Loading...</div>;
  }

  if (recipesError || categoriesError) {
    return <div>Error loading data.</div>;
  }

  return (
    <div className="container">
      <div className="search-filters">
        <input
          type="text"
          placeholder="Search recipes..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        <div className="filters">
          <select onChange={(e) => handleCategoryFilter(e.target.value)}>
            <option value="">All Categories</option>
            {categories?.map((category) => (
              <option key={category.strCategory} value={category.strCategory}>
                {category.strCategory}
              </option>
            ))}
          </select>
        </div>
        <Link to="/basket" className="basket-link">
          Basket ({cart.length})
        </Link>
      </div>

      <div className="recipes-list">
        {currentRecipes?.map((recipe) => (
          <div className="recipe-card" key={recipe.idMeal}>
            <img src={recipe.strMealThumb} alt={recipe.strMeal} />
            <div className="details">
              <h3>{recipe.strMeal}</h3>
              <p>Category: {recipe.strCategory}</p>
              <p>Area: {recipe.strArea}</p>
              <Link to={`/recipe/${recipe.idMeal}`}>Preparation</Link>
              <button onClick={() => addToCart(recipe)}>+ Add</button>
            </div>
          </div>
        ))}
      </div>

      <div className="pagination">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          &#60;
        </button>

        {getPaginationPages().map((page, index) => (
          <button
            key={index}
            onClick={() => handlePageChange(page === '...' ? currentPage : page)}
            className={currentPage === page ? 'active' : ''}
            disabled={page === '...'}
          >
            {page}
          </button>
        ))}

        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === Math.ceil(filteredRecipes.length / recipesPerPage)}
        >
          &#62;
        </button>
      </div>
    </div>
  );
};

export default Recipes;


