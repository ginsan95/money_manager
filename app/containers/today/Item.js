import React, { Component } from 'react';
import { View, Text, TouchableWithoutFeedback, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

export default class Item extends Component {
    handleClick = () => {
        const {id} = item = this.props.item;
        this.props.handleClick(id);
    }

    render() {
        item = this.props.item;

        return (
            <View style={styles.container}>
                <TouchableWithoutFeedback onPress={this.handleClick}>
                    <View>
                        {/* <Text style={styles.date}>{item.date.toMyTimeString()}</Text> */}
                        <View style={styles.detail}>
                            <Text style={styles.name}>{item.name}</Text>
                            <View style={styles.price}>
                                <Text>$</Text>
                                <Text style={styles.priceBox}>{item.price.toFixed(2)}</Text>
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
        paddingBottom: 6,
        marginBottom: 8
    },
    date: {
        fontSize: 10
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

Item.propTypes = {
    item: PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        date: PropTypes.object.isRequired
    }).isRequired,
    handleClick: PropTypes.func.isRequired
}