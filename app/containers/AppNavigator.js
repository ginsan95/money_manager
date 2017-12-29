import React from 'react';
import { Image } from 'react-native';
import { TabNavigator } from 'react-navigation';
import TodayNavigator from './today/TodayNavigator';
import MonthNavigator from './month/MonthNavigator';
import FilterNavigator from './filter/FilterNavigator';

export default AppNavigator = TabNavigator({
    Today: { 
        screen: TodayNavigator,
        navigationOptions: {
            tabBarLabel: 'Today',
            tabBarIcon: ({ tintColor }) => (
                <Image
                  source={require('../images/ic_clock.png')}
                  style={[{tintColor: tintColor}]}
                />
            )
        }
    },
    Month: { 
        screen: MonthNavigator,
        navigationOptions: {
            tabBarLabel: 'Month',
            tabBarIcon: ({ tintColor }) => (
                <Image
                  source={require('../images/ic_calendar.png')}
                  style={[{tintColor: tintColor}]}
                />
            )
        }
    },
    Filter: {
        screen: FilterNavigator,
        navigationOptions: {
            tabBarLabel: 'Filter',
            tabBarIcon: ({ tintColor }) => (
                <Image
                  source={require('../images/ic_filter.png')}
                  style={[{tintColor: tintColor}]}
                />
            )
        }
    }
},
{
    tabBarPosition: 'bottom',
    animationEnabled: true,
    swipeEnabled: false,
    tabBarOptions: {
        showIcon: true
    }
});