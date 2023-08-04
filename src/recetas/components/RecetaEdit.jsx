import React, { useState } from "react";

export const RecetaEdit = ({ recipe, onSave, onCancel }) => {
  const [editedRecipe, setEditedRecipe] = useState({
    ...recipe,
    newIngredient: ""
  });

  const handleInputChange = (event, index) => {
    const { name, value } = event.target;
    if (index === -1) {
      setEditedRecipe((prevRecipe) => ({
        ...prevRecipe,
        [name]: value,
      }));
    } else {
      const updatedIngredients = editedRecipe.ingredients.map((ingredient, i) =>  i === index ? { ...ingredient, name: value } : ingredient );   
      setEditedRecipe((prevRecipe) => ({
        ...prevRecipe,
        ingredients: updatedIngredients,
      }));
    }
  };

  const handleSaveClick = () => {
    const token = localStorage.getItem('idToken');
    const { _id, name, description, ingredients, imagePath, newIngredient } = editedRecipe;

    // const updatedIngredients = ingredients.filter((ingredient) => ingredient.name.trim() !== '');
    let updatedIngredients = ingredients;
    if (newIngredient.trim() !== '') {
      updatedIngredients = [...ingredients, { name: newIngredient }];
    }
  
    const updatedRecipe = {
      _id,
      name,
      description,
      ingredients: updatedIngredients,
      imagePath,
      newIngredient
    };

    fetch(`https://backend-recipes-bootcamps-tribe.onrender.com/api/recipes/edit/${_id}?auth=${token}`, {
      method: 'PUT',
      body: JSON.stringify(updatedRecipe),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((data) => {
        const recipeWithUpdatedIngredients = {
          ...updatedRecipe,
          ingredients: updatedIngredients,
        };
        onSave(recipeWithUpdatedIngredients);
        console.log(data);
        console.log(editedRecipe.newIngredient)
      })
      .catch((error) => {
        console.error('Failed to update recipe:', error);
      });
  };

  const handleCancelClick = () => {
    onCancel();
  };

  return (
    <div className="edit-container">
      <h2>Editar Receta</h2>
      <form>
        <label>Nombre:</label>
        <input
          type="text"
          name="name"
          value={editedRecipe.name}
          onChange={(event) => handleInputChange(event, -1)}
        />

        <label>Descripción:</label>
        <input
          type="text"
          size="50"
          name="description"
          value={editedRecipe.description}
          onChange={(event) => handleInputChange(event, -1)}
        />

<label className="ing-label">Ingredientes:</label>
      {editedRecipe.ingredients.map((ingredient, index) => (
        ingredient.name.trim() !== "" && ( // Agregar esta condición para filtrar ingredientes vacíos
          <div className="ingredient" key={index}>
            <input
              type="text"
              name={`ingredients-${index}`}
              value={ingredient.name}
              onChange={(event) => handleInputChange(event, index)}
            />
          </div>
        )
      ))}

       <label>Nuevo ingrediente:</label>
        <input
          type="text"
          className="new-ingredient"
          name="newIngredient"
          value={editedRecipe.newIngredient}
          onChange={(event) => handleInputChange(event, -1)}
        />

        <button type="button" onClick={handleSaveClick}>
          Guardar
        </button>
        <button type="button" onClick={handleCancelClick} className="btn-cancel-edit">
          Cancelar
        </button>
      </form>
    </div>
  );
};
