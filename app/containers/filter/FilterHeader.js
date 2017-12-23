import React, { Component } from 'react';
import { View, Text, Button, TouchableWithoutFeedback, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import DateTimePicker from 'react-native-modal-datetime-picker';

export default class FilterHeader extends Component {
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.dateLayout}>
                    <DateTextInput/>
                    <DateTextInput/>
                </View>
                <View style={styles.buttonContainer}> 
                    <Button
                        title='Filter' 
                        onPress={() => {}}/>
                </View>
            </View>
        );
    }
}

class DateTextInput extends Component {
    constructor(props) {
        super(props);
        this.state = {
            date: new Date(),
            datePickerVisible: false
        }
    }

    getDateString = () => {
        return this.state.date.toLocaleString('en-MY', {day:'numeric', month:'numeric', year:'numeric'});
    }

    handleSelectDate = (date) => {
        this.setState({
            date
        });
    }

    handleShowDatePicker = () => {
        this.setState({
            datePickerVisible: true
        });
    }

    handleSelectDate = (date) => {
        this.setState({
            date,
            datePickerVisible: false
        });
    }

    handleDismissDatePicker = () => {
        this.setState({
            datePickerVisible: false
        });
    }

    render() {
        return (
            <View style={styles.dateTextInput}>
                <TouchableWithoutFeedback onPress={this.handleShowDatePicker}>
                    <View style={styles.dateText}><Text>{this.getDateString()}</Text></View>
                </TouchableWithoutFeedback>
                <DateTimePicker
                    isVisible={this.state.datePickerVisible}
                    onConfirm={this.handleSelectDate}
                    onCancel={this.handleDismissDatePicker}
                    mode='date'/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        paddingBottom: 8,
        borderBottomWidth: 0.5
    },
    dateLayout: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginRight: 16,
        marginLeft: 16
    },
    dateTextInput: {
        flex: 0.4,
        padding: 4,
        borderWidth: 0.5,
        borderRadius: 5
    },
    dateText: {
        alignItems: 'center'
    },
    buttonContainer: {
        marginTop: 8,
        marginLeft: 64,
        marginRight: 64
    }
});