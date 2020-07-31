import React, {Component} from "react";
import Aux from "../../../hoc/Auxilary/Auxilary";
import Button from "../../UI/button/Button";

class OrderSummary extends Component {

    componentWillUpdate(nextProps, nextState, nextContext) {
        console.log("component will update");
    }

    render () {
        const ingredientSummary = Object.keys(this.props.ingredients).map((key) => {
            return (
                <li key={key}>
                    <span style={{textTransform: 'capitalize'}}>{key}</span>: {this.props.ingredients[key]}
                </li>
            );
        });
        return (
            <Aux>
                <h3>Your Order</h3>
                <p>A delicious burger with following ingredients:</p>
                <ul>
                    {ingredientSummary}
                </ul>
                <p>Continue To Checkout?</p>
                <p><strong>Total Price: ${this.props.totalPrice.toFixed(2)}</strong></p>
                <Button btnType="Danger" clicked={this.props.cancel}>CANCEL</Button>
                <Button btnType="Success" clicked={this.props.continue}>CONTINUE</Button>
            </Aux>
        );
    }
}

export default OrderSummary;