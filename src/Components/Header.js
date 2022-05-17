import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import MiniCartItem from './MiniCartItem';
import { gql } from "@apollo/client"
import { client } from '..';
import { GetCurrencySign } from '../Functions/GetCurrencySign';
import CountTotal from '../Functions/CountTotal';
import styled from "styled-components";

const Container = styled.div`
   min-height: 78px; 
   display: flex;
   align-items: center;
   justify-content: space-between;
   max-width: 1280px;
  margin: 0 auto;
`;
const Left = styled.div`
    display: flex;
`;
let Category = styled.div`
    font-size: 16px;
    font-weight: 600;
    line-height: 78px;
    letter-spacing: 0px;
    text-align: center;
    margin: 0px 16px;
    cursor: pointer;

    color: ${props=> props.category  === 'true' ?'#5ECE7B ':'#1D1F22'};
    border-bottom: ${props => props.category  === 'true' ? "2px solid #5ECE7B" : "none"};

    &:hover {
        color: #5ECE7B;
        border-bottom: 2px solid #5ECE7B;
    }

    pointer-events: ${props=> props.disabled === true && "none"}
`;
const Center = styled.div`
    margin-right: 12%;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    cursor: pointer;
`;
const BoxImage = styled.img`
    width: 31.18px;
    height: 28.62px;
`;
const LineImage = styled.img`
    position: absolute;
    top: 38%;
    left: 28%;
    width: 14.08px;
    height: 8.99px;
`;
const ArrowImage = styled.img`
    position: absolute;
    top: 30%;
    left: 62%;
    width: 5.41px;
    height: 3.19px;
`;
const Right = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`;
const Currency = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
`;

let CurrencySign = styled.div`
    font-size: 18px;
    font-weight: 500;
    line-height: 29px;
    letter-spacing: 0em;
    color: #1D1F22;
    cursor: pointer;

    pointer-events: ${props=> props.disabled === true && "none"};
`;
const CurrencyVector = styled.img`
    width: 6px;
    height: 3px;
    margin-left: 10px;
    cursor: pointer;
`;

const CurrencyMenu = styled.div`
    position: absolute;
    top: 93px;
    left: -40px;
    width: 114px;
    height: 169px;
    box-shadow: 0px 4px 35px #a8acb03d;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    z-index: 1000;
`;
let CurrencyItem = styled.div`
    width: 100%;
    text-align: center;
    padding: 14px 0px;
    font-size: 18px;
    font-weight: 500;
    line-height: 29px;
    letter-spacing: 0em;
    cursor: pointer;

    background: ${props => props.activeCurrency === 'true'? " #EEEEEE" : "white"};

    &: hover {
        background: #EEEEEE;
    }
`;

let CartContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    position: relative;

    pointer-events: ${props=> props.disabled === true && "none"}
`;
const CartImage = styled.img`
    width: 20px;
    height: 18px;
    margin-left: 22px;
    position: relative;
`;

const CartQuantity = styled.div`
    position: absolute;
    width: 20px;
    height: 20px;
    background: #1D1F22;
    border-radius:50%;
    color: white;
    font-size: 14px;
    top: -10px;
    left: 35px;
    text-align: center;
    line-height: 20px;
`;

const CartListContainer = styled.div`
    position: absolute;
    top: 30px;
    right: 0;
    width: 325px;
    padding: 32px 16px;
    background: white;
    z-index: 1000;
    box-shadow: 0px 4px 35px #a8acb03d;
    font-size: 16px;
    font-weight: 600;
    color: #1D1F22;
`;

const MiniCartContent = styled.div`
    display: flex;
    flex-direction: column;
`;
const Title = styled.div`
    font-size: 16px;
    font-weight: 700;
    line-height: 26px;
    letter-spacing: 0em;
`;
const ItemCount = styled.span`
    font-size: 16px;
    font-weight: 500;
    line-height: 26px;
    letter-spacing: 0em;
`;
const Total = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 32px;
`;
const TotalText = styled.div`
    font-size: 16px;
    font-weight: 700;
    line-height: 18px;
    letter-spacing: 0em;
`;
const TotalSum = styled.div`
    font-size: 16px;
    font-weight: 700;
    line-height: 26px;
    letter-spacing: 0em;
`;
const ButtonContainer = styled.div`
    margin-top: 32px;
    display: flex;
    align-items: center;
    justify-content: space-between;
`;
const ButtonBag = styled.button`
    width: 140px;
    height: 43px;
    border: 1px solid #1D1F22;
    background: none;
    color: #1D1F22;
    font-size: 14px;
    font-weight: 500;
    line-height: 17px;
    letter-spacing: 0em;
    cursor: pointer;
`;
const ButtonCheck = styled.button`
    width: 140px;
    height: 43px;
    border: none;
    background-color: #5ECE7B;
    color: white;
    font-size: 14px;
    font-weight: 500;
    line-height: 17px;
    letter-spacing: 0em;
    cursor: pointer;
`;

let StyledLink = styled(Link)`
    text-decoration: none;

    pointer-events: ${props=> props.disabled === true && "none"};
`;

class Header extends Component {
    constructor(props) {
        super(props);

        this.state = {
            categories:[],
            currencies: [],
            currencyIsOpen: false,
            cartIsOpen: false,
            activeCategory: this.props.localCategory,
            activeCurrencyValue: "USD",
            total: 0,
            totalAmount: 0
        }
    }

    getActiveCurrencyValue = (value) => {
        this.setState(() => ({
            activeCurrencyValue: value
        }))
    }

    onClickCurrency = (value) => {
        this.getActiveCurrencyValue(value)
        this.props.getCurrentCurrencyValue(value)
    }

    closeCurrency = () => {
        this.setState(() => ({
            currencyIsOpen: false
        }))
    }

    setCurrencyOpen = (e) => {
        this.setState(({currencyIsOpen})=> ({
            currencyIsOpen: !currencyIsOpen
        }))
        e.stopPropagation();
        document.addEventListener("click", this.closeCurrency);
    }

    showCurrencies = () => {
        return this.state.currencies.map((item,i)=> {
            return (
                <CurrencyItem
                    key={i}
                    activeCurrency={this.state.activeCurrencyValue === item.label? 'true' : 'false'} 
                    onClick={() => this.onClickCurrency(item.label)}>
                    {item.symbol + item.label}
                </CurrencyItem>
            )
        })
    }

    getActiveCategory = (category) => {
        this.setState(() => ({
            activeCategory: category
        }))
    }

    onClickCategory = (category) => {
        this.props.addLocalCategory(category)
        this.getActiveCategory(category)
    }

    showCategories = () => {
        return this.state.categories.map((item,i)=> {
            let name = item.name;
            return (
                <Link onClick={this.state.cartIsOpen === true? (e) => e.preventDefault() : null}
                    key={i}
                    to="/" 
                    style={{textDecoration: "none"}}>
                    <Category 
                        disabled={this.state.cartIsOpen === true? true : false} 
                        category={this.state.activeCategory === item.name ? 'true' : 'false'} 
                        onClick={() => this.onClickCategory(item.name)}>
                        {name.charAt(0).toUpperCase() + name.slice(1)}
                    </Category>
                </Link>
            )
        })
    }

    closeCart = () => {
        this.setState(() => ({
            cartIsOpen: false
        }))
    }

    openCart = (e) => {
        this.setState(() => ({
            cartIsOpen: true
        }))
    }

    setCartOpen = (e) => {
        this.state.cartIsOpen === false ? this.openCart() : this.closeCart()
        
        this.props.checkCartState(!this.state.cartIsOpen)
        this.countTotal();

        e.stopPropagation();
        document.addEventListener("click", () => {
            this.closeCart();
            setTimeout(()=> {
                this.props.checkCartState(this.state.cartIsOpen)
            },0)
        }) 
    }

    countTotal = () => {

        this.setState(()=>({
            totalAmount: CountTotal(this.props.productsInCart, this.props.currentCurrencyValue).totalAmount
        }))

        this.setState(()=>({
            total: CountTotal(this.props.productsInCart, this.props.currentCurrencyValue).totalPrice
        }))
    
    }

    componentDidMount() {
        client.query({
            query:gql`
            query {
                currencies{
                    label,
                    symbol
                }
              }  
            `
           }).then(res => {
      
           let currencies = res.data.currencies;

           this.setState(()=>({currencies}))
        })

        client.query({
            query:gql`
            query {
                categories{
                    name
                }
            }
            `
        }).then(res => {
            let categories = res.data.categories;

            if(categories !== null)
            this.setState(()=>({categories}))
        })
    }

    render() {
        const { productsInCart, currentCurrencyValue,totalAmount } = this.props;
        
        return (
            <Container>
                <Left>
                   {this.showCategories()}
                </Left>
                <Center>
                <StyledLink to="/" disabled={this.state.cartIsOpen === true? true:false }>
                    <BoxImage src={require ('../Images/logo.png')}/>
                    <LineImage src={require ('../Images/logo-arrow.png')}/>
                    <ArrowImage src={require ('../Images/logo-arrow-vector.png')}/>
                </StyledLink>
                </Center>
                <Right>
                    <Currency >
                        <CurrencySign  
                            disabled={this.state.cartIsOpen === true? true:false} 
                            onClick = {this.setCurrencyOpen}>
                        {GetCurrencySign(this.state.activeCurrencyValue)}   
                        </CurrencySign>
                        
                        <CurrencyVector onClick = {this.setCurrencyOpen} src={require ('../Images/vector-arrow.png')}/>
                        {this.state.currencyIsOpen && 
                            <CurrencyMenu onClick={this.setCurrencyOpen}>
                            {this.showCurrencies()}
                            </CurrencyMenu>
                        }
                    </Currency>
                    <CartContainer 
                        onClick={this.countTotal} 
                        disabled={this.state.currencyIsOpen === true? true:false}>
                        <CartImage 
                            onClick = {this.setCartOpen} 
                            src={require ('../Images/cart.png')}/>
                        {productsInCart.length > 0 && 
                        <CartQuantity>
                            {totalAmount}
                        </CartQuantity>}
                          
                        {this.state.cartIsOpen && 
                        <CartListContainer 
                            onClick={e => e.stopPropagation()}
                            style={ productsInCart.length > 0 ?{overflowY: "scroll", height:'400px'} : {height: '10px'}}>
                            {productsInCart.length > 0? 
                            <MiniCartContent>
                            <Title>
                                My Bag,
                                <ItemCount>
                                   {this.state.totalAmount === 1? this.state.totalAmount + " item" : this.state.totalAmount + " items"} 
                                </ItemCount>
                                 
                            </Title>
                            <MiniCartItem 
                                countTotal={this.countTotal}
                                currentCurrencyValue={currentCurrencyValue}
                                productsInCart={productsInCart}
                                handleChangeCart={this.props.handleChangeCart}
                                totalForCart={this.props.totalForCart}/>
                            <Total>
                                <TotalText>
                                    Total
                                </TotalText>
                                <TotalSum>
                                    {GetCurrencySign(this.state.activeCurrencyValue)}{this.state.total}
                                </TotalSum>
                            </Total>
                            <ButtonContainer>
                                <Link to="/CartPage">
                               <ButtonBag onClick={this.closeCart}>
                                VIEW BAG
                                </ButtonBag>
                                </Link>
                            <ButtonCheck>
                                CHECKOUT
                            </ButtonCheck> 
                            </ButtonContainer>
                            
                    </MiniCartContent>
                        :   
                            "Cart is empty!"  
                        }
                        </CartListContainer>
                        }
                        
                    </CartContainer>
                </Right> 

            </Container>
        );
    }
}

export default Header;