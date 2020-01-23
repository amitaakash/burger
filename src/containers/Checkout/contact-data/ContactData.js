import React from 'react';
import Button from '../../../components/UI/Buttons/Buttons';
import Spinner from '../../../components/UI/Spinner/Spinner';
import * as countryList from '../../../shared/countrylist';
import { checkValidity } from '../../../shared/validation';
import Input from '../../../components/UI/Input/Input';
import { connect } from 'react-redux';
import * as actionType from '../../../store/actions/index';
import Modal from '../../../components/UI/Modal/Modal';
import { Link } from 'react-router-dom';

class ContactData extends React.Component {
  state = {
    orderForm: {
      name: {
        inputtype: 'textbox',
        htmlConfig: {
          placeholder: 'Your name',
          type: 'text'
        },
        label: 'Name',
        value: '',
        validationConfig: {
          required: true,
          minlength: 10,
          maxlength: 30
        },
        isValid: false,
        isToched: false,
        message: ''
      },
      phone: {
        inputtype: 'textbox',
        htmlConfig: {
          placeholder: 'Contact number',
          type: 'tel'
        },
        label: 'Contact number',
        value: '',
        validationConfig: {
          required: true,
          minlength: 10,
          maxlength: 10
        },
        isValid: false,
        isToched: false,
        message: ''
      },
      email: {
        inputtype: 'textbox',
        htmlConfig: {
          placeholder: 'Your email',
          type: 'email',
          disabled: true
        },
        label: 'Email',
        value: this.props.email,
        validationConfig: {
          //required: true,
          //email: true
        },
        isValid: true,
        isToched: false,
        message: ''
      },
      address: {
        inputtype: 'textarea',
        htmlConfig: {
          placeholder: 'fill your full adderess'
        },
        label: 'Address',
        value: '',
        validationConfig: {
          required: true,
          minlength: 10,
          maxlength: 30
        },
        isValid: false,
        isToched: false,
        message: ''
      },
      country: {
        inputtype: 'option',
        htmlConfig: {
          options: countryList.country
        },
        label: 'Country',
        value: '',
        validationConfig: {
          required: true
        },
        isValid: false,
        isToched: false,
        message: ''
      },
      zip: {
        inputtype: 'textbox',
        htmlConfig: {
          placeholder: 'zip code',
          type: 'number',
          disabled: false,
          'min-length': 6
        },
        label: 'Zip code',
        value: '',
        validationConfig: {
          required: true
        },
        isValid: false,
        isToched: false,
        message: ''
      },
      delivery: {
        inputtype: 'option',
        htmlConfig: {
          options: [
            { value: '', displayValue: 'Select delivery method' },
            { value: 'fastest', displayValue: 'I am hungry!' },
            { value: 'cheepest', displayValue: 'I want to save some pennies!' }
          ]
        },
        label: 'Delivery Method',
        value: '',
        validationConfig: {
          //required: true
        },
        isValid: true,
        isToched: false,
        message: ''
      }
    },
    formvalidity: false
  };

  inputChangeHandler = (event, id) => {
    const orderFormCopy = {
      ...this.state.orderForm
    };
    const toUpdateElement = { ...orderFormCopy[id] };
    toUpdateElement.value = event.target.value;

    // validity check code.
    toUpdateElement.isToched = true;
    const validity = checkValidity(
      toUpdateElement.value,
      orderFormCopy[id].validationConfig
    );
    toUpdateElement.isValid = validity.isValid;

    //const htmlSelector = { ...toUpdateElement.htmlConfig };

    toUpdateElement.message = validity.message
      ? toUpdateElement.label + ' ' + validity.message
      : '';

    orderFormCopy[id] = toUpdateElement;

    let formValidityCheck = true;
    for (let formElement in orderFormCopy) {
      formValidityCheck =
        orderFormCopy[formElement].isValid && formValidityCheck;
    }

    this.setState({
      orderForm: orderFormCopy,
      formvalidity: formValidityCheck
    });
  };

  orderHandler = event => {
    event.preventDefault();
    //this.setState({ loading: true });
    const order = {
      ingredients: this.props.ing,
      price: this.props.price,
      customer: {
        name: this.state.orderForm.name.value,
        address: this.state.orderForm.address.value,
        email: this.state.orderForm.email.value,
        phone: this.state.orderForm.phone.value,
        zipCode: this.state.orderForm.zip.value,
        country: this.state.orderForm.country.value
      },
      deliveryMethod: this.state.orderForm.delivery.value,
      userId: this.props.userId
    };
    this.props.onOrderPlace(order, this.props.token);
    /* axios
      .post('/orders.json', order)
      .then(res => {
        console.log(res);
        this.setState({ loading: false });
        this.props.reHydrateState();
        this.props.history.push('/');
      })
      .catch(err => {
        this.setState({ loading: false });
      });
    console.log(order); */
  };

  render() {
    //console.log(this.props);
    const formArray = [];
    for (let key in this.state.orderForm) {
      formArray.push({
        id: key,
        config: this.state.orderForm[key]
      });
    }

    let form = (
      <form className="ui form segment container" onSubmit={this.onSubmitForm}>
        <h3>Tell Us About Yourself</h3>

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

        <Button
          btnType="Success"
          disabled={!this.state.formvalidity}
          click={this.orderHandler}
        >
          PLACE ORDER
        </Button>
      </form>
    );
    if (this.props.loading)
      form = (
        <div>
          <Spinner />
        </div>
      );
    if (this.props.error) {
      form = (
        <Modal show={this.props.error}>
          <p style={{ textAlign: 'center' }}>{this.props.error.message}</p>
          <p style={{ textAlign: 'center' }}>Try Reload!</p>
        </Modal>
      );
    }
    if (this.props.isPurchased) {
      form = (
        <Modal show={this.props.isPurchased}>
          <h1 style={{ textAlign: 'center' }}>
            You have successfully placed your order
          </h1>
          <div style={{ textAlign: 'center' }}>
            <Link to="/" className="ui btn btn-link">
              Back to home
            </Link>
          </div>
        </Modal>
      );
    }
    return <div>{form}</div>;
  }
}
const mapStateToProps = state => {
  return {
    ing: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    loading: state.order.loading,
    error: state.order.error,
    isPurchased: state.order.isPurchased,
    token: state.auth.token,
    email: state.auth.email,
    userId: state.auth.userId
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onOrderPlace: (order, token) =>
      dispatch(actionType.purchaseProcess(order, token))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ContactData);
