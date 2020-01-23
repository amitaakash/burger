import React from 'react';
import styles from './SideDrawer.module.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import Backdrop from '../../UI/Backdrop/Backdrop';

const sideDrawer = props => {
  let attachedClasses = [styles.Sidedrawer, styles.Close];
  if (props.open) attachedClasses = [styles.Sidedrawer, styles.Open];
  //console.log(props);
  return (
    <>
      <Backdrop show={props.open} click={props.close} />
      <div className={attachedClasses.join(' ')} onClick={props.close}>
        <div className={styles.Logo}>
          <Logo />
        </div>
        <nav>
          <NavigationItems isAuthenticated={props.isAuthenticated} />
        </nav>
      </div>
    </>
  );
};

export default sideDrawer;
