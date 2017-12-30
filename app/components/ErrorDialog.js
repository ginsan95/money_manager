import React, { Component } from 'react';
import { View } from 'react-native';
import { ConfirmDialog } from 'react-native-simple-dialogs';
import PropTypes from 'prop-types';

export default class ErrorDialog extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dialogVisible: true 
        }
    }

    componentWillUpdate(nextProps) {
        if (this.props.visible !== nextProps.visible) {
            this.setState({
                dialogVisible: true
            });
        }
    }

    handleDismissDialog = () => {
        this.setState({
            dialogVisible: false
        });
    }

    isVisible = () => {
        return this.props.visible && this.props.error != null && this.props.error.message != null && this.state.dialogVisible;
    }

    render() {
        return (
            <View>
                <ConfirmDialog
                    message={this.props.error ? this.props.error.message : ''}
                    visible={this.isVisible()}
                    positiveButton={{
                        title: 'OK',
                        onPress: this.handleDismissDialog
                    }}
                />
            </View>
        );
    }
}

ErrorDialog.PropTypes = {
    visible: PropTypes.bool.isRequired,
    error: PropTypes.any.isRequired
}
