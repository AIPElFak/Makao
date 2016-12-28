/**
 * Created by Masa on 29-Dec-16.
 */
import React from 'react';
import LinearProgress from 'material-ui/LinearProgress';

export default class TimerProgress extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            completed: 0,
        };
    }

    componentDidMount() {
        this.timer = setTimeout(() => this.progress(0), 1000);
    }

    componentWillUnmount() {
        clearTimeout(this.timer);
    }

    progress(completed) {
        if (completed > this.props.length) {
            this.setState({completed: this.props.length});
            this.props.onTimeExpiration();

        } else {
            this.setState({completed});
            this.timer = setTimeout(() => this.progress(completed + 1), 1000);
        }
    }

    render() {
        return (
            <LinearProgress mode="determinate" value={this.state.completed} min={0} max={this.props.length} style={this.props.style}/>
        );
    }
}


TimerProgress.propTypes = {
    length: React.PropTypes.number,
    onTimeExpiration: React.PropTypes.func,
}