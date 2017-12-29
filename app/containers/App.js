import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import rootReducer from '../reducers';
import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'
import { StackNavigator } from 'react-navigation';

import LoginScreen from './login/LoginScreen';
import AppNavigator from './AppNavigator';
import '../ObjectsExtension';
import LoginNavigator from './login/LoginNavigator';


const loggerMiddleware = createLogger()
const store = createStore(
    rootReducer,
    applyMiddleware(thunkMiddleware, loggerMiddleware)
);

const Navigator = StackNavigator(
    {
        Home: { screen: LoginNavigator },
        App: { screen: AppNavigator },
    },
    {
        headerMode: 'none'
    }
);

export default class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <Navigator />
            </Provider>
        );
    }
}
App.router = AppNavigator.router;