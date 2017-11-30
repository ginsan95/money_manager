import React, { Component } from 'react';
import { View, Text, FlatList, Button, StyleSheet } from 'react-native';
import PropTypes from 'prop-types'
import Item from './Item';
import { connect } from 'react-redux';

class ItemList extends Component {
    sortItems() {
        return this.props.items.sort((item1, item2) => {
            return item1.date.getTime() > item2.date.getTime();
        });
    }

    render() {
        return (
            <FlatList
                data={this.sortItems()}
                renderItem={
                    ({item}) => <Item item={item} handleClick={this.props.handleItemClick}/>
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
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
            price: PropTypes.number.isRequired,
            date: PropTypes.object.isRequired
        }).isRequired
    ).isRequired,
    isFetching: PropTypes.bool.isRequired,
    handleItemClick: PropTypes.func.isRequired
}

export default connect()(ItemList);