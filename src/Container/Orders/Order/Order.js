
import React from 'react';
import classes from './Order.css';
const order = (props) =>{
  console.log(props.ingredients);
  let ingredientList=[];
  for (const key in props.ingredients) {
      ingredientList.push(

        {
          name:key,
          amount:props.ingredients[key]
        }

      );
    }
  
  const ingredients= ingredientList.map(ingredient =>{
      return (<span key={ingredient.name}>{ingredient.name}  {ingredient.amount} </span>);
  });
return(
<div className= {classes.Order}>
  <p>ingredients: {ingredients}</p>
  <p>Price:</p>
</div>

);
}

export default order;