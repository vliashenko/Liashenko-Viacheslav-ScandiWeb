import React, { Component } from 'react';
import CartSlider from '../Components/CartSlider';
import styled from "styled-components";

const Container = styled.div`
    margin: 24px 0px;
    display: flex;
    justify-content: space-between;
`;

const Left = styled.div``;

const Title = styled.h3`
    margin-top: 0px;
    margin-bottom: 0px;
    font-size: 30px;
    font-weight: 600;
    line-height: 27px;
    letter-spacing: 0em;
`;
const SubTitle = styled.p`
    margin: 16px 0px 0px;
    font-size: 30px;
    font-weight: 400;
    line-height: 27px;
    letter-spacing: 0em;
`;
const Price = styled.div`
    margin: 20px 0px 0px;
    font-size: 24px;
    font-weight: 700;
    line-height: 24px;
    letter-spacing: 0em;
`;
const Size = styled.div`
    margin: 20px 0px 0px;
`;

const SmallTitle = styled.p`
    font-size: 18px;
    font-weight: 700;
    line-height: 18px;
    letter-spacing: 0em;
`;
const SizeContainer = styled.div`
    display: flex;
`;
const SizeItem = styled.div`
    margin-right: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid black;
    width: 53px;
    height: 45px;
    font-size: 16px;
    font-weight: 400;
    line-height: 18px;
    letter-spacing: 0.05em;

    background: ${props => props.chosen === "true" && '#1D1F22'};
    color: ${props => props.chosen === "true" && 'white'};
`;
const Color = styled.div`
    margin: 20px 0px 0px;
`;
const ColorContainer = styled.div`
    display: flex;
`;
const ColorItem = styled.div`
    width: 36px;
    height: 36px;
    margin-right: 10px;

    background: ${props => props.bg};
    border: ${props => props.chosen === "true" && '2px solid #5ECE7B'};
    height: ${props => props.chosen === "true" && '34px'};
`;

const Right = styled.div`
    display: flex;
`;

const AmountContainer = styled.div`
    height: 310px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin-right: 24px;
`;
const Button = styled.button`
    width: 45px;
    height: 45px;
    background-color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
`;

const Plus = styled.div`
    display:inline-block;
        width:30px;
        height:30px;
    background:
    linear-gradient(#000 0 0),
    linear-gradient(#000 0 0);
    background-position:center;
    background-size: 50% 2px,2px 50%; /*thickness = 2px, length = 50% (25px)*/
    background-repeat:no-repeat;
`;

const Minus = styled.div`
    display:inline-block;
    width:30px;
    height:30px;
    background:
        linear-gradient(#000 0 0);
    background-position:center;
    background-size: 50% 1.3px; 
    background-repeat:no-repeat;
`;
const Amount = styled.span`
    text-align: center;
    font-size: 24px;
    font-weight: 500;
    line-height: 38px;
    letter-spacing: 0em;
`;
const SliderContainer = styled.div``;
const HR = styled.hr`
    border: 1px solid #E5E5E5;
`;

class CartItem extends Component {

    constructor(props) {
        super(props);

        this.state = {
            total: 0,
            totalAmount: 0,
            totalTax: 0
        }
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

    countTotal = () => {
        let ans = [];
        let itemsAmount = [];
        let tax = [];
        this.props.productsInCart.map(el => {
            let realprice;
            el.prices.forEach(item => {
                if(item.currency.label === this.props.currentCurrencyValue) {
                   realprice =  item.amount * ( 1 + 21 / 100 ) * el.quantity
                   ans.push(realprice)
                   itemsAmount.push(el.quantity)
                   tax.push(((item.amount /100) *21) * el.quantity)
                };
            });
        });

        let totalTax =  tax.reduce((acc,curr) => {
            acc+= curr   
            return acc    
        },0).toFixed(2);
        

        let totalAmount =  itemsAmount.reduce((acc,curr) => {
            acc+= curr   
            return acc    
        },0);
        
        let totalPrice = ans.reduce((acc,curr) => {
            acc+= curr   
            return acc    
        },0).toFixed(2);

        this.setState(()=>({
            totalAmount: totalAmount
        }));

        this.setState(()=>({
            total: totalPrice
        }));

        this.setState(()=>({
            totalTax: totalTax
        }));
    
    }

    handlerMendlerPlus = (product) => {
        this.props.handleChangeCart(product, 1,product.id);
        this.countTotal();
        setTimeout(()=> {
            this.props.getTotalAndAmountAndTax(this.state.total, this.state.totalAmount,this.state.totalTax)
        },0)
    }

    handlerMendlerMinus = (product) => {
        this.props.handleChangeCart(product, -1,product.id);
        this.countTotal();
        setTimeout(()=> {
            this.props.getTotalAndAmountAndTax(this.state.total, this.state.totalAmount,this.state.totalTax)
        },0)
    }

    UNSAFE_componentWillMount() {
        this.countTotal();
        setTimeout(()=> {
            this.props.getTotalAndAmountAndTax(this.state.total, this.state.totalAmount,this.state.totalTax)
        },100)
    }

    render() {


        const { productsInCart, currentCurrencyValue } = this.props;

        const itemInCart = productsInCart.map((product,i) => {
            
            const price = product.prices.map(item => {
                if(item.currency.label === currentCurrencyValue) {
                    
                    return `${item.currency.symbol} ${item.amount}`
                }
            })

            return (
                <div key={i}>
            <HR/>
            <Container>
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
                    <AmountContainer style={product.attributes.length > 2 ? {height: 439} : {height: 310}}>
                        <Button>
                            <Plus onClick={() =>this.handlerMendlerPlus(product)}/>
                        </Button>
                        <Amount>{product.quantity}</Amount>
                        <Button>
                            <Minus onClick={() =>this.handlerMendlerMinus(product)}/>
                        </Button>
                    </AmountContainer>
                     <SliderContainer >
                        <CartSlider gallery={product.gallery}/>
                    </SliderContainer>
                </Right>
               
                
            </Container>
        </div>
            )

        })

        return (
            <>{itemInCart}
             {/* <HR/>
            <Container>
                <Left>
                    <Title>
                        asdasd
                    </Title> 
                    <SubTitle>
                        asdasd
                    </SubTitle>
                    <Price>
                        234234
                    </Price>
                    <Size>
                    {this.getAttributesSCUK(attributes, "Size", "Size", chosenSize)}
                        {this.getAttributesSCUK(attributes, "Capacity","Capacity", chosenCapacity)}
                        {this.getAttributesSCUK(attributes, "With USB 3 ports", "USB", chosenUSB)}
                        {this.getAttributesSCUK(attributes, "Touch ID in keyboard", "Keyboard", chosenKeyboard)}
                    </Size>
                    <Color>
                    {this.showColor(attributes,chosenColor)}
                    </Color>
                </Left>
                <Right>
                    <AmountContainer>
                        <Button>
                            <Plus />
                        </Button>
                        <Amount>1</Amount>
                        <Button>
                            <Minus/>
                        </Button>
                    </AmountContainer>
                     <SliderContainer>
                        <CartSlider />
                    </SliderContainer>
                </Right>
               
                
            </Container> */}
        </>
        );
    }
}

export default CartItem;