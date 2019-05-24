import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';

import Button from '@material-ui/core/Button';

import NumberSelect from './NumberSelect';
import { renderTextField, renderFile } from '../utils/reduxFormHelper';

class TimerForm extends Component {
    render() {
        const { handleSubmit } = this.props;
        return (
            <form onSubmit={handleSubmit}>
                <div>
                    <Field name="label"
                        component={renderTextField}
                        label="label"
                    />
                </div>
                <div>
                    <Field name="hour"
                        component={NumberSelect}
                        props={{ min: 0, max: 99, label: "hour" }} />
                    <Field name="minute"
                        component={NumberSelect}
                        props={{ min: 0, max: 59, label: "minute" }} />
                    <Field name="second"
                        component={NumberSelect}
                        props={{ min: 0, max: 59, label: "second" }} />

                    <Field name='sound' label='sound' accept='audio/*' component={renderFile} />
                    <Button type="submit">Register</Button>
                </div>
            </form>
        );
    }
}

TimerForm = reduxForm({
    form: 'createTimer',
    initialValues: {
        hour: 0,
        minute: 0,
        second: 0
    }
})(TimerForm);

export default TimerForm;