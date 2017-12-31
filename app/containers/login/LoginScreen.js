import React, { Component } from 'react';
import { View, Text, Image, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { login } from '../../actions/loginActions';
import { ProgressDialog } from 'react-native-simple-dialogs';
import ErrorDialog from '../../components/ErrorDialog';

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
            password: ''
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
        this.setState({username});
    }

    onPasswordChange = (password) => {
        this.setState({password});
    }

    handleLogin = () => {
        this.props.handleLogin(this.state.username, this.state.password);
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
                <TextInput
                    style={styles.textInput}
                    placeholder='Username'
                    onChangeText={this.onUsernameChange} />
                <TextInput
                    style={styles.textInput}
                    placeholder='Password'
                    onChangeText={this.onPasswordChange}
                    secureTextEntry={true} />
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