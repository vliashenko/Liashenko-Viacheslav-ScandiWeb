import React, { Component } from 'react';
import Products from '../Components/Products';
import styled from 'styled-components';

const Container = styled.div``;

class PLP extends Component {

    render() {
        return (
            <Container>           
                <Products 
                cartIsOpen={this.props.cartIsOpen}
                currentCurrencyValue={this.props.currentCurrencyValue}
                getProductToCartPLP={this.props.getProductToCartPLP}
                totalForCart={this.props.totalForCart}
                localCategory={this.props.localCategory}
                />
            </Container>
        );
    }
}

export default PLP;