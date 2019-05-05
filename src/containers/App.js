import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import './App.css';
import * as actions from '../actions';

class App extends Component {
  render() {
    const { createtimer, actions } = this.props;
    return (
      <div className="App" >
        <button onClick={() => actions.openCreateTimer()}>open</button>
        {createtimer.show ? <div>show<button onClick={() => actions.closeCreateTimer()}>close</button></div> : null}
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

export default connect(mapState, mapDispatch)(App);
