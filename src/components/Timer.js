import React, { Component } from 'react';
import moment from 'moment';
import Button from '@material-ui/core/Button';

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
            millis: end.diff(start, 'seconds') * 1000
        };
    }
    start() {
        const INTERVAL = 16;
        const { millis } = this.state;
        var start = moment();
        var end = moment().add(millis, 'milliseconds');
        this.setState(prev => ({
            ...prev,
            start,
            end,
            timer: setInterval(() => this.update(), INTERVAL)
        }));
    }
    stop() {
        clearInterval(this.state.timer);
        this.setState(prev => ({ ...prev, start: null, end: null, timer: null, millis: this.state.end.diff(moment(), 'milliseconds') }));
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
    render() {
        const { text } = this.state;
        return <div>{text}<Button onClick={() => this.start()}>start</Button><Button onClick={() => this.stop()}>end</Button></div>
    }
}
export default Timer;