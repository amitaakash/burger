import React, { useState } from 'react';
import styles from './Layout.module.css';
import { connect } from 'react-redux';

import Toolbar from '../../components/Navigations/Toolbar/Toolbar';
import Sidedrawer from '../../components/Navigations/SideDrawer/SideDrawer';
import UserPanel from '../../components/UI/UserPanel/UserPanel';

const Layout = props => {
  const [showSideDrawer, setShowSideDrawer] = useState(false);

  const sideDrawerClosedHandler = () => {
    setShowSideDrawer(false);
  };

  const sideDrawerToggleHandler = () => {
    setShowSideDrawer(!showSideDrawer);
  };

  //console.log(props.userId);
  return (
    <>
      <div>
        <Toolbar
          clicked={sideDrawerToggleHandler}
          isAuthenticated={props.isAuthenticated}
        />

        <Sidedrawer
          open={showSideDrawer}
          close={sideDrawerClosedHandler}
          isAuthenticated={props.isAuthenticated}
        />
      </div>
      <div
        className={styles.main}
        style={!props.isAuthenticated ? { marginTop: '56px' } : null}
      >
        <UserPanel userInfo={props.email} />
        {props.children}
      </div>
    </>
  );
};

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null,
    email: state.auth.email
  };
};

export default connect(mapStateToProps)(Layout);
