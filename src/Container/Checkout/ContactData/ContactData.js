import React, { Component } from "react";

import Button from "../../../Component/UI/Button/Button";
import Spinner from "../../../Component/UI/Spinner/Spinner";
import classes from "./ContactData.css";
import axios from "../../axios-orders";

class ContactData extends Component {
  state = {
    name: "",
    email: "",
    address: {
      street: "",
      postalCode: "",
    },
    loading: false,
  };

  componentWillUnmount(){
    alert("");
  }
  orderHandler = (event) => {
  //  event.preventDefault();
    this.setState({ loading: true });
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price,
      customer: {
        name: "Max Schwarzmüller",
        address: {
          street: "Teststreet 1",
          zipCode: "41351",
          country: "Germany",
        },
        email: "Y",
      },
      deliveryMethod: "fastest",
    };
    
    axios
      .post("/orders.json", order)
      .then(response=> {
       this.setState({ loading: false })
      })
      .catch(error => {
        this.setState( { loading: false } );
      });
  };

  render() {
    let form = (
      <div>
        <input
          className={classes.Input}
          type="text"
          name="name"
          placeholder="Your Name"
        />
        <input
          className={classes.Input}
          type="email"
          name="email"
          placeholder="Your Mail"
        />
        <input
          className={classes.Input}
          type="text"
          name="street"
          placeholder="Street"
        />
        <input
          className={classes.Input}
          type="text"
          name="postal"
          placeholder="Postal Code"
        />
        <Button btnType="Success" clicked={this.orderHandler}>
          ORDER
        </Button>
      </div>
    );
    if (this.state.loading) {
      form = <Spinner />;
    }
    return (
      <div className={classes.ContactData}>
        <h4>Enter your Contact Data</h4>
        {form}
      </div>
    );
  }
}

export default ContactData;
