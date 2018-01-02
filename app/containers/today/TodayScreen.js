import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';
import { Container } from '../../components';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addItem, deleteItems, fetchItems, longSelectItem, dismissEditing, setItems } from '../../actions/todayActions';
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
        if (this.props.navigation.state.params && this.props.navigation.state.params.items) {
            this.props.setItems(this.props.navigation.state.params.items);
        }

        this.props.navigation.setParams({
            date: this.getDate(),
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
        this.props.handleDeleteItems(ids, this.getDate());
    }

    calculateTotal = () => {
        let total = 0;
        const {items} = this.props;
        items.forEach((item) => total += item.price);
        return total;
    }

    getDate = () => {
        if (this.props.navigation.state.params
            && this.props.navigation.state.params.date) {
            return this.props.navigation.state.params.date;
        } else if (this.props.navigation.state.params 
            && this.props.navigation.state.params.items
            && this.props.navigation.state.params.items.length > 0) {
            return this.props.navigation.state.params.items[0].date;
        } else if (this.props.screenProps && this.props.screenProps.date) {
            return this.props.screenProps.date;
        } else {
            return new Date();
        }
    }

    render() {
        return (
            <Container>
                <Text>Date: {this.getDate().toMyDayDateString()}</Text>
                <ItemList 
                    items={this.props.items} 
                    handleItemClick={this.props.handleItemClick} 
                    refreshItems={this.props.refreshItems}
                    date={this.getDate()}
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
    handleAddItem: PropTypes.func.isRequired,
    handleDeleteItems: PropTypes.func.isRequired
}

function getNamespace(props) {
    if (props.navigation.state.params 
        && props.navigation.state.params.namespace) {
        return props.navigation.state.params.namespace;
    } else if (props.screenProps && props.screenProps.namespace) {
        return props.screenProps.namespace;
    } else {
        return 'today';
    }
}

const mapStateToProps = (state, ownProps) => {
    return state.today[getNamespace(ownProps)];
}

const mapDispatchToProps = (dispatch, ownProps) => {
    const namespace = getNamespace(ownProps);
    return {
        handleAddItem: (item) => {
            dispatch(addItem(namespace, item))
        },
        refreshItems: (date) => {
            dispatch(fetchItems(namespace, date));
        },
        handleLongSelectItem: (id) => {
            dispatch(longSelectItem(namespace, id));
        },
        handleDismissEditing: () => {
            dispatch(dismissEditing(namespace));
        },
        handleDeleteItems: (ids, date) => {
            dispatch(deleteItems(namespace, ids, date));
        },
        setItems: (items) => {
            dispatch(setItems(namespace, items));
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TodayScreen);
