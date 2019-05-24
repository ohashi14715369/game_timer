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
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';

import Timer from '../components/Timer';
import TimerForm from '../components/TimerForm';

class App extends Component {
    constructor(props) {
        super(props);
        props.actions.loadGameTimer();
        Notification.requestPermission().then(function (result) {
        });
    }
    render() {
        const { gametimer, createtimer, actions, classes } = this.props;
        return (
            <div className={classes.root} >
                <AppBar position="static">
                    <Toolbar variant="dense">
                        <IconButton className={classes.menuButton} color="inherit" aria-label="Menu" onClick={() => actions.showDrawer()}>
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" color="inherit">Game Timer</Typography>
                    </Toolbar>
                </AppBar>

                <Drawer open={gametimer.visibleDrawer} onClose={() => actions.hideDrawer()}>
                    <div
                        tabIndex={0}
                        role="button"
                        onClick={() => actions.hideDrawer()}
                        onKeyDown={() => actions.hideDrawer()}
                    >
                        <div className={classes.list}>
                            <List>
                                <ListItem button onClick={() => actions.updateApp()}>
                                    <ListItemText primary="Update" />
                                </ListItem>
                            </List>
                        </div>
                    </div>
                </Drawer>
                {
                    _.map(gametimer.timers, timer => <Timer key={timer.instanceId} timer={timer} />)
                }
                <Fab color="secondary" aria-label="Add" className={classes.addButton} onClick={() => actions.createTimerOpen()}>
                    <AddIcon />
                </Fab>

                <Dialog onClose={() => actions.createTimerClose()} aria-labelledby="simple-dialog-title" open={createtimer.show}>
                    <DialogTitle id="simple-dialog-title">Create Timer</DialogTitle>
                    <TimerForm onSubmit={(values) => actions.createTimerRegister(values)} />
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
