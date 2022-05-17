import React, { Component } from 'react';
import CartItem from './CartItem';
import { GetCurrencySign } from '../Functions/GetCurrencySign';
import styled from "styled-components";

let Container = styled.div`
    padding-top: 32px;
    padding-bottom: 274px;

    backdrop-filter: ${props => props.cartIsOpen && 'brightness(90%)'};
    filter: ${props => props.cartIsOpen && 'brightness(90%)'};
`;

const Wrapper = styled.div`
    max-width: 1280px;
    margin: 0 auto;
`;

const Title = styled.h3`
    margin-top: 0;
    font-size: 32px;
    font-weight: 700;
    line-height: 40px;
    letter-spacing: 0em;
`;

const CartContainer = styled.div``;

const HR = styled.hr`
    border: 1px solid #E5E5E5;
`;

const Tax = styled.div`
    margin-top: 32px;
    font-size: 24px;
    font-weight: 400;
    line-height: 28px;
    letter-spacing: 0em;
`;
const TaxContent = styled.span`
    margin-left: 10px;
    font-size: 24px;
    font-weight: 700;
    line-height: 28px;
    letter-spacing: 0em;
`;
const Quantity = styled.div`
    margin-top: 8px;
    font-size: 24px;
    font-weight: 400;
    line-height: 28px;
    letter-spacing: 0em;
`;
const QuantityContent = styled.span`
    margin-left: 10px;
    font-size: 24px;
    font-weight: 700;
    line-height: 28px;
    letter-spacing: 0em;
`;
const Total = styled.div`
    margin-top: 8px;
    font-size: 24px;
    font-weight: 400;
    line-height: 28px;
    letter-spacing: 0em;
`;
const TotalContent = styled.span`
    margin-left: 10px;
    font-size: 24px;
    font-weight: 700;
    line-height: 28px;
    letter-spacing: 0em;
`;
const Button = styled.button`
    margin-top: 20px;
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 279px;
    height: 43px;
    background: #5ECE7B;
    color: white;
    font-family: Raleway;
    font-size: 14px;
    font-weight: 600;
    line-height: 17px;
    letter-spacing: 0em;
    cursor: pointer;
`;

class Cart extends Component {
    constructor(props){
        super(props);

        this.state = {
            totalPrice: 0,
            totalAmount: 0,
            totalTax: 0
        }
    }

    getTotalAndAmountAndTax = (price, amount,tax) => {
        this.setState(()=> ({
            totalPrice: price,
            totalAmount: amount,
            totalTax: tax
        }))
    }

    componentDidMount() {
        this.props.closeCart()
    }

    render() {
        const { productsInCart, currentCurrencyValue,handleChangeCart } = this.props;
   
        return (
            <Container cartIsOpen={this.props.cartIsOpen}>
                <Wrapper>
                <Title>
                    CART
                </Title>
                <CartContainer >
                    {productsInCart.length > 0?
                    <CartItem
                        totalForCart={this.props.totalForCart}
                        productsInCart={productsInCart}
                        currentCurrencyValue={currentCurrencyValue}
                        handleChangeCart={handleChangeCart}
                        getTotalAndAmountAndTax={this.getTotalAndAmountAndTax}/>
                    :
                        "CART IS EMPTY"
                    }
                </CartContainer>
                <HR/>
                <Tax>
                    Tax 21%:
                    <TaxContent>
                        {productsInCart.length > 0?  `${GetCurrencySign(this.props.currentCurrencyValue)} ${this.state.totalTax}` : `${GetCurrencySign(this.props.currentCurrencyValue)}0`}
                    </TaxContent>
                </Tax>
                <Quantity>
                    Quantity:
                    <QuantityContent>
                       {productsInCart.length > 0 ?  this.state.totalAmount : 0 } 
                    </QuantityContent>
                </Quantity>
                <Total>
                    Total:
                    <TotalContent>
                    {productsInCart.length > 0? `${GetCurrencySign(this.props.currentCurrencyValue)} ${this.state.totalPrice}` : `${GetCurrencySign(this.props.currentCurrencyValue)}0`}
                    </TotalContent>
                </Total>
                <Button>
                    ORDER
                </Button>
                </Wrapper>
            </Container>
        );
    }
}

export default Cart;