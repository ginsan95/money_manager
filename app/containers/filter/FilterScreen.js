import { StackNavigator } from 'react-navigation';
import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Container } from '../../components/Container';
import { ProgressDialog } from 'react-native-simple-dialogs';
import FilterList from './FilterList';
import DayItem from '../../models/DayItem';
import { fetchItems, changeDate } from '../../actions/filterActions';

export class FilterScreen extends Component {
    static navigationOptions = ({navigation}) => {
        return {
            title: 'Filtering'
        }
    }

    gotoDayScreen = (items) => {
        this.props.navigation.navigate(
            'Day', {
                items,
                namespace: 'filter',
                isFirstTime: true
            }
        )
    }

    render() {
        return (
            <Container>
                <FilterList
                    dayItems={this.props.dayItems}
                    dates={this.props.dates}
                    handleFilterItems={this.props.handleFilterItems}
                    handleItemClick={this.gotoDayScreen}
                    handleChangeDate={this.props.handleChangeDate} />
                <ProgressDialog 
                    visible={this.props.api.isFetching} 
                    message="Fetching..." />
            </Container>
        );
    }
}

FilterScreen.propTypes = {
    dayItems: PropTypes.arrayOf(
        PropTypes.instanceOf(DayItem).isRequired
    ).isRequired,
    api: PropTypes.shape({
        isFetching: PropTypes.bool.isRequired
    })
}

const mapStateToProps = (state, ownProps) => {
    return state.filter;
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        handleFilterItems: (startDate, endDate) => {           
            dispatch(fetchItems(startDate, endDate));
        },
        handleChangeDate: (namespace, date) => {
            dispatch(changeDate(namespace, date));
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(FilterScreen);
