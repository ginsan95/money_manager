import React, { Component } from 'react';
import { View, Text, TouchableWithoutFeedback } from 'react-native';
import PropTypes from 'prop-types'

export default class Item extends Component {
    handleClick = () => {
        const {id} = item = this.props.item;
        this.props.handleClick(id);
    }

    render() {
        item = this.props.item;

        return (
            <TouchableWithoutFeedback onPress={this.handleClick}>
                <View>
                    <Text>Name: {item.name}</Text>
                    <Text>Price: {item.price}</Text>
                </View>
            </TouchableWithoutFeedback>
        );
    }
}

Item.propTypes = {
    item: PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired
    }).isRequired,
    handleClick: PropTypes.func.isRequired
}