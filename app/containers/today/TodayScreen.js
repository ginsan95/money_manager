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
        const {params} = navigation.state;
        if (params != null) {
            return {
                title: 'Today\'s Spending',
                headerRight: (
                    <AddItemButton 
                        handleAddItem={params.handleAddItem}
                        isProcessing={params.isProcessing}
                    />
                )
            }
        }
    }

    componentWillMount() {
        this.props.navigation.setParams({
            handleAddItem: this.props.handleAddItem,
            isProcessing: this.props.api.isProcessing
        });
    }

    componentWillUpdate(nextProps) {
        if (this.props.api.isProcessing !== nextProps.api.isProcessing) {
            this.props.navigation.setParams({
                isProcessing: nextProps.api.isProcessing
            });
        }
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
                    isFetching={this.props.api.isFetching}
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
    api: PropTypes.shape({
        isFetching: PropTypes.bool.isRequired,
        isProcessing: PropTypes.bool.isRequired        
    }),
    handleAddItem: PropTypes.func.isRequired,
    handleItemClick: PropTypes.func.isRequired
}

const mapStateToProps = (state, ownProps) => {
    return state.today;
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        handleAddItem: (item) => {
            dispatch(addItem(item))
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
