import { StackNavigator } from 'react-navigation';
import React, { Component } from 'react';
import { View, Button, Picker } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchItems, toggleExpend, changeYear } from '../../actions/monthActions';
import MonthlyItemList from './MonthlyItemList';
import { Container } from '../../components/Container';
import MonthItem from '../../models/MonthItem';
import SelectedYearHeader from './SelectedYearHeader';

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
                <SelectedYearHeader 
                    year={this.props.year}
                    handleChangeYear={this.props.handleChangeYear}
                    refreshMonthItems={this.props.refreshMonthItems} />
                <MonthlyItemList
                    monthItems={this.props.monthItems}
                    refreshMonthItems={this.props.refreshMonthItems}
                    isFetching={this.props.api.isFetching}
                    handleHeaderClick={this.props.handleHeaderClick}
                    year={this.props.year}
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
    }),
    year: PropTypes.string.isRequired
}

const mapStateToProps = (state, ownProps) => {
    return state.month;
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        refreshMonthItems: (year) => {           
            dispatch(fetchItems(year));
        },
        handleHeaderClick: (monthItem) => {
            dispatch(toggleExpend(monthItem));
        },
        handleChangeYear: (year) => {
            dispatch(changeYear(year));
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MonthScreen);
