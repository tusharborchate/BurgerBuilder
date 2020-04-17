import React, { Component } from "react";
import Layout from "./Component/Layout/Layout";
import BurgerBuilder from "./Container/BurgerBuilder/BurgerBuilder";
import { Switch,Route } from "react-router-dom";
import Checkout from "./Container/Checkout/Checkout";
import Orders from './Container/Orders/Orders';
class App extends Component {
  render() {
    return (
      <div>
        <Layout>
          
            <Route path="/checkout" component={Checkout}/>
            <Route path="/orders" component={Orders}/>
            <Route path="/" exact component={BurgerBuilder}/>
         
        </Layout>
      </div>
    );
  }
}

export default App;
