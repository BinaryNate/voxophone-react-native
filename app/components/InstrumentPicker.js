import React, { Component } from 'react';
import { View, Image, ScrollView, StyleSheet } from 'react-native';
import Color from 'color';
import { validate } from 'parameter-validator';
import { color1 } from '../style-variables';
import Instrument from './Instrument';

/**
* Displays the available instruments for selection and the currently selected instrument.
*/
export default class InstrumentPicker extends Component {

    constructor() {

        super(...arguments);
        validate(this.props.dependencies, [ 'voxophone', 'instrumentManager' ], this, { addPrefix: '_' });

        this.state = {
            instrumentOptions: [],
            selectedInstrumentImageSource: ''
        };

        this._instrumentManager.getInstruments()
        .then(instruments => {
            // The context objects that will be bound to the nested `instrument` components.
            let instrumentOptions = instruments.map(instrument => ({
                // Pass the child a component a function it can call to set its instrument as the selected one.
                handleInstrumentSelected: () => this._setInstrument(instrument),
                imageSource: instrument.imageInfo.filePath,
                key: instrument.id
            }));
            this.setState({ instrumentOptions });
            this._setInstrument(instruments[0]);
        });
    }

    render() {
        return (
            <View>
                <View style={styles.selectedInstrument}>
                    <Image style={styles.selectedInstrumentImage} source={{ uri: this.state.selectedInstrumentImageSource }} />
                </View>
                <ScrollView horizontal={true} style={styles.instrumentsScrollView}>
                    {this.state.instrumentOptions.map(({ imageSource, handleInstrumentSelected, key }) => (<Instrument imageSource={imageSource} onSelected={handleInstrumentSelected} key={key} />))}
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

    selectedInstrument: {
        backgroundColor: Color(color1).darken(0.1).rgb(),
        marginTop: selectedInstrumentBackdropMargin,
        marginBottom: selectedInstrumentBackdropMargin,
        alignItems: 'center',
        overflow: 'hidden'
    },
    selectedInstrumentImage: {

        borderRadius: 80,
        margin: -selectedInstrumentBackdropMargin,
        height: 160,
        width: 160,
        backgroundColor: 'white'
    },
    instrumentsScrollView: {
        backgroundColor: color1,
        marginBottom: 20
    }
});
