import React, { Component } from 'react';
import Cart from '../Components/Cart';
import styled from "styled-components";

const Container = styled.div``;

class CartPage extends Component {
    render() {
        return (
            <Container>
                <Cart 
                    totalForCart={this.props.totalForCart}
                    closeCart={this.props.closeCart}
                    cartIsOpen={this.props.cartIsOpen}
                    productsInCart={this.props.productsInCart}
                    currentCurrencyValue={this.props.currentCurrencyValue}
                    handleChangeCart={this.props.handleChangeCart}
                    />
            </Container>
        );
    }
}

export default CartPage;