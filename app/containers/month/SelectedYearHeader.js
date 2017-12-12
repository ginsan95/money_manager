import React, { Component } from 'react';
import { View, Button, Picker, StyleSheet } from 'react-native';
import { Dialog } from 'react-native-simple-dialogs';
import PropTypes from 'prop-types';

export default class SelectedYearHeader extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dialogVisible: false,
            selectedYear: this.props.year
        }
    }

    getYears() {
        if (!this.years) {
            let maxYear = new Date().getFullYear();
            let array = [];
            for (let i=10; i>=0; i--) {
                array.push((maxYear - i).toString());
            }
            if (array.length > 0) {
                this.years = array;
            }
        }
        return this.years;
    }

    handleShowPicker = () => {
        this.setState({
            dialogVisible: true
        });
    }

    handlePicker = (value, index) => {
        this.setState({
            selectedYear: value
        });
    }

    handleChangeYear = () => {
        this.props.handleChangeYear(this.state.selectedYear);
        this.handleDismissDialog();
        this.props.refreshMonthItems(this.state.selectedYear);
    }

    handleDismissDialog = () => {
        this.setState({
            dialogVisible: false
        });
    }

    updateSelectedYear = () => {
        this.setState({
            selectedYear: this.props.year
        });
    }

    render() {
        let yearPickerItems = this.getYears().map( (s, i) => {
            return <Picker.Item key={i} value={s} label={s} />
        });

         return (
            <View>
                <Button title={this.props.year} onPress={this.handleShowPicker}/>
                <Dialog
                    visible={this.state.dialogVisible} 
                    title="Select Year"
                    onTouchOutside={() => this.setState({dialogVisible: false})}
                    onShow={this.updateSelectedYear} >
                    <View>
                        <Picker
                            selectedValue={this.state.selectedYear}
                            onValueChange={this.handlePicker}>
                            {yearPickerItems}
                        </Picker>
                        <View style={styles.buttonContainer}>
                            <Button title="Cancel" onPress={this.handleDismissDialog}/>
                            <Button title="Done" onPress={this.handleChangeYear}/>
                        </View>
                    </View>
                </Dialog>
            </View>
         );
     }
}

const styles = StyleSheet.create({
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    }
});

SelectedYearHeader.propTypes = {
    year: PropTypes.string.isRequired,
    handleChangeYear: PropTypes.func.isRequired,
    refreshMonthItems: PropTypes.func.isRequired,
}
