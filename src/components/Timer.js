import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import moment from 'moment';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';

import * as actions from '../actions';

class Timer extends Component {
    constructor(props) {
        super();
        var start = moment();
        var end = moment(start)
            .add(props.timer.hour, 'hours')
            .add(props.timer.minute, 'minutes')
            .add(props.timer.second, 'seconds');
        this.state = {
            start: null,
            end: null,
            text: this.getText(start, end),
            timer: null,
            millis: end.diff(start, 'seconds') * 1000,
            passed: 0
        };
    }
    start() {
        const INTERVAL = 16;
        const { millis, passed } = this.state;
        var start = moment();
        var end = moment().add(millis - passed, 'milliseconds');
        if (this.state.timer) {
            clearInterval(this.state.timer);
        }
        this.setState(prev => ({
            ...prev,
            start,
            end,
            timer: setInterval(() => this.update(), INTERVAL)
        }));
    }
    stop() {
        if (this.state.timer) {
            clearInterval(this.state.timer);
            this.setState(prev => ({ ...prev, start: null, end: null, timer: null, passed: this.state.passed + moment().diff(this.state.start, 'milliseconds') }));
        }
    }
    reset() {
        const { millis } = this.state;
        var start = moment();
        var end = moment().add(millis, 'milliseconds');
        this.setState(prev => ({
            ...prev,
            start,
            end,
            text: this.getText(start, end),
            passed: 0
        }));
    }
    update() {
        this.setState(prev => ({ ...prev, text: this.getText(moment(), prev.end) }));
    }
    getText(start, end) {
        var diff = end.diff(start, 'milliseconds');
        var millis = diff % 1000;
        diff = Math.floor(diff / 1000);
        var seconds = diff % 60;
        diff = Math.floor(diff / 60);
        var minutes = diff % 60;
        diff = Math.floor(diff / 60);
        var hours = diff;
        return ("00" + hours).slice(-2)
            + ":" + ("00" + minutes).slice(-2)
            + ":" + ("00" + seconds).slice(-2)
            + "." + ("000" + millis).slice(-3);
    }
    delete() {
        if (this.state.timer) {
            clearInterval(this.state.timer);
        }
        this.props.actions.timerDelete(this.props.timer.id);
    }
    render() {
        const { classes } = this.props;
        const { text, timer } = this.state;
        return <div>
            <Typography variant="body1" gutterBottom>{text}</Typography>
            <IconButton color="secondary" className={classes.button} aria-label="start"
                onClick={() => this.start()} disabled={timer != null}>
                <Icon>play_arrow</Icon>
            </IconButton>
            <IconButton color="secondary" className={classes.button} aria-label="stop"
                onClick={() => this.stop()} disabled={timer == null}>
                <Icon>pause</Icon>
            </IconButton>
            <IconButton color="secondary" className={classes.button} aria-label="reset"
                onClick={() => this.reset()}>
                <Icon>replay</Icon>
            </IconButton>
            <IconButton color="secondary" className={classes.button} aria-label="delete"
                onClick={() => this.delete()}>
                <Icon>delete</Icon>
            </IconButton>
        </div >
    }
}
function mapDispatch(dispatch) {
    return {
        actions: bindActionCreators(actions, dispatch),
    };
}

const styles = theme => ({
    button: {
        margin: theme.spacing.unit,
    }
});
export default withStyles(styles)(connect(null, mapDispatch)(Timer));