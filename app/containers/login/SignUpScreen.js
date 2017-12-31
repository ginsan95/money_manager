import React, { Component } from 'react';
import { View, Text, Image, TextInput, Button, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { signUp, resetData } from '../../actions/loginActions';
import { ProgressDialog } from 'react-native-simple-dialogs';
import ErrorDialog from '../../components/ErrorDialog';

class SignUpScreen extends Component {
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
            confirmPassword: ''
        }
        props.handleResetData();
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps !== this.props) {
            if (this.props.success) {
                const {navigation} = this.props;
                if (navigation.state.params && navigation.state.params.handleLogin) {
                    navigation.state.params.handleLogin(this.state.username, this.state.password);
                }
                navigation.goBack();
            }
        }
    }

    onUsernameChange = (username) => {
        this.setState({username});
    }

    onPasswordChange = (password) => {
        this.setState({password});
    }

    onConfirmPasswordChange = (confirmPassword) => {
        this.setState({confirmPassword});
    }

    handleSignUp = () => {
        const {username, password, confirmPassword} = this.state;
        if (password === confirmPassword) {
            this.props.handleSignUp(username, password);
        } else {
            
        }
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
                <TextInput
                    style={styles.textInput}
                    placeholder='Confirm password'
                    onChangeText={this.onConfirmPasswordChange}
                    secureTextEntry={true} />
                <View style={styles.button}>
                    <Button 
                        title='Sign Up'
                        color='white'
                        onPress={this.handleSignUp}/>
                </View>
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
    }
});

SignUpScreen.propTypes = {
    isProcessing: PropTypes.bool.isRequired,
    success: PropTypes.bool.isRequired
}

const mapStateToProps = (state, ownProps) => {
    return state.login.signUp;
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        handleSignUp: (username, password) => {
            dispatch(signUp(username, password));
        },
        handleResetData: () => {
            dispatch(resetData());
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SignUpScreen);