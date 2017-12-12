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
        this.props.refreshMonthItems(this.props.year);
    }

    render() {
        return (
            <SectionList
                sections={this.props.monthItems}
                renderItem={({item, section}) =>
                     <DayItemCell dayItem={item} isExpended={section.isExpended}/>
                }
                renderSectionHeader={({section}) => 
                    <MonthlyItemHeader monthItem={section}
                        handleClick={this.props.handleHeaderClick}/>
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
    refreshMonthItems: PropTypes.func.isRequired,
    handleHeaderClick: PropTypes.func.isRequired,
    year: PropTypes.string.isRequired    
}
