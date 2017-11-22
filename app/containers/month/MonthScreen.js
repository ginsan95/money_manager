import { StackNavigator } from 'react-navigation';
import React, { Component } from 'react';
import { View } from 'react-native';

export class MonthScreen extends Component {
    render() {
        return (
            <View/>
        );
    }
}

export const MonthNavigator = StackNavigator({
    Home: { screen: MonthScreen }
});