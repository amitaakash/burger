import React, { Component } from 'react';
import Burger from '../../components/Burger/Burger';
import BuildController from '../../components/Burger/BuildController/BuildController';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import * as actionType from '../../store/actions/index';

import { connect } from 'react-redux';
// import axios from '../../axios-burger';

const ingredient_price = {
  meat: 1.3,
  salad: 0.5,
  bacon: 0.7,
  cheese: 0.9
};

class BurgerBuilder extends Component {
  state = {
    /* ingredients: '',
    totalPrice: 4,
    isPurchaseable: false, */
    showModal: false,
    error: null,
    loading: false
  };

  componentDidMount = () => {
    this.props.onInitIngredients();
    /*  axios
      .get('/ingredients.json')
      .then(res => {
        this.setState({ ingredients: res.data });
      })
      .catch(err => {
        this.setState({ error: err });
      }); */
  };

  addIngredientHandler = type => {
    const oldCount = this.state.ingredients[type];
    const updatedCounts = oldCount + 1;
    const updatedIngredients = {
      ...this.state.ingredients
    };
    updatedIngredients[type] = updatedCounts;
    const priceAddition = ingredient_price[type];
    const updatedPrice = this.state.totalPrice + priceAddition;
    this.setState({
      ingredients: updatedIngredients,
      totalPrice: updatedPrice,
      isPurchaseable: this.isPurchaseable(updatedIngredients)
    });
  };

  removeIngredientHandler = type => {
    const oldCount = this.state.ingredients[type];
    const updatedCounts = oldCount - 1;
    const updatedIngredients = {
      ...this.state.ingredients
    };
    updatedIngredients[type] = updatedCounts;
    const priceAddition = ingredient_price[type];
    const updatedPrice = this.state.totalPrice - priceAddition;

    this.setState({
      ingredients: updatedIngredients,
      totalPrice: updatedPrice,
      isPurchaseable: this.isPurchaseable(updatedIngredients)
    });
  };

  isPurchaseable = ingredients => {
    const totalcount = Object.values(ingredients).reduce((prev, next) => {
      return prev + next;
    });
    return totalcount > 0;
  };
  modalHandler = () => {
    if (this.props.isAuth) {
      this.setState({
        showModal: !this.state.showModal
      });
    } else {
      this.props.history.push('/auth');
    }
  };

  onPurchaseContinue = () => {
    //alert('You continue');
    this.setState({ loading: true });
    /* 
    const queryParams = [];
    for (let i in this.state.ingredients) {
      queryParams.push(
        encodeURIComponent(i) +
          '=' +
          encodeURIComponent(this.state.ingredients[i])
      );
    }
    queryParams.push('price=' + this.state.totalPrice);*/
    //const queryString = queryParams.join('&');
    this.props.history.push({
      pathname: '/checkout'
      //search: queryString
    });
  };

  render() {
    //console.log(this.props.isAuth);
    const disableInfo = {
      ...this.props.ing
    };
    for (let key in disableInfo) {
      disableInfo[key] = disableInfo[key] <= 0;
    }

    let orderSummary = null;

    if (this.state.loading) {
      orderSummary = (
        <Modal click={this.modalHandler} show={this.state.loading}>
          <Spinner />
        </Modal>
      );
    }

    let burger = !this.props.error ? (
      <Spinner />
    ) : (
      <Modal show={this.props.error}>
        <p style={{ textAlign: 'center' }}>{this.props.error.message}</p>
        <p style={{ textAlign: 'center' }}>Try Reload!</p>
      </Modal>
    );
    if (this.props.ing) {
      burger = (
        <>
          <Burger ingredients={this.props.ing} />
          <BuildController
            ingredientsAdded={this.props.onIngredientAdded}
            ingredientsRemoved={this.props.onIngredientRemoved}
            disabled={disableInfo}
            price={this.props.price}
            isPurchaseable={this.isPurchaseable(this.props.ing)}
            purchaseMode={this.modalHandler}
            isAuth={this.props.isAuth}
          />
        </>
      );

      orderSummary = (
        <OrderSummary
          ingredients={this.props.ing}
          price={this.props.price}
          purchaseMode={this.modalHandler}
          purchase={this.onPurchaseContinue}
        />
      );
    }

    if (this.state.loading) {
      orderSummary = <Spinner />;
    }

    return (
      <>
        <Modal click={this.modalHandler} show={this.state.showModal}>
          {orderSummary}
        </Modal>

        {burger}
      </>
    );
  }
}
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
