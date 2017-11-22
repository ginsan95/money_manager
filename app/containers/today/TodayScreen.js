import { StackNavigator } from 'react-navigation';
import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';
import { Container } from 'components/Container';

export class TodayScreen extends Component {
    static navigationOptions = {
        title: 'Today\'s Spending'
    }
    
    render() {
        let date = new Date();

        return (
            <Container>
                <Text>Date: {date.toDateString()}</Text>
            </Container>
        );
    }
}

export const TodayNavigator = StackNavigator({
    Home: { screen: TodayScreen }
});