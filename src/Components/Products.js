import React, { Component } from 'react';
import Product from './Product';
import styled from 'styled-components';

const Container = styled.div`
    opacity: ${props => props.cartIsOpen && '0.3'}
`;

const Title = styled.h3`
    margin: 44px 0px 84px 0px;
    font-size: 42px;
    font-weight: 400;
    line-height: 67px;
    letter-spacing: 0px;
`;

const ProductsContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-around;
    flex-wrap: wrap;
`;

class Products extends Component {

    render() {

        const { cartIsOpen,allProducts, tech, clothes, category, currentCurrencyValue, getChosenProduct, getProductToCartPLP} = this.props;
        
        
        const showCategory = (category) => {


            if(allProducts !== null && tech !== null && clothes !== null) {

                if(category === "allProducts") {
                  return  allProducts.map(product => {
                        const {id,...productProps} = product;
                        return (<Product 
                            key={id}
                            cartIsOpen={cartIsOpen}
                            getChosenProduct={getChosenProduct} 
                            currentCurrencyValue={currentCurrencyValue}
                            id={id}
                            getProductToCartPLP={getProductToCartPLP}
                            {...productProps}/>)
                    })
                } else if (category === "tech") {
                    return tech.map(product => {
                        const {id,...productProps} = product;
                        return (<Product 
                            key={id} 
                            cartIsOpen={cartIsOpen}
                            getChosenProduct={getChosenProduct}
                            currentCurrencyValue={currentCurrencyValue}
                            id={id}
                            getProductToCartPLP={getProductToCartPLP}
                            {...productProps}/>)
                    })
                } else if (category === "clothes") {
                    return  clothes.map(product => {
                        const {id,...productProps} = product;
                        return (<Product 
                            key={id} 
                            cartIsOpen={cartIsOpen}
                            getChosenProduct={getChosenProduct}
                            currentCurrencyValue={currentCurrencyValue}
                            id={id}
                            getProductToCartPLP={getProductToCartPLP}
                            {...productProps}/>)
                    })
                }
            }
            
        }


        return (
            <Container cartIsOpen={this.props.cartIsOpen}>
                <Title>
                    Category name
                </Title>
                <ProductsContainer >
                    {showCategory(category)}
                </ProductsContainer>
            </Container>
        );
    }
}

export default Products;