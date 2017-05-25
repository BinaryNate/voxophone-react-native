import React, { Component } from 'react';
import { View, Text, Image, ScrollView, StyleSheet } from 'react-native';
import Color from 'color';
import { color1 } from '../../style-variables';

/**
* Displays the available instruments for selection and the currently selected instrument.
*/
export default class InstrumentPicker extends Component {

    constructor() {

        super(...arguments);
        this._instruments = [
            {
                imageSource: 'test1'
            },
            {
                imageSource: 'test2'
            }
        ];
    }

    render() {
        return (

            <View style={styles.instrumentPicker}>

                <View style={styles.selectedInstrument}>
                    <View style={styles.imageContainer}>
                        <Image style={styles.selectedInstrumentImage} source={require('./music-box.jpg')}/>
                    </View>
                </View>

                <ScrollView horizontal={true} style={styles.instrumentsScrollView}>
                    <Text>(instruments go here)</Text>
                    {this._instruments.map(instrument => (<Text key={instrument.imageSource}>{instrument.imageSource}</Text>))}
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
        backgroundColor: Color(color1).darken(0.1).rgb(),
        marginTop: selectedInstrumentBackdropMargin,
        marginBottom: selectedInstrumentBackdropMargin,
        alignItems: 'center'
    },
    imageContainer: {
        backgroundColor: 'white',
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
