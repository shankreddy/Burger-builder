import React from "react";
import classes from "./Burger.css";
import BurgerIngredient from "./Burgeringredient/Burgeringredient"

const burger = (props) => {
    let transformedIngredients = Object.keys(props.ingredients).map(key => {
        return [...Array(props.ingredients[key])].map((_, i) => { return <BurgerIngredient key={key + 1} type={key}></BurgerIngredient>; });
    }).reduce((arr, el) => {
       return arr.concat(el);
    });
    if (transformedIngredients.length === 0) {
        transformedIngredients = <p>Please start adding Ingredients</p>
    }
    return (
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top"></BurgerIngredient>
            {transformedIngredients}
            <BurgerIngredient type="bread-bottom"></BurgerIngredient>
        </div>
    );
};

export default burger;