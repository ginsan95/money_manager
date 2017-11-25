import React, { Component } from 'react';
import { View, Text, FlatList, Button } from 'react-native';
import { Container } from 'components/Container';
import { connect } from 'react-redux';
import { addItem, deleteItem } from 'actions/todayActions';
import ItemList from './ItemList';

class TodayScreen extends Component {
    static navigationOptions = ({navigation}) => {
        if (navigation.state.params != null) {
            return {
                title: 'Today\'s Spending',
                headerRight: (
                    <Button title='+' onPress={navigation.state.params.handleAddItem}/>
                )
            }
        }
    }

    componentWillMount() {
        this.props.navigation.setParams({
            handleAddItem: this.props.handleAddItem
        });
    }

    render() {
        const date = new Date();
        
        return (
            <Container>
                <Text>Date: {date.toDateString()}</Text>
                <ItemList items={this.props.items} handleItemClick={this.props.handleItemClick}/>
            </Container>
        );
    }
}

const mapStateToProps = state => {
    return {
        items: state.today.items
    }
}

const mapDispatchToProps = dispatch => {
    return {
        handleAddItem: () => {
            dispatch(addItem("Ali", 50))
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
