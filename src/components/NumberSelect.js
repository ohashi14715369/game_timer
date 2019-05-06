import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import _ from 'lodash';

class NumberSelect extends Component {
    static defaultProps = {
        step: 1
    };
    render() {
        const { min, max, step, ...other } = this.props;
        return <TextField
            select
            value={this.props.value}
            {...other}
        >
            {_.map(_.range(min, max, step), (num => (
                <MenuItem key={num} value={num}>
                    {("00" + num).slice(-2)}
                </MenuItem>
            )))}
        </TextField>;
    }
}
export default NumberSelect;