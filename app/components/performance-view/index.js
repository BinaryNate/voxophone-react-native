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
            <View style={styles.performanceView}>
                <View style={styles.musicNoteMeterContainer}>
                    <MusicNoteMeter dependencies={this.props.dependencies} />
                </View>
                {<InstrumentPicker dependencies={this.props.dependencies} />}
            </View>
        );
    }
}

const styles = StyleSheet.create({

    performanceView: {
        flexDirection: 'column',
        flex: 1
    },
    musicNoteMeterContainer: {
        flexGrow: 1,
        flexShrink: 1,
        marginLeft: 20,
        marginRight: 20
    }
});
