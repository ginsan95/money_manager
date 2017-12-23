import { StackNavigator } from 'react-navigation';
import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Container } from '../../components/Container';
import { ProgressDialog } from 'react-native-simple-dialogs';
import FilterList from './FilterList';

export default class FilterScreen extends Component {
    static navigationOptions = ({navigation}) => {
        return {
            title: 'Filtering'
        }
    }

    render() {
        return (
            <Container>
                <FilterList
                    dayItems={[]}/>
            </Container>
        );
    }
}
