import React, { Component } from 'react';
import Burger from '../../components/Burger/Burger';
import BuildController from '../../components/Burger/BuildController/BuildController';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-burger';

const ingredient_price = {
  meat: 1.3,
  salad: 0.5,
  bacon: 0.7,
  cheese: 0.9
};

class BurgerBuilder extends Component {
  state = {
    ingredients: '',
    totalPrice: 4,
    isPurchaseable: false,
    showModal: false
  };

  componentDidMount = () => {
    axios
      .get('/ingredients.json')
      .then(res => {
        this.setState({ ingredients: res.data });
      })
      .catch(err => console.log(err));
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

  onPurchaseContinue = () => {
    alert('you Continue');
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
          <Modal click={this.modalHandler}>
            <OrderSummary
              ingredients={this.state.ingredients}
              price={this.state.totalPrice}
              purchaseMode={this.modalHandler}
              purchase={this.onPurchaseContinue}
            />
          </Modal>
        ) : null}
        <Burger ingredients={this.state.ingredients} />
        <BuildController
          ingredientsAdded={this.addIngredientHandler}
          ingredientsRemoved={this.removeIngredientHandler}
          disabled={disableInfo}
          price={this.state.totalPrice}
          isPurchaseable={this.state.isPurchaseable}
          purchaseMode={this.modalHandler}
        />
      </>
    );
  }
}

export default BurgerBuilder;
