/**
 * Created by Masa on 03-Jan-17.
 */
import React from 'react';
import Game from './Game';

export default class GameResizeHandler extends React.Component{
    constructor(){
        super();

        this.state = {
            dimensions: {
                userCardsWidth: 700,
                userCardsHeight: 250,
                talon: 270,
                opponents: 150,
            }
        };

        this.handleResize = this.handleResize.bind(this);

    }

    handleResize() {
        const w = document.documentElement.clientWidth;
        const h = document.documentElement.clientHeight;

        let dimensions = {
            userCardsWidth: 700,
            userCardsHeight: 250,
            talon: 270,
            opponents: 150,
        };
        if (w < 1000) {
            dimensions.userCardsWidth = w * 7 / 10;
            dimensions.talon = w * 270 / 1000;
            dimensions.opponents = w * 15 / 100;
        }
        if (w < 550) {
            dimensions.userCardsWidth = w * 0.95;
        }
        if (h < 750) {
            dimensions.userCardsHeight = h * 250 / 750;
            dimensions.talon = h * dimensions.talon / 750;
            dimensions.opponents = h * dimensions.opponents / 750;
        }
        console.log(dimensions.talon);
        this.setState({dimensions: dimensions});
    }

    componentDidMount() {
        window.addEventListener("resize", this.handleResize);
    }

    componentWillMount() {
        this.handleResize();
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.handleResize);
    }

    render(){
        return(
            <Game dimensions={this.state.dimensions}/>
        );
    }
}