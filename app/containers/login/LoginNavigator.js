import { StackNavigator } from 'react-navigation';
import LoginScreen from './LoginScreen';
import SignUpScreen from './SignUpScreen';

export default StackNavigator({
    Home: { screen: LoginScreen },
    SignUp: { screen: SignUpScreen } 
});