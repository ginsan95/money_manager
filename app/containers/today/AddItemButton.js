import React, { Component } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { Dialog } from 'react-native-simple-dialogs';
import PropTypes from 'prop-types';
import DateTimePicker from 'react-native-modal-datetime-picker';

const NAME_PLACEHOLDER = 'Name';
const NAME_ERROR_PLACEHOLDER = 'Name cannot be empty';
const PRICE_PLACEHOLDER = 'Price';
const PRICE_ERROR_PLACEHOLDER = 'Price cannot be empty';

export default class AddItemButton extends Component {
    initialState = () => {
        return {
            name: '',
            price: '',
            date: new Date(),
            namePlaceholder: NAME_PLACEHOLDER,
            pricePlaceHolder: PRICE_PLACEHOLDER,
            datePickerVisible: false
        }
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
            namePlaceholder: NAME_PLACEHOLDER
        });
    }

    handlePriceChange = (text) => {
        this.setState({
            price: text,
            pricePlaceHolder: PRICE_PLACEHOLDER
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
                namePlaceholder: NAME_ERROR_PLACEHOLDER
            });
        } else if (!price || price.length === 0) {
            this.setState({
                pricePlaceHolder: PRICE_ERROR_PLACEHOLDER
            });
        } else {
            this.props.handleAddItem(name, parseFloat(price, 0), date);
            this.setState({
                dialogVisible: false
            });
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
                        <TextInput 
                            placeholder={this.state.namePlaceholder} 
                            style={styles.textInput}
                            onChangeText={this.handleNameChange}
                            autoFocus={true} 
                            placeholderTextColor={this.state.namePlaceholder === NAME_PLACEHOLDER ? 'grey' : 'red'}/>
                        <TextInput 
                            placeholder={this.state.pricePlaceHolder} 
                            style={styles.textInput} 
                            onChangeText={this.handlePriceChange} 
                            keyboardType="numeric"
                            placeholderTextColor={this.state.pricePlaceHolder === PRICE_PLACEHOLDER ? 'grey' : 'red'}/>
                        <TextInput
                            ref={(input) => {this.dateInput = input}}
                            style={styles.textInput}
                            value={this.state.date ? this.state.date.toMyTimeString() : ''}
                            onFocus={this.handleShowDatePicker}/>
                        <DateTimePicker
                            isVisible={this.state.datePickerVisible}
                            onConfirm={this.handleSelectDate}
                            onCancel={this.handleDismissDatePicker}
                            mode='time'/>
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
    handleAddItem: PropTypes.func.isRequired
}
