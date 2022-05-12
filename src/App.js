import React, { Component } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { gql } from "@apollo/client"
import { client } from '.';
import Header from "./Components/Header";
import PLP from './Pages/PLP';
import PDP from './Pages/PDP';
import CartPage from './Pages/CartPage';

class App extends Component {
  constructor(props){
    super(props);

    this.state = {
      allProducts: null,
      tech: null,
      clothes: null,
      cartIsOpen: null,
      currentCurrencyValue: "USD",
      category: 'allProducts',
      chosenProduct: [],
      productsInCart: [],
      totalAmount: 0
    }
  }

  getProductToCartPLP = (product) => {
    let isInArray = false;
    this.state.productsInCart.forEach((el,i)=>{
      if(el.id === product.id && el.chosenSize === product.chosenSize && el.chosenCapacity === product.chosenCapacity && el.chosenUSB === product.chosenUSB && el.chosenKeyboard === product.chosenKeyboard && el.chosenColor === product.chosenColor ){
        el.quantity += 1
        isInArray = true;
      } else if (el.id !== product.id && el.chosenSize === product.chosenSize && el.chosenCapacity === product.chosenCapacity && el.chosenUSB === product.chosenUSB && el.chosenKeyboard === product.chosenKeyboard && el.chosenColor === product.chosenColor){
        el.quantity += 1
        isInArray = true;
      }
      
    })
    if(!isInArray){
      this.setState(({productsInCart}) => ({
      productsInCart: [...productsInCart,product]
    }))
    }
 
  }

  handleChangeCart = (product,d,id) => {
    const ind = this.state.productsInCart.indexOf(product);
    const arr = this.state.productsInCart;
    arr[ind].quantity += d;
  
  
  if(arr[ind].quantity === 0){
  const newArray = arr.filter((item) => item.id !== id)
    this.setState(() => ({
      productsInCart: [...newArray]
  }))
  
  } else {
    this.setState(() => ({
          productsInCart: [...arr]
      }))}
  }
  

  getChosenProduct = (prod,id) => {
    this.setState(() => ({
      chosenProduct: prod
    }))
  }

  getCategory = (category) => {
    this.setState(() => ({
        category: category
    }))
  }

  checkCartState = (state) => {
      this.setState(() => {
          return {
              cartIsOpen: state  
          }
      })
  }

  getCurrentCurrencyValue = (value) => {
    this.setState(() => ({
      currentCurrencyValue: value
    }))
  }

  totalForCart = () => {
    let itemsAmount = [];
    this.state.productsInCart.map(el => {
        itemsAmount.push(el.quantity);
    })
    let totalAmount =  itemsAmount.reduce((acc,curr) => {
        acc+= curr   
        return acc    
    },0)

    return this.setState(() => ({
      totalAmount: totalAmount
    }))
  }

  componentDidMount() {

    client.query({
      query:gql`
      query {
          categories {
             products{
              id
              name
              brand
              gallery
              inStock
              description
              attributes{
                type
                name
                items{
                  value
                }
              }
              prices{
                currency{
                  symbol
                  label
                }
                amount
              }
            }
          }
        }
      `
    }).then(res => {

      const all = res.data.categories[0].products;
      const cloth = res.data.categories[1].products;
      const tech = res.data.categories[2].products;

      this.setState(() => ({
        allProducts: all,
        tech: tech,
        clothes: cloth,
      }))
      
    })
  }
  render() {
    return (
      <BrowserRouter>
        <Header 
          checkCartState={this.checkCartState}
          getCategory={this.getCategory}
          getCurrentCurrencyValue={this.getCurrentCurrencyValue}
          productsInCart={this.state.productsInCart}
          currentCurrencyValue={this.state.currentCurrencyValue}
          handleChangeCart={this.handleChangeCart}
          totalAmount={this.state.totalAmount}
          />
        <Routes>
          <Route path="/" exact element={<PLP 
            allProducts={this.state.allProducts}
            tech={this.state.tech}
            clothes={this.state.clothes}
            cartIsOpen={this.state.cartIsOpen}
            currentCurrencyValue={this.state.currentCurrencyValue}
            category={this.state.category}
            getChosenProduct={this.getChosenProduct}
            getProductToCartPLP={this.getProductToCartPLP}
            chosenProduct={this.state.chosenProduct}
            totalForCart={this.totalForCart}
          />}/>
          <Route path="/productPage" exact 
            element={
              <PDP 
                currentCurrencyValue={this.state.currentCurrencyValue}
                cartIsOpen={this.state.cartIsOpen}
                chosenProduct={this.state.chosenProduct}
                getProductToCartPLP={this.getProductToCartPLP}
                totalForCart={this.totalForCart}
                />
              }/>
          <Route path="/cartPage" exact element={
            <CartPage 
              productsInCart={this.state.productsInCart}
              currentCurrencyValue={this.state.currentCurrencyValue}
              handleChangeCart={this.handleChangeCart}
              />
            }/>
          <Route path="*" element={<Navigate to="/" replace />}/>
        </Routes>
        
      </BrowserRouter>
    );
  }
}

export default App;

