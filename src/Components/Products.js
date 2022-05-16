import React, { Component } from 'react';
import Product from './Product';
import FetchCategory from '../Functions/FetchCategory';
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
    constructor(props){
        super(props);

        this.state = {
            currentCategory: []
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
                            getChosenProduct={this.props.getChosenProduct} 
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

    componentDidMount() {
        if(this.props.category !== null) {
            FetchCategory().then(res => {
        
                let categories = res.data.categories;
                    
                let filtered = categories.filter(el => el.name === this.props.category);

                let result = filtered[0].products
                
                setTimeout(() => {
                    this.setState(()=>({
                        currentCategory: result
                    }))
                },0)
    
                 })
        }
    }

    componentDidUpdate() {

        if(this.props.category !== null) {

            FetchCategory().then(res => {
        
            let categories = res.data.categories;
                
            let filtered = categories.filter(el => el.name === this.props.category);
            
            let result = filtered[0].products
            
            setTimeout(() => {
                this.setState(()=>({
                    currentCategory: result
                }))
            },0)

            })

        }
    }

    render() {
        
        return (
            <Container cartIsOpen={this.props.cartIsOpen}>
                <Title>
                   {this.props.category.charAt(0).toUpperCase() + this.props.category.slice(1)}
                </Title>
                <ProductsContainer>
                     {this.showCategory()}
                </ProductsContainer>
            </Container>
        );
    }
}

export default Products;