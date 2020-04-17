import React, { Component } from "react";

import Button from "../../../Component/UI/Button/Button";
import Spinner from "../../../Component/UI/Spinner/Spinner";
import classes from "./ContactData.css";
import axios from "../../axios-orders";
import Input from "../../../Component/UI/Input/Input";

class ContactData extends Component {
  state = {
    orderForm: {
      name: {
        elementType: "input",
        elementConfig: {
          type: "text",
          name: "name",
          placeholder: "name",
        },
        value: "",
      },
      email: {
        elementType: "input",
        elementConfig: {
          type: "email",
          name: "email",
          placeholder: "email",
        },
        value: "",
      },
      deliveryMethod: {
        elementType: "select",
        elementConfig: {
          name: "deliveryMethod",
          options: [
            {
              value: "fastest",
              displayValue: "Fastest",
            },
            {
              value: "cheapest",
              displayValue: "Cheapest",
            },
          ],
        },value: "",
      },  
    
    },

    loading: false,
  };

  componentWillUnmount() {
    alert("");
  }
  orderHandler = (event) => {
     event.preventDefault();
    this.setState({ loading: true });

    let orderData={};
    for (const key in this.state.orderForm) {
      orderData[key]= this.state.orderForm[key].value;
    }
    axios
      .post("/orders.json", orderData)
      .then((response) => {
        this.setState({ loading: false });
      })
      .catch((error) => {
        this.setState({ loading: false });
      });
  };

  inputEventHandler = (event,key) =>{
     
     let updatedData={...this.state.orderForm};
      
     let updatedKeyData= {...updatedData[key]};

     updatedKeyData.value=event.target.value;

     updatedData[key]=updatedKeyData;

     this.setState({orderForm: updatedData});

  }

  render() {
    let formElements = [];

    for (const key in this.state.orderForm) {
      formElements.push({
        id: key,
        config: this.state.orderForm[key],
      });
    }
    console.log(formElements);
    let form = (
      <form onSubmit={this.orderHandler}>
        {formElements.map((element) => {
          return <Input
          key={element.id}
            elementtype={element.config.elementType}
            elementConfig={element.config.elementConfig}
            value={element.config.value}
            clicked={(event)=>this.inputEventHandler(event,element.id)}
          />;
        })}
         <Button btnType="Success" clicked={this.orderHandler}>
        ORDER
      </Button>
      </form>
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
