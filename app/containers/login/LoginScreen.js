import React, { Component } from 'react';
import { View, Text, Image, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { login } from '../../actions/loginActions';
import { ProgressDialog } from 'react-native-simple-dialogs';
import ErrorDialog from '../../components/ErrorDialog';
import ValidationTextInput from '../../components/ValidationTextInput';

class LoginScreen extends Component {
    static navigationOptions = {
        headerStyle: {
            backgroundColor: 'white',
            borderBottomWidth: 0
        }
    }

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            usernameError: null,
            passwordError: null
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps !== this.props) {
            if (this.props.success) {
                this.props.navigation.navigate('App');
            }
        }
    }

    onUsernameChange = (username) => {
        this.setState({
            username,
            usernameError: null
        });
    }

    onPasswordChange = (password) => {
        this.setState({
            password,
            passwordError: null
        });
    }

    handleLogin = () => {
        const {username, password} = this.state;
        if (!username || username.length === 0) {
            this.setState({
                usernameError: 0
            });
        } else if (!password || password.length === 0) {
            this.setState({
                passwordError: 0
            });
        } else {
            this.props.handleLogin(username, password);
        }
    }

    handleSignUp = () => {
        this.props.navigation.navigate('SignUp', {
            handleLogin: this.props.handleLogin
        });
    }

    render() {
        return (
            <View style={styles.container}>
                <Image style={styles.logo} source={require('../../images/app_icon.png')}/>
                <ValidationTextInput 
                    style={styles.textInput}
                    name='Username'
                    onChangeText={this.onUsernameChange}
                    error={this.state.usernameError}/>
                <ValidationTextInput 
                    style={styles.textInput}
                    name='Password'
                    onChangeText={this.onPasswordChange}
                    error={this.state.passwordError}
                    secureTextEntry={true}/>
                <View style={styles.button}>
                    <Button 
                        title='Login'
                        color='white'
                        onPress={this.handleLogin}/>
                </View>
                <TouchableOpacity style={styles.subButton} onPress={this.handleSignUp}>
                    <Text>Sign Up</Text>
                </TouchableOpacity>
                <ProgressDialog
                    visible={this.props.isProcessing} 
                    message="Logging In..." />
                <ErrorDialog
                    visible={!this.props.isProcessing && !this.props.success}
                    error={this.props.error} />
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

LoginScreen.propTypes = {
    isProcessing: PropTypes.bool.isRequired,
    success: PropTypes.bool.isRequired
}

const mapStateToProps = (state, ownProps) => {
    return state.login.login;
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        handleLogin: (username, password) => {
            dispatch(login(username, password));
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LoginScreen);