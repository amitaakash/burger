import * as actiontype from '../actions/actionTypes';

const initialState = {
  orders: [],
  loading: false,
  error: null,
  isPurchased: false
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actiontype.PURCHASE_LOADING: {
      //console.log(action);
      return {
        ...state,
        loading: true,
        isPurchased: false
      };
    }
    case actiontype.PURCHASE_FAIL: {
      return {
        ...state,
        error: action.payload.error,
        loading: false,
        isPurchased: false
      };
    }
    case actiontype.PURCHASE_SUCCESS: {
      /* const newOrder = {
        id: action.payload.id,
        orderData: action.payload.orderData
      }; */
      return {
        ...state,
        //orders: state.orders.concat(newOrder),
        loading: false,
        isPurchased: true
      };
    }
    case actiontype.GET_ORDERS_LOADING: {
      return {
        ...state,
        loading: true,
        isPurchased: false
      };
    }
    case actiontype.GET_ORDERS_FAIL: {
      return {
        ...state,
        loading: false,
        isPurchased: false,
        error: action.payload.error
      };
    }
    case actiontype.GET_ORDERS_SUCCESS: {
      //console.log(action.payload.orders);
      return {
        ...state,
        orders: action.payload.orders,
        loading: false,
        isPurchased: false
      };
    }
    default:
      return state;
  }
};

export default reducer;
