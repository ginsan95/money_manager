import React, {Component} from 'react';
import { StackNavigator } from 'react-navigation';
import TodayScreen from './TodayScreen';

const Navigator = StackNavigator({
    Home: { screen: TodayScreen }
});

export default class TodayNavigator extends Component {
    static router = Navigator.router;
    render() {
        return(
            <Navigator
                navigation= {this.props.navigation} 
                screenProps={{
                    date: new Date(),
                    namespace: 'today'
                }}/>
        );
    }
}