import React from 'react';
import styles from './Buttons.module.css';

const button = props => {
  return (
    <button
      className={[styles.Button, styles[props.btnType]].join(' ')}
      onClick={props.click}
    >
      {props.children}
    </button>
  );
};

export default button;
