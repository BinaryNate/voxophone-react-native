import React, { Component } from 'react';
import { View, Text, Image, ScrollView, StyleSheet } from 'react-native';
import Color from 'color';
import { validate } from 'parameter-validator';
import { color1 } from '../../style-variables';

/**
* Displays the available instruments for selection and the currently selected instrument.
*/
export default class InstrumentPicker extends Component {

    constructor() {

        super(...arguments);
        validate(this.props.dependencies, [ 'voxophone', 'instrumentManager' ], this, { addPrefix: '_' });

        this.state = {
            instrumentOptions: [],
            selectedInstrumentImageSource: null
        };

        this._instrumentManager.getInstruments()
        .then(instruments => {
            // The context objects that will be bound to the nested `instrument` components.
            let instrumentOptions = instruments.map(instrument => ({
                // Pass the child a component a function it can call to set its instrument as the selected one.
                selectInstrument: () => this._setInstrument(instrument),
                imageSource: instrument.imageInfo.filePath
            }));
            this.setState({ instrumentOptions });
            this._setInstrument(instruments[0]);
        });
    }



    render() {
        return (

            <View style={styles.instrumentPicker}>

                <View style={styles.selectedInstrument}>
                    <View style={styles.imageContainer}>
                        <Image style={styles.selectedInstrumentImage} source={this.state.selectedInstrumentImageSource}/>
                    </View>
                </View>

                <ScrollView horizontal={true} style={styles.instrumentsScrollView}>
                    <Text>(instruments go here)</Text>
                    {this.state.instrumentOptions.map(instrument => (<Text key={instrument.imageSource}>{instrument.imageSource}</Text>))}
                </ScrollView>
            </View>
        );
    }

    _setInstrument(instrument) {

        this._voxophone.setInstrument({ instrument });
        this.setState({ selectedInstrumentImageSource: instrument.imageInfo.filePath });
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
