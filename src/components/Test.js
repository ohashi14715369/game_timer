import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Test extends Component {
    static propTypes = {
        number: PropTypes.number.isRequired,
        onClick: PropTypes.func.isRequired

    };
    render() {
        return <button onClick={this.props.onClick}>{this.props.number}</button>;
    }
}

export default Test;