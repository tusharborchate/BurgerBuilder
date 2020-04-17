import React, { Component } from "react";
import Burger from "../../Component/Burger/Burger";
import Button from "../../Component/UI/Button/Button";
import { Route } from "react-router-dom";
import ContactData from "../../Container/Checkout/ContactData/ContactData";
import CheckoutSummary from "./CheckoutSummary/CheckoutSummary";
class Checkout extends Component {
  state = {
    ingredients: {
      salad: 1,
      cheese: 1,
      meat: 0,
      bacon: 0,
    },
  };
  componentWillUnmount(){
    alert("");
  }

  UNSAFE_componentWillMount() {
    let queryParams = new URLSearchParams(this.props.location.search);
    let ingredients = {};
    for (let param of queryParams.entries()) {
      ingredients[param[0]] = +param[1];
    }
    this.setState({
      ingredients: ingredients,
    });
  }

  cancelPurchaseHandler = () => {
    this.props.history.goBack();
  };

  continuePurchaseHandler = () => {
    this.setState({'loading':'false'});
   this.props.history.push("/checkout/contactdata");
  };

  render() {
    return (
      <div>
        <CheckoutSummary
                    ingredients={this.state.ingredients}
                    checkoutCancelled={this.cancelPurchaseHandler}
                    checkoutContinued={this.continuePurchaseHandler} />
        <Route
          path={this.props.match.path + "/contactdata"}
          render={()=> (<ContactData ingredients={this.state.ingredients}/>)}
        />
      </div>
    );
  }
}

export default Checkout;
