import React, { Component } from 'react';

import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Buttons/Buttons';
import { checkValidity } from '../../shared/validation';
import * as actions from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';
//import Modal from '../../components/UI/Modal/Modal';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

class Auth extends Component {
  state = {
    loginForm: {
      email: {
        inputtype: 'textbox',
        htmlConfig: {
          placeholder: 'Email',
          type: 'email',
          autoComplete: 'off'
        },
        label: 'Email',
        value: '',
        validationConfig: {
          required: true,
          email: true
        },
        isValid: false,
        isToched: false,
        message: ''
      },
      password: {
        inputtype: 'textbox',
        htmlConfig: {
          placeholder: 'password',
          type: 'password',
          autoComplete: 'off'
        },
        label: 'Password',
        value: '',
        validationConfig: {
          required: true,
          minlength: 6
        },
        isValid: false,
        isToched: false,
        message: ''
      }
    },
    isSignUp: false
  };

  inputChangeHandler = (event, id) => {
    const loginFormCopy = {
      ...this.state.loginForm
    };
    const toUpdateElement = { ...loginFormCopy[id] };
    toUpdateElement.value = event.target.value;

    // validity check code.
    toUpdateElement.isToched = true;
    const validity = checkValidity(
      toUpdateElement.value,
      loginFormCopy[id].validationConfig
    );
    toUpdateElement.isValid = validity.isValid;

    toUpdateElement.message = validity.message
      ? toUpdateElement.label + ' ' + validity.message
      : '';

    loginFormCopy[id] = toUpdateElement;

    this.setState({
      loginForm: loginFormCopy
    });
  };

  onSubmitForm = event => {
    event.preventDefault();
  };
  loginHandler = () => {
    this.props.onAuth(
      this.state.loginForm.email.value,
      this.state.loginForm.password.value,
      this.state.isSignUp
    );
  };

  signinModehandler = () => {
    this.setState(prevState => {
      return { isSignUp: !prevState.isSignUp };
    });
  };

  render() {
    //console.log(this.props.burgerBuilding);
    const formArray = [];
    for (let key in this.state.loginForm) {
      formArray.push({
        id: key,
        config: this.state.loginForm[key]
      });
    }
    let form = (
      <form className="ui form segment container" onSubmit={this.onSubmitForm}>
        <h3 style={{ textAlign: 'center' }}>Login / Sign Up</h3>

        <hr style={{ marginBottom: '30px' }} />

        {formArray.map(form => {
          return (
            <Input
              validity={!form.config.isValid ? 'invalid' : null}
              touched={form.config.isToched ? 'touched' : null}
              message={form.config.message}
              key={form.id}
              label={form.config.label}
              inputtype={form.config.inputtype}
              value={form.config.value}
              onChange={event => this.inputChangeHandler(event, form.id)}
              {...form.config.htmlConfig}
            />
          );
        })}

        <div style={{ textAlign: 'center' }}>
          <Button btnType="Success" click={this.loginHandler}>
            SUBMIT
          </Button>
        </div>
        <div className="ui toggle checkbox">
          <input
            className="ui"
            type="checkbox"
            name="public"
            onClick={this.signinModehandler}
          />
          <label>Sign up</label>
        </div>
      </form>
    );
    if (this.props.loading) {
      form = <Spinner />;
    }

    if (this.props.isAuthenticated && this.props.burgerBuilding) {
      form = <Redirect to="/checkout" />;
    } else if (this.props.isAuthenticated && !this.props.burgerBuilding) {
      form = <Redirect to="/" />;
    }

    let errorMessage = null;
    if (this.props.error) {
      errorMessage = (
        <div className="ui message error container">
          <p style={{ textAlign: 'center' }}>{this.props.error.message}</p>
          <p style={{ textAlign: 'center' }}>Try Again!</p>
        </div>
      );
    }

    return (
      <div>
        {errorMessage}
        {form}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    isAuthenticated: state.auth.token !== null,
    burgerBuilding: state.burgerBuilder.buildingBurger
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onAuth: (email, password, isSignUp) =>
      dispatch(actions.authenticationProcess(email, password, isSignUp))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
