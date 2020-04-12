import React, { Component } from "react";
import classes from "./Modal.css";
import Auxiliry from "../../../hoc/Auxiliary";
import Backdrop from "../Backdrop/Backdrop";
class Modal extends Component {

    shouldComponentUpdate(nextProps,nextState)
    {
        return( nextProps.show!==this.props.show);
    }

    componentDidUpdate()
    {
        console.log("");
    }


  render() {
    return (
      <Auxiliry>
        <Backdrop show={this.props.show} clicked={this.props.clicked} />
        <div
          className={classes.Modal}
          style={{
            transform: props.show ? "translateY(0)" : "translateY(-100vh)",
            opacity: props.show ? "1" : "0",
          }}
        >
          {this.props.children}
        </div>
      </Auxiliry>
    );
  }
}
export default Modal;
