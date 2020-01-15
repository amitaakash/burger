import React from 'react';
import styles from './Backdrop.module.css';

const backdrop = props => {
  return <div className={styles.Backdrop} onClick={props.click}></div>;
};

export default backdrop;
