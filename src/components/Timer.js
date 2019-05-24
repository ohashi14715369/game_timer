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
        var diff = this.getDiff(start, end);
        this.state = {
            start: null,
            end: null,
            text: this.getText(diff),
            timer: null,
            millis: diff,
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
        this.props.actions.startTimer(this.props.timer.instanceId);
    }
    stop() {
        if (this.state.timer) {
            var start = this.state.start;
            var end = moment();
            var diff = this.getDiff(start, end);
            var passed = Math.min(this.state.passed + diff, this.state.millis);
            var text = this.getText(this.state.millis - passed);
            clearInterval(this.state.timer);
            this.setState(prev => ({ ...prev, start: null, end: null, timer: null, passed, text }));
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
            text: this.getText(this.getDiff(start, end)),
            passed: 0
        }));
    }
    update() {
        var start = moment();
        var end = this.state.end;
        var diff = this.getDiff(start, end);
        if (diff <= 0) {
            this.stop();
            this.notify();
        }
        else {
            this.setState(prev => ({ ...prev, text: this.getText(diff) }));
        }
    }
    getDiff(start, end) {
        var diff = end.diff(start, 'milliseconds');
        if (diff < 0) {
            diff = 0;
        }
        return diff;
    }
    getText(diff) {
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
        this.props.actions.deleteTimer(this.props.timer.instanceId);
    }
    notify() {
        this.props.actions.notifyTimer(this.props.timer.instanceId);
    }
    stopRinging() {
        if (this.props.timer.ringing) {
            this.props.actions.stopRinging(this.props.timer.instanceId);
        }
    }
    render() {
        const { classes, timer } = this.props;
        const { text, start } = this.state;
        return <div onClick={() => this.stopRinging()}>
            <Typography variant="subtitle1" gutterBottom>{timer.label}</Typography>
            <Typography variant="body1" gutterBottom>{text}</Typography>
            {this.props.timer.soundName ? <div><Icon></Icon>{this.props.timer.soundName}</div> : null}
            <IconButton color="secondary" className={classes.button} aria-label="start"
                onClick={() => this.start()} disabled={start != null}>
                <Icon>play_arrow</Icon>
            </IconButton>
            <IconButton color="secondary" className={classes.button} aria-label="stop"
                onClick={() => this.stop()} disabled={start == null}>
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