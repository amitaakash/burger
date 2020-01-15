import React from 'react';
import styles from './BuildController.module.css';

import BuildControls from './BuildControls/BuildControls';

const controls = [
  { label: 'Salad', type: 'salad' },
  { label: 'Meat', type: 'meat' },
  { label: 'Bacon', type: 'bacon' },
  { label: 'Cheese', type: 'cheese' }
];
const buildController = props => {
  //console.log(props.disabled);
  const buildControls = controls.map((control, i) => {
    return (
      <BuildControls
        label={control.label}
        key={control.type}
        added={() => props.ingredientsAdded(control.type)}
        removed={() => props.ingredientsRemoved(control.type)}
        disabled={props.disabled[control.type]}
      />
    );
  });
  return (
    <div className={styles.BuildControls}>
      <div>
        <h4>Total Price: $ {props.price.toFixed(2)}</h4>
      </div>
      {buildControls}
      {props.isPurchaseable ? (
        <button className={styles.OrderButton} onClick={props.purchaseMode}>
          ORDER NOW
        </button>
      ) : null}
      {/* <button className={styles.OrderButton}>ORDER NOW</button> */}
    </div>
  );
};

export default buildController;
