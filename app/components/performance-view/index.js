import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import InstrumentPicker from '../instrument-picker';
import MusicNoteMeter from '../music-note-meter';

/**
* The main, top-level application component in which constituent components are nested.
*/
export default class PerformanceView extends Component {

    render() {
        return (
            <View>
                <View style={styles.performanceView}>

                    <View style={styles.musicNoteMeterContainer}>
                        <MusicNoteMeter/>
                        {/*<m:music-note-meter dependencies="{{ dependencies }}"/>*/}
                    </View>
                    <InstrumentPicker/>
                    {/*<i:instrument-picker dependencies="{{ dependencies }}"/>*/}
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({

    performanceView: {
        flexDirection: 'column'
    },
    musicNoteMeterContainer: {
        flexGrow: 1,
        flexShrink: 1,
        marginLeft: 20,
        marginRight: 20
    }
});
