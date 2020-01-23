import React from 'react';
import styles from './Toggle.module.css';

const toggle = props => (
  <div onClick={props.toggleHandler} className={styles.DrawerToggle}>
    <div></div>
    <div></div>
    <div></div>
  </div>
);

export default toggle;
