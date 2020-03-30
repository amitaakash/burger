import React from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import Contactdata from './contact-data/ContactData';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

const Checkout = props => {
  const checkoutCancelledHandler = () => {
    props.history.goBack();
  };
  const checkoutContinuedHandler = () => {
    props.history.replace('/checkout/contact-data');
  };

  if (!props.ing) {
    return <Redirect to="/" />;
  }

  console.log(props);

  return (
    <>
      <div>
        <CheckoutSummary
          ingredients={props.ing}
          onCheckoutCancelled={checkoutCancelledHandler}
          onCheckoutContinued={checkoutContinuedHandler}
        />
      </div>
      <Route
        path={props.match.path + '/contact-data'}
        component={Contactdata}
      />
    </>
  );
};
const mapStatesToProps = state => {
  return {
    ing: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice
  };
};

export default connect(mapStatesToProps)(Checkout);
