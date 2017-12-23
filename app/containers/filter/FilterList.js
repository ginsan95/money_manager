import React, { Component } from 'react';
import { View, Text, FlatList, Button, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import DayItemCell from '../common/DayItemCell';
import DayItem from '../../models/DayItem';
import FilterHeader from './FilterHeader';

export default class FilterList extends Component {
    render() {
        return(
            <FlatList
                data={this.props.dayItems}
                renderItem={({dayItem}) => 
                    <DayItemCell 
                        dayItem={dayItem}
                        isExpended={true}
                        handleClick={this.props.handleItemClick}/>
                }
                ListHeaderComponent={<FilterHeader/>}
                keyExtractor={(item, index) => index}
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

FilterList.propTypes = {
    dayItems: PropTypes.arrayOf(
        PropTypes.instanceOf(DayItem).isRequired
    ).isRequired
}