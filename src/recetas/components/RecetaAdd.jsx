import { useState } from "react";
import PropTypes from 'prop-types';


export const RecetaAdd = ({ onNewRecipe }) => {

   /*  const [recipeValues, setrecipeValues] = useState({
        name:'',
        description:'',
        ingredients:[],
        imagePath:''
  
    }); */

     const [successMessage, setSuccessMessage] = useState('');

  /*   const handleInput = (event) => {
        setrecipeValues((prev) => ({ ...prev, [event.target.name]: event.target.value }));
    }; */
 

   /*  const onFormSubmit = async ( event ) => {
      event.preventDefault();
    onNewRecipe(newRecipe);
    setNewRecipe({
      name: "",
      description: "",
      ingredients: [],
    });
        
    } */
    const [newRecipe, setNewRecipe] = useState({
      name: "",
      description: "",
      ingredientsText: "",
      imagePath: "", // Campo para cargar la ruta de la imagen
    });
    
    const handleInputChange = (event) => {
      const { name, value } = event.target;
      setNewRecipe((prevRecipe) => ({
        ...prevRecipe,
        [name]: value,
      }));
    };
    
    const onFormSubmit = async (event) => {
    event.preventDefault();
    const ingredientsArray = newRecipe.ingredientsText.split(",").map((ingredient) => {
      return{ name: ingredient.trim() };
     });
    // Crear la nueva receta con los datos ingresados
    const recipeToAdd = {
      name: newRecipe.name,
      description: newRecipe.description,
      ingredients: ingredientsArray,
      imagePath: newRecipe.imagePath,
    };
    try {

    // Llamar a la función para agregar la receta
    await onNewRecipe(recipeToAdd);

    setSuccessMessage("Receta agregada correctamente");

    // Restablecer el formulario
    setNewRecipe({
      name: "",
      description: "",
      ingredientsText: "",
      imagePath: "",
    });
  }catch (error) {
    console.error("Error al agregar la receta:", error);
    // Mostrar mensaje de error si no se puede agregar la receta
    setSuccessMessage("Hubo un error al agregar la receta. Por favor, inténtalo de nuevo.");
  }
};

    


  return (
    <form onSubmit={ onFormSubmit }> 
    <input type="text" name="name" placeholder="nombre" className="form-control" onChange={ handleInputChange } value={newRecipe.name}/>
    <input type="text"name="description"  placeholder="descripción de la receta" className="form-control" onChange={ handleInputChange } value={newRecipe.description}/>
    <input type="text"name="ingredients"  placeholder="ingredientes de la receta" className="form-control" onChange={ handleInputChange } value={newRecipe.ingredientsText}/>
    <input type="text"name="imagePath"  placeholder="foto de la receta" className="form-control" onChange={ handleInputChange } value={newRecipe.imagePath}/>

    <button type="submit" className="btn btn-outline-primary mt-1">
      Agregar

    </button>

    {successMessage && <p className="success-message">{successMessage}</p>}

  </form>

  )
}

RecetaAdd.propTypes = {
  onNewRecipe: PropTypes.func.isRequired,
}
