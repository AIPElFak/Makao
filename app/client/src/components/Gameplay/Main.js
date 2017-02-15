/**
 * Created by Masa on 28-Dec-16.
 */
import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import mainMuiTheme from '../../MainMuiTheme';
import GameActions from '../../actions/GameActions';

import GameResizeHandler from '../Game/GameResizeHandler';
import GameInitializer from './GameInitializer';
import RightSidebar from './RightSidebar';


class Main extends React.Component {
    constructor() {
        super();
        this.state = {
            gameStarted: null,
        };


        //
        this.handleGameStart = this.handleGameStart.bind(this);
    }


    componentDidMount(){
        GameActions.isGameStarted(this.props.params.username, (started) => {
            this.setState({gameStarted: started});
        });
    }

    handleGameStart(){
        this.setState({gameStarted: true});
    }

    get styles() {

        return {
            container: {
                width: '100vw',
                height: '100vh',
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'flex-start',
                overflow: 'hidden',
            },
            game: {
                width: '100%',
                height: '100%',
                padding: '1% 1% 0 1%',
                boxSizing: 'border-box',
            },
            rightSidebar: {}
        }
    }


    render() {
        if(this.state.gameStarted === null) return null;
        return (
            <div>
                <MuiThemeProvider muiTheme={getMuiTheme(mainMuiTheme)}>
                    <div style={this.styles.container}>
                        <div style={this.styles.game}>
                            {this.state.gameStarted ? <GameResizeHandler/> : <GameInitializer creatorUsername={this.props.params.username} onGameStart={this.handleGameStart}/>}
                        </div>
                        <RightSidebar creatorUsername={this.props.params.username} />
                    </div>

                </MuiThemeProvider>
            </div>
        );
    }
}

export default Main;
