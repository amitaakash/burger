import React, { useState } from 'react';

import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Buttons/Buttons';
import { checkValidity } from '../../shared/validation';
import * as actions from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';
//import Modal from '../../components/UI/Modal/Modal';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

const Auth = props => {
  const [loginForm, setLoginForm] = useState({
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
  });

  const [isSignUp, setSignUP] = useState(false);

  const inputChangeHandler = (event, id) => {
    const loginFormCopy = {
      ...loginForm
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

    setLoginForm(loginFormCopy);
  };

  const onSubmitForm = event => {
    event.preventDefault();
    props.onAuth(loginForm.email.value, loginForm.password.value, isSignUp);
  };
  /* const loginHandler = () => {
   
  }; */

  const signinModehandler = () => {
    setSignUP(!isSignUp);
  };

  const formArray = [];
  for (let key in loginForm) {
    formArray.push({
      id: key,
      config: loginForm[key]
    });
  }
  console.log(props.burgerBuilding, props.isAuthenticated);
  let form = (
    <form className="ui form segment container" onSubmit={onSubmitForm}>
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
            onChange={event => inputChangeHandler(event, form.id)}
            {...form.config.htmlConfig}
          />
        );
      })}

      <div style={{ textAlign: 'center' }}>
        <Button btnType="Success">SUBMIT</Button>
      </div>
      <div className="ui toggle checkbox">
        <input
          className="ui"
          type="checkbox"
          name="public"
          onClick={signinModehandler}
        />
        <label>Sign up</label>
      </div>
    </form>
  );
  if (props.loading) {
    form = <Spinner />;
  }
  let redirect = null;
  if (props.isAuthenticated && props.burgerBuilding) {
    redirect = <Redirect to="/checkout" />;
  } else if (props.isAuthenticated && !props.burgerBuilding) {
    redirect = <Redirect to="/" />;
  }

  let errorMessage = null;
  if (props.error) {
    errorMessage = (
      <div className="ui message error container">
        <p style={{ textAlign: 'center' }}>{props.error.message}</p>
        <p style={{ textAlign: 'center' }}>Try Again!</p>
      </div>
    );
  }
  return (
    <div>
      {redirect}
      {errorMessage}
      {form}
    </div>
  );
};

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
