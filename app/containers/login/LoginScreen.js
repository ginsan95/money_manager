import React, { Component } from 'react';
import { View, Text, Image, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';

export default class LoginScreen extends Component {
    static navigationOptions = {
        headerStyle: {
            backgroundColor: 'white',
            borderBottomWidth: 0
        }
    }

    handleLogin = () => {
        this.props.navigation.navigate('App');
    }

    handleSignUp = () => {
        this.props.navigation.navigate('SignUp');
    }

    render() {
        return (
            <View style={styles.container}>
                <Image style={styles.logo} source={require('../../images/app_icon.png')}/>
                <TextInput
                    style={styles.textInput}
                    placeholder='Username'/>
                <TextInput
                    style={styles.textInput}
                    placeholder='Password'/>
                <View style={styles.button}>
                    <Button 
                        title='Login'
                        color='white'
                        onPress={this.handleLogin}/>
                </View>
                <TouchableOpacity style={styles.subButton} onPress={this.handleSignUp}>
                    <Text>Sign Up</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flex: 1,
        alignItems: 'center'
    },
    logo: {
        height: '20%',
        width: '20%'
    },
    textInput: {
        width: '80%',
        textAlign: 'center',
        marginTop: 8,
        marginBottom: 8,
        padding: 8,
        paddingLeft: 16,
        paddingRight: 16,
        borderWidth: 0.5,
        borderRadius: 20
    },
    button: {
        borderRadius: 20,
        width: '80%',
        marginTop: 8,
        marginBottom: 8,
        backgroundColor: 'skyblue',
        overflow: 'hidden'
    },
    subButton: {
        margin: 8
    }
});