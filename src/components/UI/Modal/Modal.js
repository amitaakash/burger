import React from 'react';

import styles from './Modal.module.css';
import Backdrop from '../Backdrop/Backdrop';

const modal = props => {
  return (
    <>
      <Backdrop click={props.click} />
      <div className={styles.Modal}>{props.children}</div>
    </>
  );
};

export default modal;
