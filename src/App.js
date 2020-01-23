import React from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actionType from './store/actions/index';

import './App.css';
import Layout from './containers/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Auth from './containers/Auth/Auth';
import Logout from './containers/Auth/Logout';
import Orders from './containers/Orders/Orders';
import Checkout from './containers/Checkout/Checkout';

class App extends React.Component {
  componentDidMount = () => {
    this.props.authenticatedReload();
  };

  render() {
    let route = (
      <Switch>
        <Route path="/auth" exact component={Auth} />
        <Route path="/" exact component={BurgerBuilder} />
        <Redirect to="/" />
      </Switch>
    );
    if (this.props.isAuth) {
      route = (
        <Switch>
          <Route path="/checkout" component={Checkout} />
          <Route path="/orders" component={Orders} />
          <Route path="/logout" exact component={Logout} />
          <Route path="/" exact component={BurgerBuilder} />
          <Redirect to="/" />
        </Switch>
      );
    }

    return <Layout>{route}</Layout>;
  }
}

const mapStatetoProps = state => {
  return {
    isAuth: state.auth.token !== null
  };
};

const mapDispatchToProps = dispatch => {
  return {
    authenticatedReload: () =>
      dispatch(actionType.checkAuthenticationFromLocal())
  };
};

export default withRouter(connect(mapStatetoProps, mapDispatchToProps)(App));
