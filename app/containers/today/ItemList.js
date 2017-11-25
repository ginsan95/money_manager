import React, { Component } from 'react';
import { View, Text, FlatList, Button } from 'react-native';
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
            />
        );
    }
}

ItemList.propTypes = {
    items: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            name: PropTypes.string.isRequired,
            price: PropTypes.number.isRequired
        }).isRequired
    ).isRequired,
    handleItemClick: PropTypes.func.isRequired
}

export default connect()(ItemList);