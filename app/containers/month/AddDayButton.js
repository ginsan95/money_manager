import React, { Component } from 'react';
import { View, Button } from 'react-native';
import DateTimePicker from 'react-native-modal-datetime-picker';
import PropTypes from 'prop-types';

export default class AddDayButton extends Component {
    constructor(props) {
        super(props);
        this.state = {
            datePickerVisible: false
        }
    }

    handleShowDatePicker = () => {
        this.setState({
            datePickerVisible: true
        });
    }

    handleSelectDate = (date) => {
        this.handleDismissDatePicker();
        this.props.handleAddDay(date);
    }

    handleDismissDatePicker = () => {
        this.setState({
            datePickerVisible: false
        });
    }

    render() {
        const {year} = this.props;
        return (
            <View>
                <Button title='+' onPress={this.handleShowDatePicker}/>
                <DateTimePicker
                    isVisible={this.state.datePickerVisible}
                    onConfirm={this.handleSelectDate}
                    onCancel={this.handleDismissDatePicker}
                    minimumDate={new Date(year, 0, 1)}
                    maximumDate={new Date(year, 11, 31)}
                    mode='date'/>
            </View>
        );
    }
}

AddDayButton.propTypes = {
    year: PropTypes.string.isRequired,
    handleAddDay: PropTypes.func.isRequired
}
