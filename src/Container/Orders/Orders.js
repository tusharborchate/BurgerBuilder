import React, { Component } from "react";
import Order from "../Orders/Order/Order";
import axios from "../../Container/axios-orders";
import Spinner from "../../Component/UI/Spinner/Spinner";
class Orders extends Component {
  state = {
    orders: [],
    loading: true,
  };
  componentDidMount() {
    axios.get("/orders.json").then((data) => {
      let orderList = [];
      console.log(data);
      for (let key in data.data) {
        orderList.push({ ...data.data[key], id: key });
      }
      console.log(orderList);
      this.setState({ orders: orderList, loading: false });
    });
  }

  render() {
    let orders = <Spinner />;

    if (!this.state.loading) {
      orders = this.state.orders.map(order => {
        return <Order key={order.id} ingredients={order.ingredients}></Order>;
      });
    }
    return <div>{orders}</div>;
  }
}

export default Orders;
