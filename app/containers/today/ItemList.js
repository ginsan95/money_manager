import React, { Component } from 'react';
import { View, Text, FlatList, Button, StyleSheet } from 'react-native';
import PropTypes from 'prop-types'
import Item from './Item';
import { connect } from 'react-redux';

class ItemList extends Component {
    render() {
        return (
            <FlatList
                data={this.props.items}
                renderItem={
                    ({item}) => <Item item={item} handleClick={this.props.handleItemClick}/>
                }
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

ItemList.propTypes = {
    items: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            name: PropTypes.string.isRequired,
            price: PropTypes.number.isRequired,
            date: PropTypes.object.isRequired
        }).isRequired
    ).isRequired,
    handleItemClick: PropTypes.func.isRequired
}

export default connect()(ItemList);