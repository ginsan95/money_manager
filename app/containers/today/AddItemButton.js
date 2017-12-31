import React, { Component } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { Dialog } from 'react-native-simple-dialogs';
import PropTypes from 'prop-types';
import DateTimePicker from 'react-native-modal-datetime-picker';
import { postItem } from '../../api/API';
import Item from '../../models/Item';
import ValidationTextInput from '../../components/ValidationTextInput';

export default class AddItemButton extends Component {
    initialState = {
        name: '',
        price: '',
        date: this.props.date,
        nameError: null,
        priceError: null,
        datePickerVisible: false
    }

    constructor(props) {
        super(props);
        this.state = {
            ...this.initialState,
            dialogVisible: false
        }
    }

    handleShowDialog = () => {
        this.setState({
            dialogVisible: true
        });
    }

    handleNameChange = (text) => {
        this.setState({
            name: text,
            nameError: null
        });
    }

    handlePriceChange = (text) => {
        this.setState({
            price: text,
            priceError: null
        });
    }

    handleShowDatePicker = () => {
        this.setState({
            datePickerVisible: true
        });
        this.dateInput.blur();
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

    handleAddItem = () => {
        let {name, price, date} = this.state;
        if (!name || name.length === 0) {
            this.setState({
                nameError: 0
            });
        } else if (!price || price.length === 0) {
            this.setState({
                priceError: 0
            });
        } else {
            this.setState({
                dialogVisible: false
            });
            this.props.handleAddItem(new Item(name, parseFloat(price, 0), date));
        }
    }

    resetData = () => {
        this.setState(this.initialState);
    }

    render() {
        return (
            <View>
                <Button title='+' onPress={this.handleShowDialog}/>
                <Dialog
                    visible={this.state.dialogVisible} 
                    title="Add Item"
                    onTouchOutside={() => this.setState({dialogVisible: false})}
                    onShow={this.resetData} >
                    <View>
                        <ValidationTextInput
                            style={styles.textInput}
                            name='Name'
                            onChangeText={this.handleNameChange}
                            autoFocus={true} 
                            error={this.state.nameError}/>
                        <ValidationTextInput
                            style={styles.textInput}
                            name='Price'
                            onChangeText={this.handlePriceChange}
                            keyboardType="numeric"
                            error={this.state.priceError}/>
                        <TextInput
                            ref={(input) => {this.dateInput = input}}
                            style={styles.textInput}
                            value={this.state.date ? this.state.date.toMyTimeString() : ''}
                            onFocus={this.handleShowDatePicker}/>
                        <DateTimePicker
                            isVisible={this.state.datePickerVisible}
                            onConfirm={this.handleSelectDate}
                            onCancel={this.handleDismissDatePicker}
                            date={this.props.date}
                            mode='time'
                            is24Hour={false}/>
                        <Button title="Add" onPress={this.handleAddItem}/>
                    </View>
                </Dialog>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    textInput: {
        marginTop: 8,
        marginBottom: 8,
        padding: 8,
        borderWidth: 1,
        borderRadius: 5
    }
});

AddItemButton.propTypes = {
    date: PropTypes.instanceOf(Date),
    handleAddItem: PropTypes.func.isRequired
}
