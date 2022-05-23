import React, { Component } from 'react';
import Product from './Product';
import FetchCategory from '../Functions/FetchCategory';
import styled from 'styled-components';

let Container = styled.div``;

const Wrapper = styled.div`
    max-width: 1280px;
    margin: 0 auto;
`;

const Title = styled.h3`
    margin: 0px 0px 84px 0px;
    padding-top: 44px;
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
    constructor(props){
        super(props);

        this.state = {
            currentCategory: [],
            fetchedCurrentCategory: ""
        }
    }

    showCategory = () => {
        if(this.state.currentCategory !== undefined){
        let result  = this.state.currentCategory.map((product,i) => {
                    const {id,...productProps} = product;
                    return (
                        <Product 
                            key={i}
                            cartIsOpen={this.props.cartIsOpen}
                            currentCurrencyValue={this.props.currentCurrencyValue}
                            id={id}
                            getProductToCartPLP={this.props.getProductToCartPLP}
                            totalForCart={this.props.totalForCart}
                            {...productProps}/>
                        )
        }) 
        return result
                    
        }
            
    }

    async componentDidMount() {
        const response = await FetchCategory(this.props.localCategory)
        this.setState({currentCategory: response.products})
        this.setState({fetchedCurrentCategory: response.name})
    }

    async componentDidUpdate() {
        if(this.props.localCategory !== this.state.fetchedCurrentCategory){
            const response = await FetchCategory(this.props.localCategory)
            this.setState({currentCategory: response.products})
            this.setState({fetchedCurrentCategory: response.name})
        }
    }

    render() {
        
        return (
            <Container cartIsOpen={this.props.cartIsOpen}>
                <Wrapper>
                <Title>
                   {this.props.localCategory.charAt(0).toUpperCase() + this.props.localCategory.slice(1)}
                </Title>
                <ProductsContainer>
                     {this.showCategory()}
                </ProductsContainer>
                </Wrapper>
            </Container>
        );
    }
}

export default Products;