import React, { Component } from 'react';
import { View, Text, TouchableWithoutFeedback, StyleSheet } from 'react-native';

export default class MonthlyItemHeader extends Component {
    handleClick() {

    }

    render() {
        const {monthItem} = this.props;

        return (
            <View>
                <TouchableWithoutFeedback onPress={this.handleClick}>
                    <View style={[styles.container, styles.detail]}>
                        <View style={styles.sub_detail}>
                            <Text style={styles.bold_text}>⇩</Text>
                            <Text style={styles.bold_text}>{monthItem.month}</Text>
                        </View>
                        <View style={styles.price}>
                            <Text>$</Text>
                            <Text style={styles.priceBox}>{monthItem.totalPrice.toFixed(2)}</Text>
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
        paddingTop: 12,
        backgroundColor: '#f1f1f1'
    },
    detail: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    sub_detail: {
        flexDirection: 'row'
    },
    bold_text: {
        fontWeight: 'bold'
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