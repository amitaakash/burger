import React, { useEffect, useState } from 'react';
import Burger from '../../components/Burger/Burger';
import BuildController from '../../components/Burger/BuildController/BuildController';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import * as actionType from '../../store/actions/index';

import { connect } from 'react-redux';
// import axios from '../../axios-burger';

const BurgerBuilder = props => {
  /* state = {
    /* ingredients: '',
    totalPrice: 4,
    isPurchaseable: false,
    showModal: false,
    error: null,
    loading: false
  }; */
  const { onInitIngredients } = props;
  const [isLoading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  useEffect(() => {
    onInitIngredients();
  }, [onInitIngredients]);

  const isPurchaseable = ingredients => {
    const totalcount = Object.values(ingredients).reduce((prev, next) => {
      return prev + next;
    });
    return totalcount > 0;
  };
  const modalHandler = () => {
    if (props.isAuth) {
      setShowModal(!showModal);
    } else {
      props.history.push('/auth');
    }
  };

  const onPurchaseContinue = () => {
    setLoading(true);

    props.history.push({
      pathname: '/checkout'
    });
  };

  const disableInfo = {
    ...props.ing
  };
  for (let key in disableInfo) {
    disableInfo[key] = disableInfo[key] <= 0;
  }

  let orderSummary = null;

  if (isLoading) {
    orderSummary = (
      <Modal click={modalHandler} show={isLoading}>
        <Spinner />
      </Modal>
    );
  }

  let burger = !props.error ? (
    <Spinner />
  ) : (
    <Modal show={props.error}>
      <p style={{ textAlign: 'center' }}>{props.error.message}</p>
      <p style={{ textAlign: 'center' }}>Try Reload!</p>
    </Modal>
  );
  if (props.ing) {
    burger = (
      <>
        <Burger ingredients={props.ing} />
        <BuildController
          ingredientsAdded={props.onIngredientAdded}
          ingredientsRemoved={props.onIngredientRemoved}
          disabled={disableInfo}
          price={props.price}
          isPurchaseable={isPurchaseable(props.ing)}
          purchaseMode={modalHandler}
          isAuth={props.isAuth}
        />
      </>
    );

    orderSummary = (
      <OrderSummary
        ingredients={props.ing}
        price={props.price}
        purchaseMode={modalHandler}
        purchase={onPurchaseContinue}
      />
    );
  }

  if (isLoading) {
    orderSummary = <Spinner />;
  }

  return (
    <>
      <Modal click={modalHandler} show={showModal}>
        {orderSummary}
      </Modal>

      {burger}
    </>
  );
};

const mapStateToProps = state => {
  // console.log(state.auth.token);
  return {
    ing: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    error: state.burgerBuilder.error,
    isAuth: state.auth.token !== null
  };
};

const mapDispatchToProps = dispach => {
  return {
    onIngredientAdded: ingredientName =>
      dispach(actionType.addIngredients(ingredientName)),
    onIngredientRemoved: ingredientName =>
      dispach(actionType.removeIngredients(ingredientName)),
    onInitIngredients: () => dispach(actionType.getIngredients())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BurgerBuilder);
