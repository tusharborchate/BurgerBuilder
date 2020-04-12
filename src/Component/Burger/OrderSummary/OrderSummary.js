import React, { Component } from "react";

import Auxiliry from "../../../hoc/Auxiliary";
import Button from "../../UI/Button/Button";

class OrderSummary extends Component {

    componentDidUpdate()
    {
        console.log("order");
    }
  render(){
    const ingredientSummary = Object.keys(this.props.ingredients).map((igKey) => {
    return (
      <li key={igKey}>
        <span style={{ textTransform: "capitalize" }}>{igKey}</span>:
        <span>{this.props.ingredients[igKey]}</span>
      </li>
    );
  });

  return (
    <Auxiliry>
      <h3>Your order</h3>
      <p> Burger with following ingredients</p>
      <ul>{ingredientSummary}</ul>
      <p>
        <strong>Total Cost : {this.props.totalCost}</strong>
      </p>
      <Button btnType="Danger" clicked={this.props.purchaseCancel}>
        Cancel
      </Button>
      <Button btnType="Success" clicked={this.props.purchaseContinue}>
        Success
      </Button>
    </Auxiliry>
  );
};
}
export default OrderSummary;
