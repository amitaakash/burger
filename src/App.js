import React, { useEffect, Suspense } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actionType from './store/actions/index';

import './App.css';
import Layout from './containers/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
//import Auth from './containers/Auth/Auth';
//import Orders from './containers/Orders/Orders';
//import Checkout from './containers/Checkout/Checkout';
//import Logout from './containers/Auth/Logout';

const Auth = React.lazy(() => import('./containers/Auth/Auth'));

const Orders = React.lazy(() => import('./containers/Orders/Orders'));

const Checkout = React.lazy(() => import('./containers/Checkout/Checkout'));

const Logout = React.lazy(() => import('./containers/Auth/Logout'));

const App = props => {
  const { authenticatedReload } = props;

  useEffect(() => {
    authenticatedReload();
  }, [authenticatedReload]);

  let route = (
    <Switch>
      <Route path="/auth" render={props => <Auth {...props} />} />
      <Route path="/" exact render={props => <BurgerBuilder {...props} />} />
      <Redirect to="/" />
    </Switch>
  );
  if (props.isAuth) {
    route = (
      <Switch>
        <Route path="/checkout" render={props => <Checkout {...props} />} />
        <Route path="/orders" render={props => <Orders {...props} />} />
        <Route path="/logout" render={props => <Logout {...props} />} />
        <Route path="/auth" render={props => <Auth {...props} />} />
        <Route path="/" exact render={props => <BurgerBuilder {...props} />} />
        <Redirect to="/" />
      </Switch>
    );
  }

  return (
    <Layout>
      <Suspense fallback={<div>Loading...</div>}>{route}</Suspense>
    </Layout>
  );
};

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
