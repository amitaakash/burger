import React from 'react';

import styles from './Toolbar.module.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import Toggle from '../SideDrawer/Toggle/Toggle';

const toolbar = props => {
  return (
    <>
      <div className={styles.Toolbar}>
        <Toggle toggleHandler={props.clicked} />
        <div className={styles.Logo}>
          <Logo />
        </div>
        <nav className={styles.DesktopOnly}>
          <NavigationItems isAuthenticated={props.isAuthenticated} />
        </nav>
      </div>
    </>
  );
};

export default toolbar;
