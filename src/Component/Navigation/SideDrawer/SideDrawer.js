import React from "react";
import Logo from "../../Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";
import classes from "./SideDrawer.css";
import Backdrop from "../../UI/Backdrop/Backdrop";
import Auxiliary from "../../../hoc/Auxiliary";
const sideDrawer = (props) => {
   let attchedClasses= [classes.SideDrawer,classes.Close];
   if(props.show){
     attchedClasses= [classes.SideDrawer,classes.Open];
   }
  return (
    <Auxiliary>
      <Backdrop  show={props.show} clicked={props.closed}/>
      <div className={attchedClasses.join(' ')}>
        <div className={classes.Logo}>
          <Logo></Logo>
        </div>
        <nav>
          <NavigationItems></NavigationItems>
        </nav>
      </div>
    </Auxiliary>
  );
};
export default sideDrawer;
