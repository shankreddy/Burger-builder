import React, {Component} from "react";
import Auxilary from '../Auxilary/Auxilary';
import classes from './Layout.css';
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import SideDrawer from "../../components/Navigation/SideDrawer/SideDrawer";

class Layout extends Component {
    state = {
        showSideDrawer: false
    };

    sideDrawerCloseHandler = () => {
        this.setState({showSideDrawer: false});
    };

    sideDrawerOpenHandler = () => {
        this.setState((prevState) => { return  {showSideDrawer: !prevState.showSideDrawer}});
    };

    render () {
        return (
            <Auxilary>
                <Toolbar clicked={this.sideDrawerOpenHandler}/>
                <SideDrawer open={this.state.showSideDrawer} closed={this.sideDrawerCloseHandler} />
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Auxilary>
        );
    }
};

export default Layout;