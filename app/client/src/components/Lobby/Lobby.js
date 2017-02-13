import React from 'react';

import List from 'material-ui/List/List';
import ListItem from 'material-ui/List/ListItem';
import HourglassIcon from 'material-ui/svg-icons/action/hourglass-empty';
import DoneIcon from 'material-ui/svg-icons/action/done';

class Lobby extends React.Component {


    get styles() {
        return {
            container: {
                display: 'flex',
            }
        }
    }

    render() {
        return (
            <div style={{...this.styles.container, ...this.props.style}}>
                <List>
                    {
                        this.props.users.map((user, i) =>
                            <ListItem key={user.username}
                                      primaryText={user.username}
                                      rightIcon={user.ready ? <DoneIcon /> : <HourglassIcon />}
                                      disabled={true}/>
                        )
                    }
                </List>
            </div>
        );
    }
}
export default Lobby;

Lobby.defaultProps = {};

Lobby.propTypes = {
    users: React.PropTypes.array,
};