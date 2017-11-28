import React, { Component } from 'react';
import { Image } from 'react-native';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import rootReducer from 'reducers';
import { TabNavigator } from 'react-navigation';
import TodayNavigator from './today/TodayNavigator';
import { MonthNavigator } from './month/MonthScreen';
import { FilterNavigator } from './filter/FilterScreen';
import 'ObjectsExtension';

const AppNavigator = TabNavigator({
        Today: { 
            screen: TodayNavigator,
            navigationOptions: {
                tabBarLabel: 'Today',
                tabBarIcon: ({ tintColor }) => (
                    <Image
                      source={require('images/ic_clock.png')}
                      style={[{tintColor: tintColor}]}
                    />
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
        animationEnabled: true,
        swipeEnabled: false,
        tabBarOptions: {
            showIcon: true
        }
    }
);

const store = createStore(rootReducer);

export default class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <AppNavigator />
            </Provider>
        );
    }
}
App.router = AppNavigator.router;