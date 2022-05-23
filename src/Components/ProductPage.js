import React, { Component } from 'react';
import history from "history/browser";
import GetCurrentPrice from '../Functions/GetCurrentPrice';
import parse from "html-react-parser";
import styled from "styled-components";
import '../Styles/ProductPage.css';

const OutOfStock = styled.div``;

const Container = styled.div`
    padding-top: 82px;
    padding-bottom: 178px;
`;

const Wrapper = styled.div`
    display: flex;
    max-width: 1280px;
    margin: 0 auto;
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
let BigImageContainer = styled.div`
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
`;
const Color = styled.div`
    margin-top: 24px;
`;

const ColorContainer = styled.div`
    display: flex;
    align-items: center;
`;

const ColorItemContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 32.8px;
    height: 32.8px;
    margin-right: 10px;
`;

const ColorItem = styled.div`
    width: 32px;
    height: 32px;
    cursor: pointer;
    background: ${props => props.bg};
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
            currentImage: history.location.state.gallery[0],
            // defaultAttributes: [],
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
            if(item.name === name){ 
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
                            disabled={ this.props.cartIsOpen===true? true : false }
                            onClick={() => getFunctionHandler(par,el)}
                            className={getStatesHandler(par) === el && "chosen-attribute-item-PDP"}>
                                {el.value}
                            </SizeItem>
                        ) 
                    })}    
                    </SizeContainer>
                    </div>
                )} else {
                    return null
                }   
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
                            <ColorItemContainer 
                                key={i} 
                                className={this.state.chosenColor === el.value && "chosen-color-item-border-PDP"} >
                                <ColorItem 
                                    className={this.state.chosenColor === el.value && "chosen-color-item-PDP"}
                                    onClick={()=>this.getChosenColor(el.value)} 
                                    bg={el.value}>
                                </ColorItem>
                            </ColorItemContainer>
                        ) 
                    })}    
                    </ColorContainer>
                    </div>
                )   
                
            } else {
                return null
            }
        })
        return atrObjects
    }

    // setDefaultStates = (atr, name, par) => {

    //     const getStatesHandler = (par,el) => {
    //         return atr.map(atrb => {
    //              if(name === atrb.name ) {
    //                 let newObj = {name, el}
    //             this.setState(({defaultAttributes}) =>({
    //                 defaultAttributes: [...defaultAttributes, newObj]
    //             }))

    //             let key = "name";
                
    //             return setTimeout(() => {

    //                 let newArr = [...new Map(this.state.defaultAttributes.map(item =>
    //                     [item[key], item])).values()];
    //                     this.setState(() =>({
    //                         defaultAttributes: newArr
    //                     }))
    //             },0)
    //         } else {
    //             return null
    //         }
    //         })
    //     }

    //     atr.map(item => {
    //         if(item.name === name) {
    //             const { items } = item;
    //             return getStatesHandler(par,items[0])
    //         } else {
    //             return null
    //         }
    //     })
    // }



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
                return getStatesHandler(par,items[0])
            } else {
                return null
            }
        })
    }


    getRandom = (id) => {
        let number = Math.floor(Math.random() * (100000 - 1 + 1)) + 1
        return id + number
    }

    addingHandler = (item) => {
        
        this.setState(()=> ({
            ID: this.getRandom(history.location.state.id)
        }));
        
        this.props.getProductToCartPLP(item);

        setTimeout(() => {
            this.props.totalForCart()
        },0)
    }

    showSmallImages = (gallery) => {
        return gallery.map((image, i)=> {
            return(
            <SmallImageContainer
            className={this.state.currentImage === image && "active-small-image-PDP"}
            key={i}>
                <SmallImage 
                onClick={() =>this.getRightImage(image)} src={image}/>
            </SmallImageContainer> 
            )
        })
    }



    pushItemToApp = () => {
        let  quantity = 1;
        
        return {
            brand: history.location.state.brand, 
            gallery: history.location.state.gallery, 
            inStock: history.location.state.inStock, 
            name: history.location.state.name, 
            prices: history.location.state.prices,
            attributes: history.location.state.attributes,
            id:this.state.ID,
            quantity: quantity, 
            chosenSize: this.state.chosenSize,
            chosenCapacity: this.state.chosenCapacity,
            chosenColor: this.state.chosenColor,
            chosenUSB: this.state.chosenUSB,
            chosenKeyboard: this.state.chosenKeyboard
        }
    }

    componentDidMount() {
        this.setDefaultState(history.location.state.attributes, "Size", "Size");
        this.setDefaultState(history.location.state.attributes, "Capacity","Capacity");
        this.setDefaultState(history.location.state.attributes, "With USB 3 ports", "USB");
        this.setDefaultState(history.location.state.attributes, "Touch ID in keyboard", "Keyboard");
        this.setDefaultState(history.location.state.attributes, "Color", "Color");
        this.setState(()=> ({
            ID: this.getRandom(history.location.state.id)
        }));
    }

    render() {

        const { currentCurrencyValue, cartIsOpen } = this.props;
        const { brand, gallery, inStock, name, prices, description, attributes } = history.location.state;
        
        return ( 
            <Container cartIsOpen={cartIsOpen}>
                <Wrapper>
                <Left>
                {this.showSmallImages(gallery)}
                </Left>
                <Center>
                    <BigImageContainer className={inStock === false && "image-out-of-stock-PDP"}>
                        <BigImage src={this.state.currentImage}/>
                        <OutOfStock className={inStock === false ? "active-out-of-stock-PDP" : "out-of-stock-PDP"}>
                        OUT OF STOCK
                        </OutOfStock>
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
                        <PriceItem>{GetCurrentPrice(prices,currentCurrencyValue)}</PriceItem>
                    </Price>
                    <Button 
                        onClick={() =>this.addingHandler(this.pushItemToApp())}
                        inStock={inStock} 
                        className={inStock === false && 'button-out-of-stock-PDP'}
                        disabled={inStock === false? true : false || cartIsOpen === true? true:false}>
                            ADD TO CART
                        </Button>
                    <Desc>
                        {parse(description)}
                    </Desc>
                </Right>
                </Wrapper>
            </Container>
        );
    }
}

export default ProductPage;