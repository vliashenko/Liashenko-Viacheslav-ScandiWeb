import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import history from "history/browser";
import GetCurrentPrice from '../Functions/GetCurrentPrice';
import styled from "styled-components";

const CartButton = styled.button`
    z-index: 1;
    position: absolute;
    top: 75%;
    left: 80%;
    width: 52px;
    height: 52px;
    border: none;
    border-radius: 50%;
    background: #5ECE7B;
    display: flex;
    justify-content: center;
    align-items: center;
    opacity: 0;
    cursor: pointer;
    transition: all 300ms ease;
`;

let OutOfStock = styled.div`
    position: absolute;
    top: 45%;
    left: 30%;
    font-size: 24px;
    font-weight: 400;
    line-height: 38px;
    letter-spacing: 0px;
    color: black;
    opacity: 0;
    opacity: ${props => props.inStock === false && 1};
`;

let Container = styled.div`
    width: 386px;
    height: 434px;
    position: relative;

    &:hover {
        box-shadow: 0px 4px 35px #a8acb03d;
    }
    &:hover ${CartButton} {
        opacity: 1;
    }
    
    opacity: ${props => props.inStock === false &&  '0.5'};

    @media (max-width: 1200px) {
        margin: 20px 0px;
    }
`;
const ImageContainer = styled.div`
    max-width: 356px;
    max-height: 338px;
    margin: 16px auto 0px;
    cursor: pointer;
`;

const Image = styled.img`
    width: 354px;
    height: 330px;
    object-fit: cover;
`;



const Cart = styled.img`
    margin-right: 3px;
    width: 24px;
    height: 21.6px;
`;

const Info = styled.div`
    width: 354px;
    margin: 14px auto;
`;

const Brand = styled.span`
    font-size: 18px;
    font-weight: 300;
    line-height: 29px;
    letter-spacing: 0px;
    text-align: left;
    color: #1D1F22;
`;

const Name = styled.span`
    margin-left: 6px;
    font-size: 18px;
    font-weight: 300;
    line-height: 29px;
    letter-spacing: 0px;
    text-align: left;
    color: #1D1F22;
`;

const Price = styled.div`
    font-size: 18px;
    font-weight: 500;
    line-height: 29px;
    letter-spacing: 0em;
    color: #1D1F22;
`;

let StyledLink = styled(Link)`
    text-decoration: none;

    pointer-events: ${props=> props.disabled === true && "none"};
`;

class Product extends Component {
    constructor(props) {
        super(props);

        this.state = {
            chosenSize: undefined,
            chosenCapacity: undefined,
            chosenColor: undefined,
            chosenUSB: undefined,
            chosenKeyboard: undefined,
            ID: undefined
        }
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

        return attributes.map(item => {
            if(item.name === name) {
                const { items } = item;
              return  getStatesHandler(par,items[0]);
            } else {
                return null
            }
        })
    }

    getRandom = (id) => {
        let number = Math.floor(Math.random() * (100000 - 1 + 1)) + 1;
        return id + number;
    }

    onClickHandler = (item) => {
        setTimeout(()=> {
        this.props.getProductToCartPLP(item);
                setTimeout(() => {
                    this.props.totalForCart();
                },0)
        }, 0)
        
    }

    pushItemToApp = () => {
        let  quantity = 1;
        
        return {
            brand: this.props.brand, 
            gallery: this.props.gallery, 
            inStock: this.props.inStock, 
            name: this.props.name, 
            prices: this.props.prices,
            attributes: this.props.attributes,
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
        this.setDefaultState(this.props.attributes, "Size", "Size");
        this.setDefaultState(this.props.attributes, "Capacity","Capacity");
        this.setDefaultState(this.props.attributes, "With USB 3 ports", "USB");
        this.setDefaultState(this.props.attributes, "Touch ID in keyboard", "Keyboard");
        this.setDefaultState(this.props.attributes, "Color", "Color");
        this.setState(()=> ({
            ID:this.getRandom(this.props.id)
        }))    
    }

    onClick = () => {
        history.push('/productPage', {
            name : this.props.name, 
            brand : this.props.brand, 
            prices : this.props.prices,
            gallery : this.props.gallery,
            inStock : this.props.inStock,
            description : this.props.description,
            attributes: this.props.attributes,
            id : this.props.id
        });     
    }
    
    render() {
      
        const { cartIsOpen,brand, gallery, inStock, name, prices, currentCurrencyValue } = this.props;
           
        return (
            <Container inStock={inStock} >
                <StyledLink 
                    to="/productPage" 
                    disabled={cartIsOpen=== true? true : false}
                    state={{propses: this.props}}
                    onClick={this.onClick}>
                <ImageContainer >
                    <Image src={name==="Jacket"? gallery[5] : gallery}/>
                    <OutOfStock inStock={inStock}>
                        OUT OF STOCK
                    </OutOfStock>
                </ImageContainer>
                </StyledLink>
                    <CartButton onClick={()=> this.onClickHandler(this.pushItemToApp())}  disabled={inStock === false? true : false || cartIsOpen === true? true: false}>
                        <Cart src={require ('../Images/product-cart.png')}/>
                    </CartButton>
                <Info>
                    <Brand>
                        {brand}
                    </Brand>
                    <Name>
                        {name}
                    </Name>
                    <Price>
                        {GetCurrentPrice(prices, currentCurrencyValue)}
                    </Price>
                </Info>
                    
            </Container>
        );
    }
}

export default Product;