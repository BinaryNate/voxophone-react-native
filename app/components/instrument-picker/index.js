import React, { Component } from 'react';
import { View, Text, Image, ScrollView, StyleSheet } from 'react-native';
import { color1 } from '../../style-variables';

/**
* Displays the available instruments for selection and the currently selected instrument.
*/
export default class InstrumentPicker extends Component {

    render() {
        return (

            <View style={styles.instrumentPicker}>

                <View style={styles.selectedInstrument}>
                    <View style={styles.imageContainer}>
                        {/**/}
                        <Image style={styles.selectedInstrumentImage} source={require('./music-box.jpg')}/>

                        <Text>Does this appear?</Text>
                    </View>
                </View>

                <ScrollView horizontal={true}>
                    <Text>(instrument goes here)</Text>
                    {/*
                    <Repeater items="{{ instrumentOptions }}" row="1" style={instrumentsScrollView}>
                        <Repeater.itemsLayout>
                            <StackLayout orientation="horizontal" />
                        </Repeater.itemsLayout>
                        <Repeater.itemTemplate>
                            <i:instrument class="instrument"/>
                        </Repeater.itemTemplate>
                    </Repeater>
                    */}
                </ScrollView>
            </View>
        );
    }
}

const selectedInstrumentBackdropMargin = 20;

const styles = StyleSheet.create({

    instrumentPicker: {

    },
    selectedInstrument: {
        backgroundColor: color1 - 45,
        marginTop: selectedInstrumentBackdropMargin,
        marginBottom: selectedInstrumentBackdropMargin
    },
    imageContainer: {
        backgroundColor: 'green',
        borderRadius: 80,
        height: 160,
        width: 160,
        margin: -selectedInstrumentBackdropMargin
    },
    selectedInstrumentImage: {
        resizeMode: Image.resizeMode.contain,

        flex: 1,
        alignSelf: 'stretch',
        borderRadius: 80,
        // width and height must be overridden in order to
        // fit to the container
        width: undefined,
        height: undefined
    },
    instrumentsScrollView: {
        backgroundColor: color1,
        marginBottom: 20
    }
});
