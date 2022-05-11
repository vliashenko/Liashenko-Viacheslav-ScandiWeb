import React, { Component } from 'react';
import styled from "styled-components";

const Container = styled.div`
    margin: 32px 0px 0px;
    display: flex;
    justify-content: space-between;
    color: #1D1F22;
`;

const Left = styled.div``;

const Title = styled.p`
    font-size: 16px;
    font-weight: 300;
    line-height: 26px;
    letter-spacing: 0px;
    margin: 0px;
`;
const SubTitle = styled.p`
    margin: 4px 0px 0px;
    font-size: 16px;
    font-weight: 300;
    line-height: 26px;
    letter-spacing: 0px;
`;
const Price = styled.div`
    margin: 4px 0px 0px;
    font-size: 16px;
    font-weight: 500;
    line-height: 26px;
    letter-spacing: 0em;
`;
const Size = styled.div`
    margin: 8px 0px 0px;
`;
const SmallTitle = styled.p`
    margin-bottom: 0px;
    font-size: 14px;
    font-weight: 400;
    line-height: 16px;
    letter-spacing: 0px;
`;
const SizeContainer = styled.div`
    display: flex;
`;
const SizeItem = styled.div`
    margin-top: 8px;
    margin-right: 8px;
    width: 24px;
    height: 24px;
    font-size: 14px;
    font-weight: 400;
    line-height: 22px;
    letter-spacing: 0em;
    display: flex;
    align-items:center;
    justify-content: center;
    border: 1px solid #1D1F22;

    background: ${props => props.chosen === "true" && 'black'};
    color: ${props => props.chosen === "true" && 'white'};
`;
const Color = styled.div`
    margin-top: 8px;
`;
const ColorContainer = styled.div`
    display: flex;
`;
const ColorItem = styled.div`
    width: 16px;
    height: 16px;
    margin-top: 8px;
    margin-right: 10px;

    background: ${props => props.bg};
    border: ${props => props.chosen === "true" && '1.6px solid #5ECE7B'};
    height: ${props => props.chosen === "true" && '14px'};
`;
const Right = styled.div`
    display: flex;
`;
const AmountContainer = styled.div`
    height: 207px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin-right: 8px;
`;
const Button = styled.button`
    position: relative;
    width: 24px;
    height: 24px;
    background-color: white;
    
    cursor: pointer;
    border: 1px solid #1D1F22;
`;
const Plus = styled.div`
    position: absolute;
    top: 1px;
    left: 1px;
    display:inline-block;
    width:20px;
    height:20px;
    background:
    linear-gradient(#000 0 0),
    linear-gradient(#000 0 0);
    background-position:center;
    background-size: 50% 1px, 1px 50%; /*thickness = 2px, length = 50% (25px)*/
    background-repeat:no-repeat;
`;
const Amount = styled.div`
    font-size: 16px;
    font-weight: 500;
    line-height: 26px;
    letter-spacing: 0em;
`;
const Minus = styled.div`
    position: absolute;
    top: 1px;
    left: 1px;
    display:inline-block;
    width:20px;
    height:20px;
    background:
        linear-gradient(#000 0 0);
    background-position:center;
    background-size: 50% 1px; 
    background-repeat:no-repeat;
`;
const ImageContainer = styled.div`
    width: 121px;
`;
const Image = styled.img`
    width: 100%;
    height: 207px;
    object-fit: cover;
`;


class MiniCartItem extends Component {
    constructor(props) {
        super(props);

        this.state = {
            prices: []
        }
    }

    setPrices = (price) => {
        this.setState(({prices}) =>({
            prices: [...prices, price]
        }))
    }

    getAttributesSCUK = (attributes, name, par,chosenPar) => {

        const getStatesHandler = (par) => {
            if(par === "Size"){
                return chosenPar
            } else if ( par === "Capacity"){
                return chosenPar
            } else if ( par === "USB") {
                return chosenPar
            } else if ( par === "Keyboard") {
                return chosenPar
            }
        }
        
       
        const atrObjects = attributes.map((item,i) =>{
            if(item.name === name) {
                const { items } = item
                return(
                    <div key={i}>
                    <SmallTitle>
                        {item.name}:
                    </SmallTitle>
                    <SizeContainer >
                    {items.map((el,i)=> {
                    return  (
                            <SizeItem 
                            style={par === "Capacity"? {width: 34, height: 34, fontSize: 10} : null}
                            key={i}
                            chosen={getStatesHandler(par) === el? "true" : "false"}>
                                {el.value}
                            </SizeItem>
                        ) 
                    })}    
                    </SizeContainer>
                    </div>
                )}   
            })
        return atrObjects
    }
   
    showColor = (attribute,chosenColor) => {
        const atrObjects = attribute.map((item,i) => {
            if(item.name === "Color") {
                const { items } = item;
                return(
                    <div key={i}>
                    <SmallTitle>
                        COLOR:
                    </SmallTitle>
                    <ColorContainer >
                    {items.map((el,i)=> {
                    return  (
                            <ColorItem 
                            key={i}
                            chosen={chosenColor === el.value? "true" :"false"} 
                            bg={el.value}>
                            </ColorItem>
                        ) 
                    })}    
                    </ColorContainer>
                    </div>
                )   
                
            }
        })
        return atrObjects
    }

    render() {
        const { productsInCart, currentCurrencyValue, handleChangeCart } = this.props;
        

        const itemInCart = productsInCart.map((product,i) => {
            
            const price = product.prices.map(item => {
                if(item.currency.label === currentCurrencyValue) {
                    
                    return `${item.currency.symbol} ${item.amount}`
                }
            })
            
            return (
                
                <Container key={i}>
                <Left>
                    <Title>
                        {product.brand}
                    </Title>  
                    <SubTitle>
                        {product.name}
                    </SubTitle>
                    <Price>
                        {price}
                    </Price>
                    <Size>
                        {this.getAttributesSCUK(product.attributes, "Size", "Size", product.chosenSize)}
                        {this.getAttributesSCUK(product.attributes, "Capacity","Capacity", product.chosenCapacity)}
                        {this.getAttributesSCUK(product.attributes, "With USB 3 ports", "USB", product.chosenUSB)}
                        {this.getAttributesSCUK(product.attributes, "Touch ID in keyboard", "Keyboard", product.chosenKeyboard)}
                    </Size>
                    <Color>
                        {this.showColor(product.attributes,product.chosenColor)}
                    </Color>
                </Left>
                <Right>
                    <AmountContainer style={product.attributes.length > 2 ? {height: 294} : {height: 207}}>
                        <Button onClick={()=> handleChangeCart(product, 1,product.id)}>
                            <Plus/>
                        </Button>
                        <Amount>{product.quantity}</Amount>
                        <Button onClick={()=> handleChangeCart(product, -1,product.id)}>
                            <Minus/>
                        </Button>
                    </AmountContainer>
                     <ImageContainer>
                        <Image style={product.attributes.length > 2 ? {height: 294} : {height: 207}} src={product.name==="Jacket"? product.gallery[5] : product.gallery}></Image>
                    </ImageContainer>
                </Right>
            </Container>
            )
        })
        return (
            <>{itemInCart}</>
        );
    }
}

export default MiniCartItem;