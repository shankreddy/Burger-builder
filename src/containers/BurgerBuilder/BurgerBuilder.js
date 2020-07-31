import React, {Component} from "react";
import Aux from "../../hoc/Auxilary/Auxilary";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import axios from "../../axios-orders";
import Spinner from "../../components/UI/spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
};

class BurgerBuilder extends Component {

    state = {
        ingredients: null,
        totalPrice: 4,
        purchasable: false,
        purchasing: false,
        loading: false,
        error: false
    };

    componentDidMount() {
        axios.get("/ingredients.json").then(response => {
            console.log(response);
            this.setState({ingredients: response.data});
        }).catch(error => {
            this.setState({error: true});
        });
    }

    updatePurchaseState(ingredients) {
        const sum = Object.keys(ingredients).map(key => {
            return ingredients[key];
        }).reduce((sum, el) => {
            return sum + el;
        }, 0);
        this.setState({purchasable: sum > 0});
    }

    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        const updateIngredients = {
            ...this.state.ingredients
        };
        updateIngredients[type] = updatedCount;
        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;
        this.setState({totalPrice: newPrice, ingredients: updateIngredients});
        this.updatePurchaseState(updateIngredients);
    }

    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        if (oldCount === 0) {
            return;
        }
        const updatedCount = oldCount - 1;
        const updateIngredients = {
            ...this.state.ingredients
        };
        updateIngredients[type] = updatedCount;
        const priceReduction = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceReduction;
        this.setState({totalPrice: newPrice, ingredients: updateIngredients});
        this.updatePurchaseState(updateIngredients);
    };

    purchaseHandler = () => {
        this.setState({purchasing: true});
    };

    cancelPurchaseHandler = () => {
        this.setState({purchasing: false});
    };

    continuePurchaseHandler = () => {
        this.setState({loading: true});
        const order = {
            ingredients: this.state.ingredients,
            price: this.state.totalPrice,
            customer: {
                name: "Shashank P",
                address: {
                    street: "Test test",
                    zipCode: 31212,
                },
                email: 'shank.test@aol.com'
            },
            deliveryMethod: 'Fastest'
        };
        axios.post('/orders.json', order).then(response => {
            this.setState({
                loading: false, purchasing: false
            })
        })
            .catch(error => this.setState({loading: false, purchasing: false}));
    };

    render() {
        const disabledInfo = {
            ...this.state.ingredients
        };
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }

        let orderSummary = null;


        let burger = (this.state.error ? <p>Ingredients Cant be loaded</p> : <Spinner/>);

        if (this.state.ingredients) {
            burger = (<Aux>
                <Burger ingredients={this.state.ingredients}/>
                <BuildControls ingredientAdded={this.addIngredientHandler}
                               ingredientRemoved={this.removeIngredientHandler}
                               disabled={disabledInfo}
                               purchasable={this.state.purchasable}
                               orderNow={this.purchaseHandler}
                               price={this.state.totalPrice}/>
            </Aux>);
            orderSummary = <OrderSummary
                totalPrice={this.state.totalPrice} cancel={this.cancelPurchaseHandler}
                continue={this.continuePurchaseHandler} ingredients={this.state.ingredients}></OrderSummary>;
        }

        if (this.state.loading) {
            orderSummary = (<Spinner/>);
        }

        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.cancelPurchaseHandler}>{orderSummary}</Modal>
                {burger};
            </Aux>
        );
    }
}

export default withErrorHandler(BurgerBuilder, axios);