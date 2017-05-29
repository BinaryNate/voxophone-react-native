import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import InstrumentPicker from '../instrument-picker';
import MusicNoteMeter from '../music-note-meter';

/**
* The main, top-level application component in which constituent components are nested.
*/
export default class PerformanceView extends Component {

    constructor(props) {

        super(props);
        this.state = {
            meterDiameter: 0
        };
        this._handleMeterLayout = this._handleMeterLayout.bind(this);
    }

    render() {
        return (
            <View style={styles.performanceView}>
                <View style={styles.musicNoteMeterContainer} onLayout={this._handleMeterLayout}>
                    <MusicNoteMeter dependencies={this.props.dependencies} diameter={this.state.meterDiameter} />
                </View>
                {<InstrumentPicker dependencies={this.props.dependencies} />}
            </View>
        );
    }

    _handleMeterLayout(event) {

        let { height, width } = event.nativeEvent.layout;
        const meterMargin = 20;
        let meterDiameter = Math.min(height, width) - meterMargin;
        this.setState({ meterDiameter });
    }
}

const styles = StyleSheet.create({

    performanceView: {
        flexDirection: 'column',
        flex: 1
    },
    musicNoteMeterContainer: {
        flexGrow: 1,
        flexShrink: 1
    }
});
