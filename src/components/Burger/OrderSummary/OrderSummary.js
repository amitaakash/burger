import React from 'react';
import Button from '../../UI/Buttons/Buttons';

//import styles from './OrderSummary.module.css';

const orderSummary = props => {
  const ingredientsSummary = Object.keys(props.ingredients).map(
    (ingredient, index) => {
      return (
        <li key={ingredient}>
          <span style={{ textTransform: 'capitalize' }}>{ingredient}:</span>{' '}
          {props.ingredients[ingredient]}
        </li>
      );
    }
  );
  return (
    <>
      <h3>Your order summary</h3>
      <p>A delicious burger with following ingredients:</p>
      <ul>{ingredientsSummary}</ul>
      <hr />
      <h4 style={{ textAlign: 'center' }}>
        Total ammount: $ {props.price.toFixed(2)}
      </h4>
      <hr />
      <p style={{ textAlign: 'center' }}>Do you want to continue?</p>
      <div style={{ textAlign: 'center' }}>
        <Button btnType="Danger" click={props.purchaseMode}>
          CANCEL
        </Button>
        <Button btnType="Success" click={props.purchase}>
          CONTINUE
        </Button>
      </div>
    </>
  );
};

export default orderSummary;
