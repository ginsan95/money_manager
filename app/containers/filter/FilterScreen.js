import { StackNavigator } from 'react-navigation';
import React, { Component } from 'react';
import { View } from 'react-native';

export default class FilterScreen extends Component {
    render() {
        return (
            <View/>
        );
    }
}

export const FilterNavigator = StackNavigator({
    Home: { screen: FilterScreen }
});