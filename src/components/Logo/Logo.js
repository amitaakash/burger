import React from 'react';

import styles from './Logo.module.css';
import LogoImg from '../../assets/images/burger-logo.png';

const logo = props => {
  return (
    <div className={styles.Logo}>
      <img src={LogoImg} alt="Gupta Burger" />
    </div>
  );
};

export default logo;
