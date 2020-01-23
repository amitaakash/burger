import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import * as actiontypes from '../../store/actions/index';

class Logout extends React.Component {
  componentDidMount = () => {
    this.props.onLogOut();
  };

  render() {
    return <Redirect to="/" />;
  }
}
const mapDispatchToProps = dispatch => {
  return {
    onLogOut: () => dispatch(actiontypes.logOut())
  };
};
export default connect(null, mapDispatchToProps)(Logout);
