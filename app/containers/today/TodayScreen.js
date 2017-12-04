import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';
import { Container } from 'components/Container';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addItem, deleteItems, fetchItems, longSelectItem, dismissEditing } from 'actions/todayActions';
import ItemList from './ItemList';
import AddItemButton from './AddItemButton';
import { ProgressDialog } from 'react-native-simple-dialogs';

class TodayScreen extends Component {
    static navigationOptions = ({navigation}) => {
        const {params} = navigation.state;
        if (params != null) {
            return {
                title: 'Today\'s Spending',
                headerRight: (
                    <View>
                        {!params.isEditing && <AddItemButton handleAddItem={params.handleAddItem} />}
                        {params.isEditing && <Button title='Cancel' onPress={params.handleDismissEditing}/>}
                    </View>
                ),
                headerLeft: (
                    <View>
                        {params.isEditing && <Button title='Delete' onPress={params.handleDeleteItems}/>}
                    </View>
                )
            }
        }
    }

    componentWillMount() {
        this.props.navigation.setParams({
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
        const date = new Date();
        
        return (
            <Container>
                <Text>Date: {date.toDateString()}</Text>
                <ItemList 
                    items={this.props.items} 
                    handleItemClick={this.props.handleItemClick} 
                    refreshItems={this.props.refreshItems}
                    isFetching={this.props.api.isFetching}
                    handleLongSelectItem={this.props.handleLongSelectItem}
                    isEditing={this.props.api.isEditing}
                />
                <Text>Total: ${this.calculateTotal()}</Text>
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
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
            price: PropTypes.number.isRequired,
            date: PropTypes.object.isRequired
        }).isRequired
    ).isRequired,
    api: PropTypes.shape({
        isFetching: PropTypes.bool.isRequired,
        isProcessing: PropTypes.bool.isRequired,
        isEditing: PropTypes.bool.isRequired
    }),
    handleAddItem: PropTypes.func.isRequired,
    handleDeleteItems: PropTypes.func.isRequired
}

const mapStateToProps = (state, ownProps) => {
    return state.today;
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
