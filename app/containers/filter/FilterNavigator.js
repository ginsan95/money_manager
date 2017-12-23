import { StackNavigator } from 'react-navigation';
import FilterScreen from './FilterScreen';
import TodayScreen from '../today/TodayScreen';

export default StackNavigator({
    Home: { screen: FilterScreen },
    Day: { screen: TodayScreen }
});