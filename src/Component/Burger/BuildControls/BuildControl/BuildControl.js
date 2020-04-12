import React from "react";
import classes from "./BuildControl.css";
const buildControl = (props) => (
  <div className={classes.BuildControl}>
    <div className={classes.Label}>{props.label}</div>
    <button className={classes.More} onClick={props.added}>
      add
    </button>
    <button
      disabled={props.disabled}
      className={classes.More}
      onClick={props.removed}
    >
      remove
    </button>
  </div>
);

export default buildControl;
