import React, { Component } from 'react';
import Order from '../../components/Order/Order';
//import axios from '../../axios-burger';
import { connect } from 'react-redux';
import * as actionType from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';
import Modal from '../../components/UI/Modal/Modal';

class Orders extends Component {
  /* state = {
    orders: [],
    loading: true
  }; */

  componentDidMount = () => {
    /* axios
      .get('/orders.json')
      .then(res => {
        const fetchedOrders = [];
        for (let key in res.data) {
          fetchedOrders.push({
            ...res.data[key],
            id: key
          });
        }

        this.setState({ loading: false, orders: fetchedOrders });

        console.log(res.data);
      })
      .catch(err => {
        this.setState({ loading: false });
        console.log(err);
      }); */
    if (this.props.token) {
      this.props.getAllOrders(this.props.token, this.props.userId);
    }
  };
  render() {
    //console.log(this.props.userId);
    let orders = this.props.loading ? <Spinner /> : null;
    if (this.props.error) {
      orders = (
        <Modal show={this.props.error}>
          <p style={{ textAlign: 'center' }}>{this.props.error.message}</p>
          <p style={{ textAlign: 'center' }}>Try Reload!</p>
        </Modal>
      );
    }
    //console.log(this.props.orders);
    if (this.props.orders.length > 0) {
      orders = this.props.orders.map((order, index) => {
        return (
          <div className="ui grid segment" key={order.id + index}>
            <div className="ten wide column">
              <Order ingredients={order.ingredients} price={+order.price} />
            </div>
            <div className="six wide column">
              <h3>Customer Details</h3>
              <p>{order.customer.name}</p>
              <p>
                {order.customer.phone} | {order.customer.email}
              </p>
              <p>{order.customer.address}</p>
              <p>{order.customer.country}</p>
              <p>{order.customer.zipCode}</p>
            </div>
          </div>
        );
      });
    }
    return <div>{orders}</div>;
  }
}

const mapStateToProps = state => {
  return {
    orders: state.order.orders,
    loading: state.order.loading,
    token: state.auth.token,
    error: state.order.error,
    userId: state.auth.userId
  };
};
const mapDispatchToProps = dispatch => {
  return {
    getAllOrders: (token, userId) =>
      dispatch(actionType.getOrders(token, userId))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Orders);
