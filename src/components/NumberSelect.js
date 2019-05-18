import React, { Component } from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import _ from 'lodash';

import { renderFromHelper } from '../utils/reduxFormHelper';

class NumberSelect extends Component {
    static defaultProps = {
        step: 1
    };
    render() {
        const { id, min, max, step,
            input,
            label,
            meta: { touched, error },
            children,
            ...custom } = this.props;
        return <FormControl error={touched}>
            <InputLabel>{label}</InputLabel>
            <Select
                {...input}
                {...custom}
            >
                {_.map(_.range(min, max, step), (num => (
                    <MenuItem key={num} value={num}>
                        {("00" + num).slice(-2)}
                    </MenuItem>
                )))}
            </Select>
            {renderFromHelper({ touched, error })}
        </FormControl>;
    }
}
export default NumberSelect;
