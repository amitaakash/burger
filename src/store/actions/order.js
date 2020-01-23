import * as actionType from './actionTypes';
import axios from '../../axios-burger';

const purachseSuccess = (id, orderData) => {
  return {
    type: actionType.PURCHASE_SUCCESS,
    payload: {
      id,
      orderData
    }
  };
};
const purachseFail = error => {
  return {
    type: actionType.PURCHASE_FAIL,
    payload: {
      error
    }
  };
};

const purchaseLoading = () => {
  return {
    type: actionType.PURCHASE_LOADING
  };
};

export const purchaseProcess = (orderData, token) => {
  return async dispatch => {
    dispatch(purchaseLoading());
    try {
      const data = await axios.post('/orders.json?auth=' + token, orderData);
      dispatch(purachseSuccess(data.name, orderData));
      //console.log(data);
    } catch (error) {
      dispatch(purachseFail(error));
    }
  };
};

const getOrderLoading = () => {
  return {
    type: actionType.GET_ORDERS_LOADING
  };
};

const getOrderFail = error => {
  return {
    type: actionType.GET_ORDERS_FAIL,
    payload: {
      error
    }
  };
};

const getOrderSuccess = orders => {
  return {
    type: actionType.GET_ORDERS_SUCCESS,
    payload: {
      orders
    }
  };
};

export const getOrders = (token, userId) => {
  return async dispatch => {
    dispatch(getOrderLoading());
    //console.log(token, userId);
    try {
      const query = `?auth=${token}&orderBy="userId"&equalTo="${userId}"`;
      const data = await axios.get('/orders.json/' + query);
      const fetchedOrders = [];
      for (let key in data.data) {
        fetchedOrders.push({
          ...data.data[key],
          id: key
        });
      }
      //console.log(fetchedOrders);
      dispatch(getOrderSuccess(fetchedOrders));
    } catch (error) {
      dispatch(getOrderFail(error));
    }
  };
};
