import React from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import Contactdata from './contact-data/ContactData';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

class Checkout extends React.Component {
  /* state = {
    ingredients: {
      meat: 1,
      salad: 1,
      cheese: 1,
      bacon: 1
    },
    price: 0
  }; */

  /* componentDidMount = () => {
    const query = new URLSearchParams(this.props.location.search);
    const ingredients = {};
    let price = 0;
    for (let param of query.entries()) {
      if (param[0] === 'price') {
        price = param[1];
      } else {
        ingredients[param[0]] = +param[1];
      }

      // ['salad', '1']
    }
    this.setState({ ingredients, price });
  };
 */
  checkoutCancelledHandler = () => {
    this.props.history.goBack();
  };
  checkoutContinuedHandler = () => {
    this.props.history.replace('/checkout/contact-data');
  };
  render() {
    if (!this.props.ing) {
      return <Redirect to="/" />;
    }

    return (
      <>
        <div>
          <CheckoutSummary
            ingredients={this.props.ing}
            onCheckoutCancelled={this.checkoutCancelledHandler}
            onCheckoutContinued={this.checkoutContinuedHandler}
          />
        </div>
        <Route
          path={this.props.match.path + '/contact-data'}
          component={Contactdata}
          /*  render={() => (
            <Contactdata
              ingredients={this.props.ing}
              price={this.props.price}
              {...this.props}
            />
          )} */
        />
      </>
    );
  }
}

const mapStatesToProps = state => {
  return {
    ing: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice
  };
};

export default connect(mapStatesToProps)(Checkout);
