import { StackNavigator } from 'react-navigation';
import MonthScreen from './MonthScreen';
import TodayScreen from '../today/TodayScreen';

export default StackNavigator({
    Month: { screen: MonthScreen },
    Day: { screen: TodayScreen }
});