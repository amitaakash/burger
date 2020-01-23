import React from 'react';
import styles from './Order.module.css';

const Order = ({ ingredients, price }) => {
  const ingredientsArray = [];

  for (let ingredientName in ingredients) {
    ingredientsArray.push({
      name: ingredientName,
      quantity: ingredients[ingredientName]
    });
  }

  const ingredientsList = ingredientsArray.map(ing => {
    return (
      <span
        className={[styles.IngList, styles[ing.name]].join(' ')}
        key={ing.name}
      >
        {ing.name}: {ing.quantity}
      </span>
    );
  });

  return (
    <div>
      <h3>Order details </h3>
      <p>{ingredientsList}</p>
      <h4>
        Price: <strong>$ {price.toFixed(2)}</strong>
      </h4>
    </div>
  );
};

export default Order;
