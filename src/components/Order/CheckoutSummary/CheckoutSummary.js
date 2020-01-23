import React from 'react';
import Burger from '../../Burger/Burger';
import Button from '../../UI/Buttons/Buttons';

const checkoutSummary = props => {
  let burgerRender = (
    <div>
      <h1 style={{ textAlign: 'center' }}>
        Burger was not built yet. Try Again!
      </h1>
    </div>
  );

  if (props.ingredients) {
    burgerRender = (
      <div>
        <h1 style={{ textAlign: 'center' }}>We hope it tastes well!</h1>
        <div style={{ maxHeight: '40vh' }}>
          <Burger ingredients={props.ingredients} />
        </div>
        <div style={{ textAlign: 'center' }}>
          <Button btnType="Danger" click={props.onCheckoutCancelled}>
            CANCEL
          </Button>
          <Button btnType="Success" click={props.onCheckoutContinued}>
            CONTINUE
          </Button>
        </div>
      </div>
    );
  }

  return <>{burgerRender}</>;
};

export default checkoutSummary;
