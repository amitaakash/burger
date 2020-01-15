import React from 'react';

import styles from './Burger.module.css';
import BurgerIngredients from './BurgerIngredients/BurgerIngredients';

const burger = props => {
  let ingredients = Object.keys(props.ingredients)
    .map(igkey => {
      return [...Array(props.ingredients[igkey])].map((_, index) => {
        return <BurgerIngredients type={igkey} key={igkey + index} />;
      });
    })
    .reduce((arr, el) => {
      return arr.concat(el);
    }, []);
  //console.log(ingredients);
  if (ingredients.length === 0) {
    ingredients = <p>Please start adding ingredients</p>;
  }
  return (
    <div className={styles.BurgerContainer}>
      <div className={styles.Burger}>
        <BurgerIngredients type="bread-top" />
        {ingredients}
        <BurgerIngredients type="bread-bottom" />
      </div>
    </div>
  );
};

export default burger;
