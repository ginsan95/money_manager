import React, { Component } from 'react';
import { View, Text, TouchableWithoutFeedback, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import Item from '../../models/Item';

export default class ItemCell extends Component {
    handleClick = () => {
        const {id} = item = this.props.item;
        if (this.props.isEditing) {
            this.props.handleLongClick(id);
        }
    }

    handleLongClick = () => {
        const {id} = item = this.props.item;
        this.props.handleLongClick(id);
    }

    getViewStyle() {
        if (this.props.isEditing && this.props.item.isSelected) {
            return [styles.container, styles.selected];
        } else {
            return styles.container;
        }
    }

    render() {
        const item = this.props.item;

        return (
            <View style={this.getViewStyle()}>
                <TouchableWithoutFeedback onPress={this.handleClick} onLongPress={this.handleLongClick}>
                    <View>
                        <Text style={styles.date}>{item.date.toMyTimeString()}</Text>
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
        padding: 4,
        paddingBottom: 6,
        paddingTop: 8,
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
    },
    selected: {
        backgroundColor: '#4da3ff'
    }
});

ItemCell.propTypes = {
    item: PropTypes.instanceOf(Item).isRequired,
    handleLongClick: PropTypes.func.isRequired,
    isEditing: PropTypes.bool.isRequired 
}