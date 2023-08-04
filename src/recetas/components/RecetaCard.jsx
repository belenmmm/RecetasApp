import React, { useEffect, useState } from "react";
import { RecetaEdit } from "./RecetaEdit";


export const RecetaCard = ({ recipe, onDeleteRecipe, onEditRecipe, onSaveRecipe, onCancelEdit, isEditing, updatedIngredients }) => {
 

  const { _id, name, description, ingredients, imagePath } = recipe|| {};

  //console.log(updatedIngredients);

  const [ingredientsToShow, setIngredientsToShow] = useState([]);
  useEffect(() => {
    console.log(updatedIngredients);
    console.log(ingredients);
    const updatedIngredientsToShow = updatedIngredients[_id] || ingredients.filter((ingredient) => ingredient.name.trim() !== '');
    setIngredientsToShow(updatedIngredientsToShow);
  }, [updatedIngredients, ingredients, _id]);

const filteredIngredients = ingredientsToShow.filter((ingredient) => ingredient.name.trim() !== '');


  const [newIngredient, setNewIngredient] = useState('');

  const handleDeleteClick = () => {
    if (recipe && recipe._id) {
      onDeleteRecipe(recipe._id);
    } else {
      console.error('No se pudo obtener el ID de la receta');
    }
    console.log(_id)
  };

  const [editedRecipe, setEditedRecipe] = useState(recipe);


  const handleEditClick = () => {
    onEditRecipe(_id);
   
  };

  const handleSaveRecipe = (editedRecipe) => {
    onSaveRecipe(editedRecipe);
  };

  const handleCancelClick = () => {
    onCancelEdit();
  };


    return (
      <div className="col list-group-item">
        <div className="card recipe-card">
          <div className="row no-gutter">
            <div className="col-sm-12 col-md-4">
              <img src={imagePath} className="card-img" alt={name} />

            </div>

            <div className="col-sm-12 col-md-8 d-flex justify-content-between card-content">
              <div className="card-body align-self-center">
                <h5 className="card-title">{name}</h5>
                <p className="card-text">{description}</p>


                {ingredientsToShow.length > 0 && (
                <div className="ingredients">
                  <p>Ingredientes:</p>
                  <ul>
                  {ingredientsToShow.map((ingredient, index) => (
                     <li key={index}>- {ingredient.name}</li>
                  ))}
                </ul>
                </div>
              )}
              <button className="btn btn-primary align-self-center card-btn" onClick={handleEditClick}>
                Editar
              </button>
              <button className="btn btn-danger align-self-center card-btn" onClick={ handleDeleteClick }>
                Borrar
              </button> 
                  

            </div>
            </div>

          </div>

        </div>

        {isEditing &&  (
        <RecetaEdit 
        recipe={recipe}
          onSave={handleSaveRecipe}
          onCancel={handleCancelClick}
        />
      )}  


      </div>
    );
  }