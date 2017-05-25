import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { color1 } from '../../style-variables';

/**
* Illustrates the volume envelope of a note played using concentric circles and
* displays the name of the note being played (e.g. "C#").
*/
export default class MusicNoteMeter extends Component {

    render() {
        return (
            <View style={styles.musicNoteMeter}>

                <View style={styles.meterCenter}>
                    <Text style={styles.meterCenterText}>C#</Text>
                    {/*<Text>{this.note}</Text>*/}
                </View>
            </View>
        );
    }
}

const meterCenterDiameter = 140;

const styles = StyleSheet.create({

    musicNoteMeter: {
        // flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    meterCenter: {
        flexGrow: 0,
        flexShrink: 0,
        flexBasis: 'auto',
        height: meterCenterDiameter,
        width: meterCenterDiameter,
        borderRadius: meterCenterDiameter / 2,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
    },
    meterCenterText: {
        color: color1,
        fontSize: 72,
        fontWeight: 'bold'
    }
});
