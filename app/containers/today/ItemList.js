import React, { Component } from 'react';
import { View, Text, FlatList, Button, StyleSheet } from 'react-native';
import PropTypes from 'prop-types'
import ItemCell from './ItemCell';
import { connect } from 'react-redux';
import Item from '../../models/Item';

class ItemList extends Component {
    sortItems() {
        return this.props.items.sort((item1, item2) => {
            return item1.date.getTime() > item2.date.getTime();
        });
    }

    componentDidMount() {
        this.props.refreshItems();
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
                onRefresh={this.props.refreshItems}
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

export default connect()(ItemList);