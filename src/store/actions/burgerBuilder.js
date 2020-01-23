import * as actionTypes from './actionTypes';
import axios from '../../axios-burger';

export const addIngredients = name => {
  return {
    type: actionTypes.ADD_INGREDIENT,
    payload: {
      ingredientName: name
    }
  };
};

export const removeIngredients = name => {
  return {
    type: actionTypes.REMOVE_INGREDIENT,
    payload: {
      ingredientName: name
    }
  };
};

const setIngredients = ingredientData => {
  return {
    type: actionTypes.SET_INGREDIENTS,
    payload: {
      ingredients: ingredientData.ingredients,
      initialPrice: ingredientData.ingredientPrices,
      totalPrice: ingredientData.initialPrice
    }
  };
};
const fetchIngredientFailed = error => {
  return {
    type: actionTypes.FETCH_INGREDIENT_FAILED,
    payload: {
      error
    }
  };
};

export const getIngredients = () => {
  return async dispatch => {
    try {
      const ingredients = await axios.get('state.json');
      //console.log(ingredients.data);

      dispatch(setIngredients(ingredients.data));
    } catch (error) {
      dispatch(fetchIngredientFailed(error));
    }
  };
};
