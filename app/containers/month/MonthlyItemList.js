import React, { Component } from 'react';
import { View, Text, SectionList, Button, StyleSheet } from 'react-native';
import PropTypes from 'prop-types'
import DayItemCell from './DayItemCell';
import { connect } from 'react-redux';
import Item from '../../models/Item';

const haha = [
    {month: 'January', data: [
        {date: new Date(), totalPrice: 100, items:[
            {name: 'a', date: new Date(), price: 20},
            {name: 'a', date: new Date(), price: 20},
            {name: 'a', date: new Date(), price: 20}
        ]},
        {date: new Date(), totalPrice: 100, items:[
            {name: 'a', date: new Date(), price: 20},
            {name: 'a', date: new Date(), price: 20},
            {name: 'a', date: new Date(), price: 20}
        ]}
    ]},
    {month: 'February', data: [
        {date: new Date(), totalPrice: 100, items:[
            {name: 'a', date: new Date(), price: 20},
            {name: 'a', date: new Date(), price: 20},
            {name: 'a', date: new Date(), price: 20}
        ]},
        {date: new Date(), totalPrice: 100, items:[
            {name: 'a', date: new Date(), price: 20},
            {name: 'a', date: new Date(), price: 20},
            {name: 'a', date: new Date(), price: 20}
        ]}
    ]}
]

export default class MonthlyItemList extends Component {
    sortItems() {
        return this.props.items.sort((item1, item2) => {
            return item1.date.getTime() > item2.date.getTime();
        });
    }

    render() {
        return (
            <SectionList
                sections={haha}
                renderItem={({item}) =>
                     <DayItemCell dayItem={item}/>
                }
                renderSectionHeader={({section}) => 
                    <Text>{section.month}</Text>
                }
                keyExtractor={(item, index) => index}
                stickySectionHeadersEnabled={true}
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

