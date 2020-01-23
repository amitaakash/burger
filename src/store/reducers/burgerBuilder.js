import * as actionType from '../actions/actionTypes';

const initialState = {
  ingredients: null,
  totalPrice: null,
  initialPrice: null,
  error: null,
  buildingBurger: false
};

const ingredientAdded = (state, action) => {
  const data = action.payload;
  return {
    ...state,
    ingredients: {
      ...state.ingredients,
      [data.ingredientName]: state.ingredients[data.ingredientName] + 1
    },
    totalPrice: state.totalPrice + state.initialPrice[data.ingredientName],
    buildingBurger: true
  };
};
const ingredientRemoved = (state, action) => {
  const data = action.payload;
  return {
    ...state,
    ingredients: {
      ...state.ingredients,
      [data.ingredientName]: state.ingredients[data.ingredientName] - 1
    },
    totalPrice: state.totalPrice - state.initialPrice[data.ingredientName],
    buildingBurger: true
  };
};

const ingredientSetDefault = (state, action) => {
  return {
    ...state,
    ingredients: action.payload.ingredients,
    initialPrice: action.payload.initialPrice,
    totalPrice: action.payload.totalPrice,
    error: null,
    buildingBurger: false
  };
};

const ingredientSetFailed = (state, action) => {
  return {
    ...state,
    error: action.payload.error
  };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.ADD_INGREDIENT:
      return ingredientAdded(state, action);
    case actionType.REMOVE_INGREDIENT:
      return ingredientRemoved(state, action);

    case actionType.SET_INGREDIENTS:
      return ingredientSetDefault(state, action);
    case actionType.FETCH_INGREDIENT_FAILED:
      return ingredientSetFailed(state, action);

    default:
      return state;
  }
};

export default reducer;
