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
import AddDayButton from './AddDayButton';

export class MonthScreen extends Component {
    static navigationOptions = ({navigation}) => {
        const {params} = navigation.state;
        let options = {
            title: 'Monthly Spending'
        };
        if (params && params.handleAddDay) {
            options.headerRight = (<AddDayButton handleAddDay={params.handleAddDay}/>);
        }
        return options;
    }

    componentWillMount() {
        this.props.navigation.setParams({
            handleAddDay: this.handleAddDay
        });
    }

    gotoDayScreen = (items) => {
        this.props.navigation.navigate(
            'Day', {
                items,
                namespace: 'month',
                isFirstTime: true
            }
        )
    }

    handleAddDay = (date) => {
        let monthItem = this.props.monthItems[date.getMonth()];
        let dayItem = monthItem.findSameDayItem(date);
        this.props.navigation.navigate(
            'Day', {
                items: dayItem ? dayItem.items : [],
                date,
                namespace: 'month',
                isFirstTime: true
            }
        )
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
                    handleItemClick={this.gotoDayScreen}
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
