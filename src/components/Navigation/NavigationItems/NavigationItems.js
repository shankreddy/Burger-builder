import React from "react";
import NavigationItem from "../NavigationItems/NavigationItem/NavigationItem";
import classes from "../NavigationItems/NavigationItems.css";

const navigationItems = () => (
    <ul className={classes.NavigationItems}>
        <NavigationItem href="/" active>Burger Builder</NavigationItem>
        <NavigationItem>Checkout</NavigationItem>
    </ul>
);

export default navigationItems;