import { useEffect, useReducer, useState } from "react";
import { RecetaCard } from "../components/RecetaCard";
import { recetasReducer } from "../hooks/recetasReducer";
import { RecetaAdd } from "../components/RecetaAdd";
import { Search } from "../components/Search";
import { RecetaEdit } from "../components/RecetaEdit";


const initialState = [];


export const RecetasPage  = () => {

  const [originalRecipes, setOriginalRecipes] = useState([]);

  const [recipes, dispatch] = useReducer(recetasReducer ,[]);
 
  const [editingRecipe, setEditingRecipe] = useState(null);

  const [updatedIngredients, setUpdatedIngredients] = useState({}); 
 

/*   const handleNewRecipe = async (recipe) => {
    try {
      const token = localStorage.getItem('idToken');
      const response = await fetch(`https://backend-recipes-bootcamps-tribe.onrender.com/api/recipes/add?auth=${token}`, {
        method: 'POST',
        body: JSON.stringify(recipe),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        // Refetch the updated list of recipes
        const updatedResponse = await fetch(`https://backend-recipes-bootcamps-tribe.onrender.com/api/recipes/get?auth=${token}`);
        const updatedData = await updatedResponse.json();

        dispatch({ type: '[RECIPE] Set recipes', payload: updatedData });

      } else {
        throw new Error('Failed to add recipe');
      }
    } catch (error) {
      console.error(error);
    }
  }; */

  /* const handleNewRecipe = async (recipe) => {
    try {
      const token = localStorage.getItem('idToken');
      const response = await fetch(`https://backend-recipes-bootcamps-tribe.onrender.com/api/recipes/add?auth=${token}`, {
        method: 'POST',
        body: JSON.stringify(recipe),
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        dispatch({ type: '[RECIPE] Add recipe', payload: recipe });
        console.log("Receta agregada correctamente");
      } else {
        throw new Error('Failed to add recipe');
      }
    } catch (error) {
      console.error(error);
    }
  }; */
  const handleNewRecipe = async (recipe) => {
    try {
      const token = localStorage.getItem('idToken');
      const response = await fetch(`https://backend-recipes-bootcamps-tribe.onrender.com/api/recipes/add?auth=${token}`, {
        method: 'POST',
        body: JSON.stringify(recipe),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        // Refetch the updated list of recipes
        const updatedResponse = await fetch(`https://backend-recipes-bootcamps-tribe.onrender.com/api/recipes/get?auth=${token}`);
        const updatedData = await updatedResponse.json();

        setOriginalRecipes(updatedData); // Actualizar las recetas originales
        dispatch({ type: '[RECIPE] Set recipes', payload: updatedData }); // Actualizar el estado de las recetas
      } else {
        throw new Error('Failed to add recipe');
      }
    } catch (error) {
      console.error(error);
    }
  }; 

  /* const handleNewRecipe = async (recipe) => {
    try {
      const token = localStorage.getItem('idToken');
      const response = await fetch(`https://backend-recipes-bootcamps-tribe.onrender.com/api/recipes/add?auth=${token}`, {
        method: 'POST',
        body: JSON.stringify(recipe),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const addedRecipe = await response.json();

        // Actualizar el estado de recetas con la acción 'Add recipe'
        dispatch({ type: '[RECIPE] Add recipe', payload: addedRecipe });
      } else {
        throw new Error('Failed to add recipe');
      }
    } catch (error) {
      console.error(error);
    }
  };
 */

  async function handleDeleteRecipe(_id) {
    try {
      const token = localStorage.getItem('idToken');
      const response = await fetch(`https://backend-recipes-bootcamps-tribe.onrender.com/api/recipes/delete/${_id}?auth=${token}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        const updatedRecipes = recipes.filter(recipe => recipe._id !== _id);
        dispatch({ type: '[RECIPE] Delete recipe', payload: _id });
        console.log(response);
      } else {
        throw new Error('Failed to delete recipe');
      }
    } catch (error) {
      console.error(error);
    }

  }

  const handleEditRecipe = (recipeId) => {
    setEditingRecipe(recipeId);
  };

  const handleSaveRecipe = (editedRecipe) => {
    const updatedRecipes = recipes.map((recipe) =>
      recipe._id === editedRecipe._id ? editedRecipe : recipe
    );
    const updatedIngredients = editedRecipe.ingredients.filter((ingredient) => ingredient.name.trim() !== '');
    console.log(updatedIngredients);
    setUpdatedIngredients((prevIngredients) => ({
      ...prevIngredients,
      [editedRecipe._id]: updatedIngredients,
    }));
    dispatch({ type: "[RECIPE] Set recipes", payload: updatedRecipes });
    setEditingRecipe(null);
 
  };
  
  const handleCancelEdit = () => {
    setEditingRecipe(null);
   
  };

  const handleSearch = (searchTerm) => {
    // Filtrar las recetas basadas en el término de búsqueda
    const filteredRecipes = originalRecipes.filter((recipe) =>
      recipe.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Actualizar el estado de las recetas filtradas
    dispatch({ type: "[RECIPE] Set recipes", payload: filteredRecipes });
  };

  const handleClearSearch = () => {
    // Restaurar todas las recetas originales
    dispatch({ type: "[RECIPE] Set recipes", payload: originalRecipes });
  };

 
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const token = localStorage.getItem("idToken");
        const response = await fetch(
          `https://backend-recipes-bootcamps-tribe.onrender.com/api/recipes/get?auth=${token}`
        );
        const data = await response.json();
        setOriginalRecipes(data);
        dispatch({ type: "[RECIPE] Set recipes", payload: data });
        setIsLoading(false);
      } catch (error) {
        console.error(error);
      }
    };

    fetchRecipes();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  } 

  return (
    <div className="row mt-5 recipe-container">
      <div className="col-sm-12 col-lg-7 list-group recipes-box">
      <Search onSearch={handleSearch} onClearSearch={handleClearSearch} />
      {Array.isArray(recipes) && recipes.length === 0 ? (
        <div className="no-recipes-message">
        Aún no hay recetas, puedes agregar una aquí.
      </div>
      ) : (
       recipes.map((recipe, index) => (
          <RecetaCard
          key={`${recipe._id}-${index}`} 
          recipe={recipe} 
          onDeleteRecipe={() => handleDeleteRecipe(recipe._id)}
          onEditRecipe={handleEditRecipe}          
          onSaveRecipe={handleSaveRecipe}
          onCancelEdit={handleCancelEdit}
          updatedIngredients={updatedIngredients[recipe._id] || []}   
          isEditing={recipe._id === editingRecipe}
          
          />
          ))
         
          )}

      </div>
      <div className="col-sm-12 col-lg-5 p-3 add-container">
        <h4>Agregar receta</h4>

        <RecetaAdd onNewRecipe={ handleNewRecipe }/>

      </div>
    
  </div>
  )
}
