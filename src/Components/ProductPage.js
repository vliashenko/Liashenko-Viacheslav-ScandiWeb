import React, { Component } from 'react';
import styled from "styled-components";

const Container = styled.div`
    margin-top: 82px;
    padding-bottom: 178px;
    display: flex;

    opacity: ${props=> props.cartIsOpen && "0.5"}
`;

const Left = styled.div`
    display: flex;
    flex-direction: column;
`;
const SmallImageContainer = styled.div`
    width: 80px;
    margin-bottom: 32.39px;
    display: flex;
    justify-content: center;
    align-items: center;
    border: ${props => props.chosen === "true" && "1px solid #d7d7d778"}
`;
const SmallImage = styled.img`
    width: 100%;
    height: 80px;
    object-fit: cover;
    cursor: pointer;
`;
const Center = styled.div`
    margin-left: 62.29px;
`;
const BigImageContainer = styled.div`
    width: 610px;

    @media (max-width:1138px){
        width: 400px
    }
    @media (max-width:916px){
        width: 300px
    }
`;
const BigImage = styled.img`
    width: 100%;
    height: 544px;
    object-fit: cover;

    @media (max-width:916px){
        height: 300px
    }
`;
const Right = styled.div`
    margin-left: 100px;
`;
const Title = styled.h3`
    margin: 0px;
    font-size: 30px;
    font-weight: 600;
    line-height: 27px;
    letter-spacing: 0em;
`;
const SubTitle = styled.p`
    margin-top: 16px;
    font-size: 30px;
    font-weight: 400;
    line-height: 27px;
    letter-spacing: 0em;
`;
const Size = styled.div``;

const SmallTitle = styled.div`
    margin-top: 14px;
    font-size: 18px;
    font-weight: 700;
    line-height: 18px;
    letter-spacing: 0em;
`;

const SizeContainer = styled.div`
    margin-top: 8px;
    display: flex;
`;

const SizeItem = styled.div`
    margin-right: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 63px;
    height: 45px;
    font-size: 16px;
    font-weight: 500;
    line-height: 18px;
    letter-spacing: 0.05em;
    border: 1px solid #1D1F22;
    cursor: pointer;

    background: ${props => props.chosen === "true" && '#1D1F22'};
    color: ${props => props.chosen === "true" && 'white'};
`;
const Color = styled.div`
    margin-top: 24px;
`;

const ColorContainer = styled.div`
    display: flex;
    align-items: center;
`;

const ColorItem = styled.div`
    width: 32px;
    height: 32px;
    margin-right: 10px;
    cursor: pointer;
    background: ${props => props.bg};
    border: ${props => props.chosen === "true" && '2px solid #5ECE7B'};
    height: ${props => props.chosen === "true" && '30px'};
`;
const Price = styled.div`
    margin-top: 38px;
`;
const PriceItem = styled.div`
    margin-top: 10px;
    font-size: 24px;
    font-weight: 700;
    line-height: 18px;
    letter-spacing: 0em;
`;
const Button = styled.button`
    margin-top: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
    width: 292px;
    height: 52px;
    background: #5ECE7B;
    color: white;
    font-size: 16px;
    font-weight: 600;
    line-height: 19px;
    letter-spacing: 0em;
    cursor: pointer;

    opacity: ${props => props.inStock === false && "0.5"}
`;
const Desc = styled.div`
    width: 292px;
    margin-top: 40px;
    font-size: 16px;
    font-weight: 400;
    line-height: 26px;
    letter-spacing: 0em;
`;


class ProductPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currentImage: this.props.chosenProduct.gallery[0],
            chosenSize: undefined,
            chosenCapacity: undefined,
            chosenColor: undefined,
            chosenUSB: undefined,
            chosenKeyboard: undefined,
            ID: undefined
        }
    }
    
    getChosenUSB = (USB) => {
        this.setState(()=> ({
            chosenUSB: USB
        }))
    }

    getChosenKeyboard = (keyboard) => {
        this.setState(()=> ({
            chosenKeyboard: keyboard
        }))
    }

    getChosenCapacity = (capacity) => {
        this.setState(()=> ({
            chosenCapacity: capacity
        }))
    }

    getChosenColor = (color) => {
        this.setState(()=> ({
            chosenColor: color
        }))
    }

    getChosenSize = (size) => {
        this.setState(()=> ({
            chosenSize: size
        }))
    }

    getRightImage = (image) => {
        this.setState(() =>({
            currentImage: image
        }))
    }

    getAttributesSCUK = (attributes, name, par) => {
        
        const getFunctionHandler = (par,el) => {
            if(par === "Size"){
                return this.getChosenSize(el)
            } else if ( par === "Capacity"){
                return this.getChosenCapacity(el)
            } else if ( par === "Keyboard") {
                return this.getChosenKeyboard(el)
            } else if ( par === "USB") {
                console.log(par);
                return this.getChosenUSB(el)
            } 
            
        }

        const getStatesHandler = (par) => {
            if(par === "Size"){
                return this.state.chosenSize
            } else if ( par === "Capacity"){
                return this.state.chosenCapacity
            } else if ( par === "USB") {
                return this.state.chosenUSB
            } else if ( par === "Keyboard") {
                return this.state.chosenKeyboard
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
                            onClick={() => getFunctionHandler(par,el)}
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
   
    showColor = (attribute) => {
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
                            chosen={this.state.chosenColor === el.value? "true" :"false"} 
                            onClick={()=>this.getChosenColor(el.value)} 
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

    setDefaultState = (attributes, name, par) => {

        const getStatesHandler = (par, el) => {
            if(par === "Size"){
                return this.setState(() => ({
                    chosenSize: el
                }))
            } else  if(par === "Capacity"){
                return this.setState(() => ({
                    chosenCapacity: el
                }))
            }else  if(par === "USB"){
                return this.setState(() => ({
                    chosenUSB: el
                }))
            }else  if(par === "Keyboard"){
                return this.setState(() => ({
                    chosenKeyboard: el
                }))
            } else  if(par === "Color"){
                return this.setState(() => ({
                    chosenColor: el.value
                }))
            }
        }

        attributes.map(item => {
            if(item.name === name) {
                const { items } = item;
                
                    getStatesHandler(par,items[0])
               
            }
        })
    }

    getRandom = (id) => {
        let number = Math. floor(Math. random() * (100000 - 1 + 1)) + 1
        return id + number
    }

    addingHandler = (item) => {
        this.setState(()=> ({
            ID: this.getRandom(this.props.chosenProduct.id)
        }));

        this.props.getProductToCartPLP(item);
        
    }

    UNSAFE_componentWillMount() {
        this.setDefaultState(this.props.chosenProduct.attributes, "Size", "Size");
        this.setDefaultState(this.props.chosenProduct.attributes, "Capacity","Capacity");
        this.setDefaultState(this.props.chosenProduct.attributes, "With USB 3 ports", "USB");
        this.setDefaultState(this.props.chosenProduct.attributes, "Touch ID in keyboard", "Keyboard");
        this.setDefaultState(this.props.chosenProduct.attributes, "Color", "Color");
        this.setState(()=> ({
            ID: this.getRandom(this.props.chosenProduct.id)
        }));
    }

    render() {

        const { chosenProduct,cartIsOpen, currentCurrencyValue, getProductToCartPLP } = this.props;
        const { brand, name, inStock, gallery, attributes,prices, id } = chosenProduct;
        
        const quantity = 1;
        const chosenSize = this.state.chosenSize;
        const chosenColor = this.state.chosenColor;
        const chosenCapacity = this.state.chosenCapacity;
        const chosenUSB = this.state.chosenUSB;
        const chosenKeyboard = this.state.chosenKeyboard;
        let ID = this.state.ID;

        const item = {brand, gallery, inStock, name, prices,attributes, id:ID,quantity, chosenSize,chosenCapacity,chosenColor,chosenUSB,chosenKeyboard}

        const price = prices.map(item => {
            if(item.currency.label === currentCurrencyValue) 
                return `${item.currency.symbol} ${item.amount}`
        
        })
        
        return (
            <Container cartIsOpen={cartIsOpen}>
                <Left>
                {gallery.map((image, i)=> {
                    if(i < 5)
                        return(
                        <SmallImageContainer
                        chosen={this.state.currentImage === image && "true"}
                        key={i}>
                            <SmallImage 
                            onClick={() =>this.getRightImage(image)} src={image}/>
                        </SmallImageContainer> 
                        )
                    })}
                </Left>
                <Center>
                    <BigImageContainer>
                        <BigImage src={this.state.currentImage}/>
                    </BigImageContainer>
                </Center>
                <Right>
                    <Title>
                        {brand}
                    </Title>
                    <SubTitle>
                        {name}
                    </SubTitle>
                    <Size>
                        {this.getAttributesSCUK(attributes, "Size","Size")}
                        {this.getAttributesSCUK(attributes, "Capacity","Capacity")}
                        {this.getAttributesSCUK(attributes, "With USB 3 ports", "USB")}
                        {this.getAttributesSCUK(attributes, "Touch ID in keyboard", "Keyboard")}
                    </Size>
                    <Color>
                    {this.showColor(attributes)}
                    </Color>
                    <Price>
                        <SmallTitle>
                            PRICE:
                        </SmallTitle>
                        <PriceItem>{price}</PriceItem>
                    </Price>
                    <Button 
                    onClick={() =>this.addingHandler(item)}
                        inStock={inStock} 
                        disabled={inStock === false? true : false}>
                            ADD TO CART
                        </Button>
                    <Desc>
                    Find stunning women's cocktail dresses and party dresses.
                    Stand out in lace and metallic cocktail dresses and party
                    dresses from all your favorite brands.
                    </Desc>
                </Right>
            </Container>
        );
    }
}

export default ProductPage;