import React, { Component } from 'react';
import { View, Text, SectionList, Button, StyleSheet } from 'react-native';
import PropTypes from 'prop-types'
import DayItemCell from './DayItemCell';
import MonthlyItemHeader from './MonthlyItemHeader';
import { connect } from 'react-redux';
import Item from '../../models/Item';
import MonthItem from '../../models/MonthItem';

export default class MonthlyItemList extends Component {
    componentDidMount() {
        this.refreshMonthItems();
    }

    refreshMonthItems = () => {
        const today = new Date();
        const date = new Date("01/01/" + today.getFullYear());
        this.props.refreshMonthItems(date);
    }

    render() {
        return (
            <SectionList
                sections={this.props.monthItems}
                renderItem={({item}) =>
                     <DayItemCell dayItem={item}/>
                }
                renderSectionHeader={({section}) => 
                    <MonthlyItemHeader monthItem={section}/>
                }
                keyExtractor={(item, index) => index}
                stickySectionHeadersEnabled={true}
                onRefresh={this.refreshMonthItems}
                refreshing={this.props.isFetching}
                style={styles.container}
            />
        );
    }
}

const styles = StyleSheet.create({
    container: {
        marginTop: 8,
        marginBottom: 8
    }
});

MonthlyItemList.propTypes = {
    monthItems: PropTypes.arrayOf(
        PropTypes.instanceOf(MonthItem).isRequired
    ).isRequired,
    isFetching: PropTypes.bool.isRequired,
    refreshMonthItems: PropTypes.func.isRequired
}