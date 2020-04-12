import React, { Component } from "react";
import Auxiliary from "../../hoc/Auxiliary";
import Burger from "../../Component/Burger/Burger";
import BuildControls from "../../Component/Burger/BuildControls/BuildControls";
import Modal from "../../Component/UI/Modal/Modal";
import OrderSummary from "../../Component/Burger/OrderSummary/OrderSummary";
const INGRIDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7,
};

class BurgerBuilder extends Component {
  state = {
    ingredients: {
      cheese: 0,
      salad: 0,
      meat: 0,
      bacon: 0,
    },
    totalPrice: 4,
    purchasable: false,
    purchasing: false,
  };

  addIngredientHandler = (type) => {
    const oldCount = this.state.ingredients[type];
    const updatedCount = oldCount + 1;
    const updatedIngredient = { ...this.state.ingredients };
    updatedIngredient[type] = updatedCount;
    const updatedPrice = INGRIDIENT_PRICES[type] + this.state.totalPrice;
    this.setState({ totalPrice: updatedPrice, ingredients: updatedIngredient });
    this.updatePurchaseState();
  };

  removeIngredientHandler = (type) => {
    const oldCount = this.state.ingredients[type];
    if (oldCount == 0) {
      return;
    } else {
      const updatedCount = oldCount - 1;
      const updatedIngredient = { ...this.state.ingredients };
      updatedIngredient[type] = updatedCount;
      const updatedPrice = this.state.totalPrice - INGRIDIENT_PRICES[type];
      this.setState({
        totalPrice: updatedPrice,
        ingredients: updatedIngredient,
      });
      this.updatePurchaseState(updatedPrice);
    }
  };

  updatePurchaseState(updatedPrice) {
    this.setState({ purchasable: updatedPrice == 4 ? false : true });
  }

  orderBurgerHandler = () => {
    this.setState({ purchasing: true });
  };

  purchasingHandler = () =>
  {
    this.setState({ purchasing: false });
  }
  purchaseCancel = () =>
  {
    this.setState({ purchasing: false });
  }
  purchaseContinue = () =>
  {
   alert("");
  }

  render() {
    const disabledInfo = { ...this.state.ingredients };

    for (const key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }
    return (
      <Auxiliary>
        <Modal show={this.state.purchasing} clicked={this.purchasingHandler}>
          <OrderSummary ingredients={this.state.ingredients} totalCost={this.state.totalPrice.toFixed(2)} purchaseCancel={this.purchaseCancel} purchaseContinue={this.purchaseContinue}></OrderSummary>
        </Modal>
        <Burger ingredients={this.state.ingredients}></Burger>
        <div>
          <BuildControls
            ingredientAdded={this.addIngredientHandler}
            ingredientRemoved={this.removeIngredientHandler}
            disabledInfo={disabledInfo}
            price={this.state.totalPrice}
            purchasable={this.state.purchasable}
            ordered={this.orderBurgerHandler}
          ></BuildControls>
        </div>
      </Auxiliary>
    );
  }
}

export default BurgerBuilder;
