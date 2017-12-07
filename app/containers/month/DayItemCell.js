import React, { Component } from 'react';
import { View, Text, TouchableWithoutFeedback, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

export default class DayItemCell extends Component {
    handleClick = () => {
        
    }

    render() {
        const { dayItem } = this.props;

        return (
            <View style={styles.container}>
                <TouchableWithoutFeedback onPress={this.handleClick} >
                    <View>
                        <View style={styles.detail}>
                            <Text style={styles.name}>{dayItem.date.toString()}</Text>
                            <View style={styles.price}>
                                <Text>$</Text>
                                <Text style={styles.priceBox}>{dayItem.totalPrice.toFixed(2)}</Text>
                            </View>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        borderBottomWidth: 1,
        padding: 4,
        paddingBottom: 6,
        paddingTop: 8,
    },
    detail: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    name: {
        flex: -1
    },
    price: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    priceBox: {
        borderWidth: 0.5,
        padding: 2,
        paddingLeft: 4,
        paddingRight: 4,
        marginLeft: 4
    }
});
