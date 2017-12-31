import React, { Component } from 'react';
import { TextInput } from 'react-native';
import PropTypes from 'prop-types';

export default class ValidationTextView extends Component {
    getPlaceholder = () => {
        const {name, error, errorPlaceholders} = this.props;
        if (error !== null && error >= 0) {
            if (error === 0) {
                return `${name} cannot be empty`;
            } else if (errorPlaceholders && error <= errorPlaceholders.length) {
                return errorPlaceholders[error - 1];
            }
        }
        return name;
    }

    render() {
        return (
            <TextInput 
                {...this.props}
                style={this.props.style}
                placeholder={this.getPlaceholder()}
                placeholderTextColor={this.props.error === null ? 'grey' : 'red'} />
        )
    }
}

ValidationTextView.propTypes = {
    ...TextInput.propTypes,
    name: PropTypes.string.isRequired,
    error: PropTypes.number,
    errorPlaceholders: PropTypes.arrayOf(
        PropTypes.string.isRequired
    )
}
