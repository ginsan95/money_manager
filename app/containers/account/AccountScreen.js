import React, { Component } from 'react';
import { View, Button } from 'react-native';
import { Container } from '../../components';
import { NavigationActions } from 'react-navigation'
import UserManager from '../../managers/UserManager';
import { logout } from '../../api/API';


export default class AccountScreen extends Component {
    static navigationOptions = ({navigation}) => {
        return {
            title: 'Account'
        }
    }

    handleLogout = () => {
        // call logout API
        logout()
            .catch(e => console.log(e))
        // clear data
        UserManager.getInstance().resetData();
        // redirect back to login page
        const resetAction = NavigationActions.reset({
            index: 0,
            key: null,
            actions: [
                NavigationActions.navigate({ routeName: 'Home'})
            ]
        })
        this.props.navigation.dispatch(resetAction);        
    }

    render() {
        return (
            <Container>
                <Button
                    title='Logout'
                    onPress={this.handleLogout} />
            </Container>
        );
    }
}