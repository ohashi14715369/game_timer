import React from 'react';
import FormHelperText from '@material-ui/core/FormHelperText';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Button from '@material-ui/core/Button';

export const renderFromHelper = ({ touched, error }) => {
    if (!(touched && error)) {
        return
    } else {
        return <FormHelperText>{touched && error}</FormHelperText>
    }
}

export const renderTextField = ({
    label,
    input,
    meta: { touched, invalid, error },
    ...custom
}) => (
        <TextField
            label={label}
            placeholder={label}
            error={touched && invalid}
            helperText={touched && error}
            {...input}
            {...custom}
        />
    )
// File
export const renderFile =
    ({
        input: { value, name, onChange },
        label,
        meta: { touched, error },
        classes,
        onFieldChange,
        buttonLabel,
        accept = '*',
        required = false,
        rootClass = '',
    }) => (
            <FormControl classes={{ root: rootClass }} required={required} component='fieldset' error={!!(touched && error)}>
                <FormLabel component='legend'>{label}</FormLabel>
                <input
                    accept={accept}
                    id={name}
                    type='file'
                    onChange={e => {
                        e.preventDefault()
                        onChange(e.target.files[0])
                        onFieldChange && onFieldChange(e.target.files[0])
                    }}
                    onBlur={() => { }}
                />
                <label htmlFor={name}>
                    <Button variant='outlined' component='span'>
                        {buttonLabel || 'ファイルを選択'}
                    </Button>
                </label>
                <label>{value && value.name}</label>
                {touched && error && <FormHelperText>{error}</FormHelperText>}
            </FormControl>
        )
    ;