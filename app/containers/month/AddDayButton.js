import React, { Component } from 'react';
import { View, Button } from 'react-native';
import DateTimePicker from 'react-native-modal-datetime-picker';

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
        const today = new Date();
        return (
            <View>
                <Button title='+' onPress={this.handleShowDatePicker}/>
                <DateTimePicker
                    isVisible={this.state.datePickerVisible}
                    onConfirm={this.handleSelectDate}
                    onCancel={this.handleDismissDatePicker}
                    minimumDate={new Date(today.getFullYear(), 0, 1)}
                    maximumDate={new Date(today.getFullYear(), 11, 31)}
                    mode='date'/>
            </View>
        );
    }
}