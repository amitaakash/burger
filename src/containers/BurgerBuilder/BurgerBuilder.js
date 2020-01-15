import React, { Component } from 'react';
import Burger from '../../components/Burger/Burger';
import BuildController from '../../components/Burger/BuildController/BuildController';
import Modal from '../../components/UI/Modal/Modal';

const ingredient_price = {
  meat: 1.3,
  salad: 0.5,
  bacon: 0.7,
  cheese: 0.9
};

class BurgerBuilder extends Component {
  state = {
    ingredients: {
      meat: 0,
      bacon: 0,
      salad: 0,
      cheese: 0
    },
    totalPrice: 4,
    isPurchaseable: false,
    showModal: true
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
    this.setState({
      showModal: !this.state.showModal
    });
  };
  render() {
    const disableInfo = {
      ...this.state.ingredients
    };
    for (let key in disableInfo) {
      disableInfo[key] = disableInfo[key] <= 0;
    }
    return (
      <>
        {this.state.showModal ? (
          <Modal click={this.modalHandler}>Test contents</Modal>
        ) : null}
        <Burger ingredients={this.state.ingredients} />
        <BuildController
          ingredientsAdded={this.addIngredientHandler}
          ingredientsRemoved={this.removeIngredientHandler}
          disabled={disableInfo}
          price={this.state.totalPrice}
          isPurchaseable={this.state.isPurchaseable}
        />
      </>
    );
  }
}

export default BurgerBuilder;
