import { StackNavigator } from 'react-navigation';
import React, { Component } from 'react';
import { View, SectionList, Text } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchItems, toggleExpend } from '../../actions/monthActions';
import MonthlyItemList from './MonthlyItemList';
import { Container } from '../../components/Container';
import MonthItem from '../../models/MonthItem';

export class MonthScreen extends Component {
    static navigationOptions = ({navigation}) => {
        const {params} = navigation.state;
        return {
            title: 'Monthly Spending'
        }
    }

    render() {
        return (
            <Container>
                <MonthlyItemList
                    monthItems={this.props.monthItems}
                    refreshMonthItems={this.props.refreshMonthItems}
                    isFetching={this.props.api.isFetching}
                    handleHeaderClick={this.props.handleHeaderClick}
                />
            </Container>
        );
    }
}

MonthScreen.propTypes = {
    monthItems: PropTypes.arrayOf(
        PropTypes.instanceOf(MonthItem).isRequired
    ).isRequired,
    api: PropTypes.shape({
        isFetching: PropTypes.bool.isRequired
    })
}

const mapStateToProps = (state, ownProps) => {
    return state.month;
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        refreshMonthItems: (date) => {
            dispatch(fetchItems(date));
        },
        handleHeaderClick: (monthItem) => {
            dispatch(toggleExpend(monthItem));
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MonthScreen);
