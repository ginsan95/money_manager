import { StackNavigator } from 'react-navigation';
import React, { Component } from 'react';
import { View, SectionList, Text } from 'react-native';
import MonthlyItemList from './MonthlyItemList';
import { Container } from '../../components/Container';

export default class MonthScreen extends Component {
    static navigationOptions = ({navigation}) => {
        const {params} = navigation.state;
        if (params != null) {
            return {
                title: 'Monthly Spending'
            }
        }
    }

    render() {
        return (
            <Container>
                <MonthlyItemList
                />
            </Container>
        );
    }
}
