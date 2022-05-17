import React, { Component } from 'react';
import styled from "styled-components";


const Container = styled.div`
    width: 200px;
    height: 310px;
    display: flex;
    position: relative;
    overflow: hidden;
`;

let Wrapper = styled.div`
    height: 100%;
    display: flex;
    transition: all 1.5s ease;
    transform: translateX(${props => props.slideIndex * - 200}px);
`;

let Arrow = styled.div`
    position: absolute;
    top: 80%;
    bottom: 0;
    left: ${props => props.direction === "left" && "130px"};
    right: ${props => props.direction === "right" && "10px"};
    margin: auto;
    cursor: pointer;
    width: 24px;
    height: 24px;
    background-color: rgba(0, 0, 0, 0.73);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 2;
`;
const ArrowImageLeft = styled.img`
    width: 5.63px;
    height: 11.24px;
`;
const Slide = styled.div``;

const ImageContainer = styled.div`
    width: 200px;
`;

const Image = styled.img`
    width: 100%;
    height: 310px;
    object-fit: cover;
`;

const ArrowImageRight = styled.img`
    width: 5.63px;
    height: 11.24px;
`;

class CartSlider extends Component {
    constructor(props) {
        super(props);

        this.state = {
            slideIndex: 0
        }
    }
        handleClick = (direction) => {
            if(this.props.gallery.length > 3) {
                if(direction === "left") {
                    this.setState(({slideIndex}) => {
                        if(slideIndex > 0) {
                           return {
                             slideIndex: slideIndex - 1  
                           } 
                        } else {
                            return {
                                slideIndex: this.props.gallery.length - 1  
                            } 
                        }
                    })
                } else { 
                    this.setState(({slideIndex}) => {
                        if(slideIndex < this.props.gallery.length - 1) {
                            return {
                                slideIndex: slideIndex + 1  
                              } 
                        } else {
                            return {
                                slideIndex: 0  
                            } 
                        }
                    })
                }
            } else {
                if(direction === "left") {
                    this.setState(({slideIndex}) => {
                
                        return {
                            slideIndex: 0  
                        } 
                        
                    })
                } else { 
                    this.setState(({slideIndex}) => {
                        
                        return {
                            slideIndex: 0  
                        } 
                        
                    })
                }
            }
            

        }
    
    render() {
        return (
            <Container>
                <Arrow 
                    style={this.props.gallery.length > 1 ? {display: 'flex'} : {display: "none"}}
                    direction="left" 
                    onClick = {() => this.handleClick("left")}>
                    <ArrowImageLeft src={require ('../Images/slider-left.png')}/>
                </Arrow>
                <Wrapper slideIndex={this.state.slideIndex}>
                {this.props.gallery.map((item,i) => {
                    return (
                        <Slide key={i}>
                        <ImageContainer>
                            <Image  src={item}/>
                        </ImageContainer>
                        </Slide>
                    )
                })}
                </Wrapper>
                <Arrow 
                    style={this.props.gallery.length > 1 ? {display: 'flex'} : {display: "none"}}
                    direction="right" 
                    onClick = {() => this.handleClick("right")}>
                    <ArrowImageRight src={require ('../Images/slider-right.png')}/>
                </Arrow>
            </Container>
        );
    }
}

export default CartSlider;