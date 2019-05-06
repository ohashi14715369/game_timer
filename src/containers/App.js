import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import _ from 'lodash';
import './App.css';
import * as actions from '../actions';

import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';

import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';

import Button from '@material-ui/core/Button';

import NumberSelect from '../components/NumberSelect';
import Timer from '../components/Timer';

class App extends Component {
  constructor(props) {
    super(props);
    props.actions.loadGameTimer();
  }
  render() {
    const { gametimer, createtimer, actions, classes } = this.props;
    return (
      <div className={classes.root} >
        <AppBar position="static">
          <Toolbar variant="dense">
            <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" color="inherit">
              Game Timer
          </Typography>
          </Toolbar>
        </AppBar>
        {
          _.map(gametimer.timers, timer => <Timer key={timer.timerId} timer={timer} />)
        }
        <Fab color="secondary" aria-label="Add" className={classes.addButton} onClick={() => actions.createTimerOpen()}>
          <AddIcon />
        </Fab>

        <Dialog onClose={() => actions.createTimerClose()} aria-labelledby="simple-dialog-title" open={createtimer.show}>
          <DialogTitle id="simple-dialog-title">Create Timer</DialogTitle>
          <div>
            <NumberSelect
              min="0" max="99"
              label="hour"
              value={createtimer.hour}
              onChange={(e) => actions.createTimerChange('hour', e.target.value)} />
            <NumberSelect
              min="0" max="59"
              label="minute"
              value={createtimer.minute}
              onChange={(e) => actions.createTimerChange('minute', e.target.value)} />
            <NumberSelect
              min="0" max="59"
              label="second"
              value={createtimer.second}
              onChange={(e) => actions.createTimerChange('second', e.target.value)} />
            <Button onClick={() => actions.createTimerRegister()}>Register</Button>
          </div>
        </Dialog>
      </div>
    );
  }
}

const mapState = (state, ownProps) => ({
  gametimer: state.gametimer,
  createtimer: state.createtimer
});

function mapDispatch(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch),
  };
}

const styles = (theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -18,
    marginRight: 10,
  },
  addButton: {
    position: 'absolute',
    bottom: theme.spacing.unit * 2,
    right: theme.spacing.unit * 2,
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
  menu: {
    width: 200
  }
});
export default withStyles(styles, { withTheme: true })(connect(mapState, mapDispatch)(App));
