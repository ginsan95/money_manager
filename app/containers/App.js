import React, { Component } from 'react';
import { Image } from 'react-native';
import { TabNavigator } from 'react-navigation';
import { TodayNavigator } from './today/TodayScreen';
import { MonthNavigator } from './month/MonthScreen';
import { FilterNavigator } from './filter/FilterScreen';

const App = TabNavigator({
        Today: { 
            screen: TodayNavigator,
            navigationOptions: {
                tabBarLabel: 'Today',
                tabBarIcon: ({ tintColor }) => (
                    <Image
                      source={require('images/ic_clock.png')}
                      style={[{tintColor: tintColor}]}/>
                )
            }
        },
        Month: { 
            screen: MonthNavigator 
        },
        Filter: { 
            screen: FilterNavigator 
        }
    },
    {
        tabBarPosition: 'bottom',
         animationEnabled: true
    }
);
export default () => <App />;
