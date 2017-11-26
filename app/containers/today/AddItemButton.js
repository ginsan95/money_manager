import React, { Component } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import { Dialog } from 'react-native-simple-dialogs';
import PropTypes from 'prop-types';

export default class AddItemButton extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            price: 0,
            dialogVisible: false
        }
    }

    handleNameChange = (text) => {
        this.setState({
            name: text
        });
    }

    handlePriceChange = (text) => {
        this.setState({
            price: text
        });
    }

    handleShowDialog = () => {
        this.setState({
            dialogVisible: true
        });
    }

    handleAddItem = () => {
        let {name, price} = this.state;
        this.props.handleAddItem(name, parseInt(price, 0));
        this.setState({
            dialogVisible: false
        });
    }

    render() {
        return (
            <View>
                <Button title='+' onPress={this.handleShowDialog}/>
                <Dialog
                    visible={this.state.dialogVisible} 
                    title="Add Item"
                    onTouchOutside={() => this.setState({dialogVisible: false})} >
                    <View>
                        <TextInput onChangeText={this.handleNameChange}/>
                        <TextInput onChangeText={this.handlePriceChange} keyboardType='numeric'/>
                        <Button title='Add' onPress={this.handleAddItem}/>
                    </View>
                </Dialog>
            </View>
        );
    }
}

AddItemButton.propTypes = {
    handleAddItem: PropTypes.func.isRequired
}