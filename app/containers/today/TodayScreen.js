import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';
import { Container } from 'components/Container';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addItem, deleteItem } from 'actions/todayActions';
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
                <ItemList items={this.props.items} handleItemClick={this.props.handleItemClick}/>
                <Text>Total: ${this.calculateTotal()}</Text>
            </Container>
        );
    }
}

TodayScreen.propTypes = {
    items: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            name: PropTypes.string.isRequired,
            price: PropTypes.number.isRequired
        }).isRequired
    ).isRequired,
    handleAddItem: PropTypes.func.isRequired,
    handleItemClick: PropTypes.func.isRequired
}

const mapStateToProps = state => {
    return {
        items: state.today.items
    }
}

const mapDispatchToProps = dispatch => {
    return {
        handleAddItem: (name, price) => {
            dispatch(addItem(name, price))
        },
        handleItemClick: (id) => {
            dispatch(deleteItem(id));
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TodayScreen);
