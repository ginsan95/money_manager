import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';
import { Container } from 'components/Container';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addItem, deleteItem, fetchItems } from 'actions/todayActions';
import ItemList from './ItemList';
import AddItemButton from './AddItemButton';

class TodayScreen extends Component {
    static navigationOptions = ({navigation}) => {
        if (navigation.state.params != null) {
            return {
                title: 'Today\'s Spending',
                headerRight: (
                    <AddItemButton handleAddItem={navigation.state.params.handleAddItem}/>
                )
            }
        }
    }

    componentWillMount() {
        this.props.navigation.setParams({
            handleAddItem: this.props.handleAddItem
        });
    }

    calculateTotal = () => {
        let total = 0;
        const {items} = this.props;
        items.forEach((item) => total += item.price);
        return total;
    }

    render() {
        const date = new Date();
        
        return (
            <Container>
                <Text>Date: {date.toDateString()}</Text>
                <ItemList 
                    items={this.props.items} 
                    handleItemClick={this.props.handleItemClick} 
                    refreshItems={this.props.refreshItems}
                    isFetching={this.props.isFetching}
                />
                <Text>Total: ${this.calculateTotal()}</Text>
            </Container>
        );
    }
}

TodayScreen.propTypes = {
    items: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
            price: PropTypes.number.isRequired,
            date: PropTypes.object.isRequired
        }).isRequired
    ).isRequired,
    isFetching: PropTypes.bool.isRequired,
    handleAddItem: PropTypes.func.isRequired,
    handleItemClick: PropTypes.func.isRequired
}

const mapStateToProps = state => {
    return {
        items: state.today.items,
        isFetching: state.today.isFetching
    }
}

const mapDispatchToProps = dispatch => {
    return {
        handleAddItem: (name, price, date) => {
            dispatch(addItem(name, price, date))
        },
        handleItemClick: (id) => {
            dispatch(deleteItem(id));
        },
        refreshItems: () => {
            dispatch(fetchItems());
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TodayScreen);
