import React from 'react';
import styles from './Layout.module.css';
import { connect } from 'react-redux';

import Toolbar from '../../components/Navigations/Toolbar/Toolbar';
import Sidedrawer from '../../components/Navigations/SideDrawer/SideDrawer';
import UserPanel from '../../components/UI/UserPanel/UserPanel';

class Layout extends React.Component {
  state = {
    showSideDrawer: false
  };
  sideDrawerClosedHandler = () => {
    this.setState({ showSideDrawer: false });
  };

  sideDrawerToggleHandler = () => {
    this.setState(prevState => {
      return { showSideDrawer: !prevState.showSideDrawer };
    });
  };
  render() {
    //console.log(this.props.userId);
    return (
      <>
        <div>
          <Toolbar
            clicked={this.sideDrawerToggleHandler}
            isAuthenticated={this.props.isAuthenticated}
          />

          <Sidedrawer
            open={this.state.showSideDrawer}
            close={this.sideDrawerClosedHandler}
            isAuthenticated={this.props.isAuthenticated}
          />
        </div>
        <div
          className={styles.main}
          style={!this.props.isAuthenticated ? { marginTop: '56px' } : null}
        >
          <UserPanel userInfo={this.props.email} />
          {this.props.children}
        </div>
      </>
    );
  }
}
const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null,
    email: state.auth.email
  };
};

export default connect(mapStateToProps)(Layout);
