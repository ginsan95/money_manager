import { StackNavigator } from 'react-navigation';
import MonthScreen from './MonthScreen';
import TodayScreen from '../today/TodayScreen';

export default StackNavigator({
    Home: { screen: MonthScreen },
    Day: { screen: TodayScreen }
});