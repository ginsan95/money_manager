import React, { Component } from 'react';
import { View, Text, FlatList, Button, StyleSheet } from 'react-native';
import PropTypes from 'prop-types'
import ItemCell from './ItemCell';
import { connect } from 'react-redux';
import Item from '../../models/Item';

export default class ItemList extends Component {
    componentDidMount() {
        if (this.props.items.length == 0) {
            this.handleRefreshItems();
        }
    }

    handleRefreshItems = () => {
        this.props.refreshItems(this.props.date);
    }

    sortItems = () => {
        return this.props.items.sort((item1, item2) => {
            return item1.date.getTime() > item2.date.getTime();
        });
    }

    render() {
        return (
            <FlatList
                data={this.sortItems()}
                renderItem={
                    ({item}) => <ItemCell 
                        item={item} 
                        handleLongClick={this.props.handleLongSelectItem}
                        isEditing={this.props.isEditing}
                    />
                }
                keyExtractor={(item, index) => index}
                onRefresh={this.handleRefreshItems}
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

ItemList.propTypes = {
    items: PropTypes.arrayOf(
        PropTypes.instanceOf(Item).isRequired
    ).isRequired,
    isFetching: PropTypes.bool.isRequired,
    isEditing: PropTypes.bool.isRequired
}
