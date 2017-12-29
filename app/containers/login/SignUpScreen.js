import React, { Component } from 'react';
import { View, Text, Image, TextInput, Button, StyleSheet } from 'react-native';

export default class SignUpScreen extends Component {
    static navigationOptions = {
        headerStyle: {
            backgroundColor: 'white',
            borderBottomWidth: 0
        }
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
                <TextInput
                    style={styles.textInput}
                    placeholder='Confirm Password'/>
                <View style={styles.button}>
                    <Button 
                        title='Sign Up'
                        color='white'
                        onPress={() => {}}/>
                </View>
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
    }
});