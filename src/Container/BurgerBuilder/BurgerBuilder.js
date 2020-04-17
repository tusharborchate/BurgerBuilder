import React, { Component } from "react";
import Auxiliary from "../../hoc/Auxiliary";
import Burger from "../../Component/Burger/Burger";
import BuildControls from "../../Component/Burger/BuildControls/BuildControls";
import Modal from "../../Component/UI/Modal/Modal";
import OrderSummary from "../../Component/Burger/OrderSummary/OrderSummary";
import axios from "../axios-orders";
import Spinner from "../../Component/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import Checkout from '../Checkout/Checkout';
import {Route} from'react-router-dom';

const INGRIDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7,
};

class BurgerBuilder extends Component {
  state = {
    ingredients: null,
    totalPrice: 4,
    purchasable: false,
    purchasing: false,
    loading: false,
    error: false,
  };

  componentDidMount() {
    console.log("burger");
    this.setState({ loading: true });
    this.reqInterceptors = axios
      .get("https://burgerapp-86cc5.firebaseio.com/ingredients.json")
      .then((response) => {
        this.resInterceptors = this.setState({
          ingredients: response.data,
          loading: false,
        });
      })
      .catch((error) => {
        this.setState({ loading: false });
      });
  }

  componentWillUnmount() {
    axios.interceptors.request.eject(this.reqInterceptors);
    axios.interceptors.response.eject(this.resInterceptors);
  }

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

  purchasingHandler = () => {
    this.setState({ purchasing: false });
  };
  purchaseCancel = () => {
    this.setState({ purchasing: false });
  };
  purchaseContinue = () => {
    this.setState({ loading: true });
    let queryParams=[];
    for (let key in this.state.ingredients) {
      queryParams.push(encodeURIComponent(key) + "=" + encodeURIComponent(this.state.ingredients[key]));
    }
    let queryString=queryParams.join('&');

     this.props.history.push({pathname:'/checkout',
      search:'?'+ queryString
    
    });
  };

  render() {
    const disabledInfo = { ...this.state.ingredients };

    for (const key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }
    let order = null;
    let burger = null;
    if (this.state.ingredients) {
      order = (
        <OrderSummary
          ingredients={this.state.ingredients}
          totalCost={this.state.totalPrice.toFixed(2)}
          purchaseCancel={this.purchaseCancel}
          purchaseContinue={this.purchaseContinue}
        ></OrderSummary>
      );

      burger = (
        <Auxiliary>
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
    if (this.state.loading) {
      order = <Spinner></Spinner>;
      burger = <Spinner></Spinner>;
    }

    return (
      <Auxiliary>
        <Modal show={this.state.purchasing} clicked={this.purchasingHandler}>
          {order}
        </Modal>
        {burger}
      </Auxiliary>
    );
  }
}

export default withErrorHandler(BurgerBuilder, axios);
