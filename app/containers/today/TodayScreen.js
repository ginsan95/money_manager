import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';
import { Container } from 'components/Container';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addItem, deleteItems, fetchItems, longSelectItem, dismissEditing } from 'actions/todayActions';
import ItemList from './ItemList';
import AddItemButton from './AddItemButton';
import { ProgressDialog } from 'react-native-simple-dialogs';
import Item from '../../models/Item';

class TodayScreen extends Component {
    static navigationOptions = ({navigation}) => {
        const {params} = navigation.state;
        if (params != null) {
            let options = {
                title: 'Today\'s Spending'
            }
            if (params.handleAddItem || params.handleDismissEditing) {
                options.headerRight = (
                    <View>
                        {!params.isEditing && <AddItemButton date={params.date} handleAddItem={params.handleAddItem} />}
                        {params.isEditing && <Button title='Cancel' onPress={params.handleDismissEditing}/>}
                    </View>
                )
            }
            if (params.isEditing) {
                options.headerLeft = (
                    <Button title='Delete' onPress={params.handleDeleteItems}/>
                );
            }
            return options;
        }
    }

    componentWillMount() {
        this.props.navigation.setParams({
            date: this.props.date,
            handleAddItem: this.props.handleAddItem,
            isEditing: this.props.api.isEditing,
            handleDismissEditing: this.props.handleDismissEditing,
            handleDeleteItems: this.handleDeleteItems
        });
    }

    componentWillUpdate(nextProps) {
        if (nextProps.api.isEditing != this.props.api.isEditing) {
            this.props.navigation.setParams({
                isEditing: nextProps.api.isEditing
            })
        }
    }

    handleDeleteItems = () => {
        const ids = this.props.items.filter(item => {
            return item.isSelected;
        }).map(item => {
            return item.id;
        });
        this.props.handleDeleteItems(ids);
    }

    calculateTotal = () => {
        let total = 0;
        const {items} = this.props;
        items.forEach((item) => total += item.price);
        return total;
    }

    render() {
        return (
            <Container>
                <Text>Date: {this.props.date.toMyDateString()}</Text>
                <ItemList 
                    items={this.props.items} 
                    handleItemClick={this.props.handleItemClick} 
                    refreshItems={this.props.refreshItems}
                    isFetching={this.props.api.isFetching}
                    handleLongSelectItem={this.props.handleLongSelectItem}
                    isEditing={this.props.api.isEditing}
                />
                <Text>Total: ${this.calculateTotal().toFixed(2)}</Text>
                <ProgressDialog 
                    visible={this.props.api.isProcessing} 
                    message="Processing..."
                />
            </Container>
        );
    }
}

TodayScreen.propTypes = {
    items: PropTypes.arrayOf(
        PropTypes.instanceOf(Item).isRequired
    ).isRequired,
    api: PropTypes.shape({
        isFetching: PropTypes.bool.isRequired,
        isProcessing: PropTypes.bool.isRequired,
        isEditing: PropTypes.bool.isRequired
    }),
    date: PropTypes.instanceOf(Date),
    handleAddItem: PropTypes.func.isRequired,
    handleDeleteItems: PropTypes.func.isRequired
}

const mapStateToProps = (state, ownProps) => {
    let myProps = state.today;
    if (ownProps.navigation && ownProps.navigation.state.params
        && ownProps.navigation.state.params.items 
        && ownProps.navigation.state.params.items.length > 0) {
        myProps.items = ownProps.navigation.state.params.items;
        myProps.date = myProps.items[0].date;
    }
    return myProps;
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        handleAddItem: (item) => {
            dispatch(addItem(item))
        },
        deleteItems: (ids) => {
            dispatch(deleteItems(ids));
        },
        refreshItems: () => {
            dispatch(fetchItems());
        },
        handleLongSelectItem: (id) => {
            dispatch(longSelectItem(id));
        },
        handleDismissEditing: () => {
            dispatch(dismissEditing());
        },
        handleDeleteItems: (ids) => {
            dispatch(deleteItems(ids));
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TodayScreen);
