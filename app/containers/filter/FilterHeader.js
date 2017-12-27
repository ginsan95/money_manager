import React, { Component } from 'react';
import { View, Text, Button, TouchableWithoutFeedback, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import DateTimePicker from 'react-native-modal-datetime-picker';

export default class FilterHeader extends Component {
    handleFilterItems = () => {
        let {start, end} = this.props.dates;
        const startDate = new Date(start.getFullYear(), start.getMonth(), start.getDate());
        const endDate = new Date(end.getFullYear(), end.getMonth(), end.getDate(), 23, 59, 59, 999);
        this.props.handleFilterItems(startDate, endDate);
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.dateLayout}>
                    <DateTextInput
                        namespace='start'
                        dates={this.props.dates}
                        handleChangeDate={this.props.handleChangeDate}/>
                    <DateTextInput
                        namespace='end'
                        dates={this.props.dates}
                        handleChangeDate={this.props.handleChangeDate}/>
                </View>
                <View style={styles.buttonContainer}> 
                    <Button
                        title='Filter' 
                        onPress={this.handleFilterItems}/>
                </View>
            </View>
        );
    }
}

FilterHeader.propTypes = {
    dates: PropTypes.shape({
        start: PropTypes.instanceOf(Date).isRequired,
        end: PropTypes.instanceOf(Date).isRequired
    }).isRequired,
    handleFilterItems: PropTypes.func.isRequired
}

class DateTextInput extends Component {
    constructor(props) {
        super(props);
        this.state = {
            datePickerVisible: false
        }
    }

    getDateString = () => {
        const date = this.props.dates[this.props.namespace];
        return date.toMyDateString();
    }

    getDatePickerMax = () => this.props.namespace === 'start' ? this.props.dates.end : undefined;

    getDatePickerMin = () => this.props.namespace === 'end' ? this.props.dates.start : undefined;

    handleShowDatePicker = () => {
        this.setState({
            datePickerVisible: true
        });
    }

    handleSelectDate = (date) => {
        this.props.handleChangeDate(this.props.namespace, date);
        this.handleDismissDatePicker();
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
                    mode='date'
                    minimumDate={this.getDatePickerMin()}
                    maximumDate={this.getDatePickerMax()}/>
            </View>
        );
    }
}

DateTextInput.propTypes = {
    namespace: PropTypes.string.isRequired,
    dates: PropTypes.shape({
        start: PropTypes.instanceOf(Date).isRequired,
        end: PropTypes.instanceOf(Date).isRequired
    }).isRequired,
    handleChangeDate: PropTypes.func.isRequired
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