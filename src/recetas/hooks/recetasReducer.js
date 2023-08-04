 

 
 export const recetasReducer = ( state = [], action ) => {
   switch (action.type) {
    case '[RECIPE] Add recipe':     
      return [...state, action.payload];
    case '[RECIPE] Set recipes':
      return action.payload;
    case '[RECIPE] Delete recipe':
      return state.filter((recipe) => recipe._id !== action.payload);
    case "[RECIPE] Edit recipe":
      return state.map((recipe) =>
      recipe._id === action.payload._id ? { ...recipe, ...action.payload } : recipe
    );
   
    default:
        return state;
   }
 }
 