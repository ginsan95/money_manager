import { StackNavigator } from 'react-navigation';
import FilterScreen from './FilterScreen';
import TodayScreen from '../today/TodayScreen';

export default StackNavigator({
    Filter: { screen: FilterScreen },
    Day: { screen: TodayScreen }
});