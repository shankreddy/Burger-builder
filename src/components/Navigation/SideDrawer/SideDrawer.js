import React from "react";
import Logo from "../../Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";
import classes from "./SideDrawer.css"
import BackDrop from "../../UI/backdrop/Backdrop";
import Auxilary from "../../../hoc/Auxilary/Auxilary";

const sideDrawer = (props) => {
    let attachClasses = [classes.SideDrawer, classes.Close];
    if (props.open) {
        attachClasses = [classes.SideDrawer, classes.Open];
    }

    return (
        <Auxilary>
            <BackDrop show={props.open} clicked={props.closed}/>
            <div className={attachClasses.join(" ")}>
                <div className={classes.Logo}>
                    <Logo/>
                </div>
                <nav>
                    <NavigationItems/>
                </nav>
            </div>
        </Auxilary>
    );
};

export default sideDrawer;