import React, { Component } from 'react';
import './App.css';
import Card from './Card/Card';
import CardComponent from "./Card/CardComponent";
import CardSet from "./Card/CardSet";
import Game from "./Game/Game";
import Main from "./Gameplay/Main";
import Login from "./Login/Login";
import Lobby from "./Lobby/Lobby";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import mainMuiTheme from './MainMuiTheme';


class App extends Component {
    get testCards(){
        return [
            new Card("spades", "2"),
            new Card("spades", "7"),
            new Card("diamonds", "1"),
            new Card("spades", "12"),
            new Card("spades", "13"),
            new Card("spades", "1"),
            new Card("diamonds", "2"),
            new Card("diamonds", "13"),
            new Card("clubs", "1"),
            new Card("clubs", "2"),
            new Card("clubs", "10"),
            new Card("clubs", "14"),
            new Card("hearts", "3"),
            new Card("hearts", "12"),

            new Card("spades", "12"),
            new Card("spades", "13"),
            new Card("spades", "1"),
            new Card("diamonds", "2"),
            new Card("diamonds", "13"),
            new Card("clubs", "1"),
            new Card("clubs", "2"),
            new Card("clubs", "10"),
            new Card("clubs", "14"),
            new Card("hearts", "3"),
            new Card("hearts", "12"),
        ];
    }
    get styles(){
        return {
            app: {
                height: "100vh",
                display: "flex",
                justifyContent: "space-around",
                alignContent:"space-around",
                backgroundColor: "#ECEFF1"
            },
            container: {
                display: 'flex',
                flexDirection: 'column',

                width: '100%',
            }

        };
    }
    /*
     {this.testCards.map((card, i)=>
     <CardComponent
     card={card}
     key={i.toString()}
     cardHeight={310}/>
     )}
    */
  render() {
    return (
        <div className="App" style={this.styles.app}>
            <link href="https://fonts.googleapis.com/css?family=Roboto+Condensed:300,400,700" rel="stylesheet"/>
            <link href="https://fonts.googleapis.com/css?family=Open+Sans+Condensed:300" rel="stylesheet" />
            <link href="https://fonts.googleapis.com/css?family=Raleway:100,200,400,600" rel="stylesheet"/>
            <link href="https://fonts.googleapis.com/css?family=Dosis:200,300,400" rel="stylesheet" />
            <link href="https://fonts.googleapis.com/css?family=Roboto:100,100i,300,300i,400,400i,500,500i,700,700i,900,900i" rel="stylesheet" />
            <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
            <div style={this.styles.container}>
                <MuiThemeProvider muiTheme={getMuiTheme(mainMuiTheme)}>
                 <Lobby/>

                </MuiThemeProvider>
            </div>
        </div>


/*
       <div className="App" styles={this.styles}>
           <CardSet width={500} cards={this.testCards.splice(5)} cardNumber={5} sort />
           <CardSet width={500} cards={this.testCards.splice(7)} cardNumber={5} sort />
           <CardSet width={500} cards={this.testCards.splice(2)} cardNumber={5} />
           <CardSet width={500} cards={this.testCards} cardNumber={5} />
           <CardSet width={500} back cardNumber={5} />

       </div>
*/
    );
  }
}



export default App;
