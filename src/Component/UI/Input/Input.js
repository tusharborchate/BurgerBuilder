import React from "react";

const input = (props) => {
  let inputElement = <input />;

  switch (props.elementtype) {
    case "input":
      inputElement = (
        <input placeholder={props.value} value={props.value} {...props.elementConfig} onChange={props.clicked} />
      );
      break;

    case "textarea":
      inputElement = (
        <textarea   value={props.value} placeholder={props.value} {...props.elementConfig} onChange={props.clicked}/>
      );
      break;

    case "select":
      inputElement = (
        <select onChange={props.clicked} value ={props.value}>
          {props.elementConfig.options.map((option) => {
            return <option key={option.value} value={option.value}>{option.displayValue} </option>;
          })}
        </select>
      );
      break;

    default:
      inputElement = (
        <input placeholder={props.value} {...props.elementConfig} />
      );
      break;
  }
  return (
    <div>
      <label>{props.labelText}</label>
      {inputElement}
    </div>
  );
};
export default input;
