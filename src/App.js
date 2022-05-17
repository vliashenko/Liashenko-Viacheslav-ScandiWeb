import React, { Component } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Header from "./Components/Header";
import PLP from './Pages/PLP';
import PDP from './Pages/PDP';
import CartPage from './Pages/CartPage';

class App extends Component {
  constructor(props){
    super(props);

    this.state = {
      cartIsOpen: false,
      currentCurrencyValue: "USD",
      localCategory: JSON.parse(localStorage.getItem('category')) || 'all',
      productsInCart: [],
      totalAmount: 0
    }
  }

  addLocalCategory = (category) => {
    this.setState({
      localCategory: category
    },() => {
      localStorage.setItem('category', JSON.stringify(this.state.localCategory))
    });
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
      return  itemsAmount.push(el.quantity);
    })
    let totalAmount =  itemsAmount.reduce((acc,curr) => {
        acc+= curr   
        return acc    
    },0)

    return this.setState(() => ({
      totalAmount: totalAmount
    }))
  }

  closeCart = () => {
    this.setState(() => ({
        cartIsOpen: false
    }))
  }

  render() {
    return (
      <BrowserRouter>
        <Header 
          checkCartState={this.checkCartState}
          getCurrentCurrencyValue={this.getCurrentCurrencyValue}
          productsInCart={this.state.productsInCart}
          currentCurrencyValue={this.state.currentCurrencyValue}
          handleChangeCart={this.handleChangeCart}
          totalAmount={this.state.totalAmount}
          totalForCart={this.totalForCart}
          addLocalCategory={this.addLocalCategory}
          localCategory={this.state.localCategory}
          />
        <Routes>
          <Route path="/" exact element={<PLP 
            cartIsOpen={this.state.cartIsOpen}
            currentCurrencyValue={this.state.currentCurrencyValue}
            getProductToCartPLP={this.getProductToCartPLP}
            totalForCart={this.totalForCart}
            localCategory={this.state.localCategory}
          />}/>
          <Route path="/productPage" exact 
            element={
              <PDP 
                currentCurrencyValue={this.state.currentCurrencyValue}
                cartIsOpen={this.state.cartIsOpen}
                getProductToCartPLP={this.getProductToCartPLP}
                totalForCart={this.totalForCart}
                />
              }/>
          <Route path="/cartPage" exact element={
            <CartPage 
              totalForCart={this.totalForCart}
              closeCart={this.closeCart}
              cartIsOpen={this.state.cartIsOpen}
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

