import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import _ from 'lodash';
import { validate } from 'parameter-validator';
import { color1 } from '../../style-variables';
import { MusicNoteEventType } from 'react-native-voxophone-engine';
import delay from '../../utils/delay';
import Ring from '../music-note-meter-ring';

const NUMBER_OF_RINGS = 8,
    NOTE_ON_TRANSITION_MILLISECONDS = 40,
    NOTE_OFF_TRANSITION_MILLISECONDS = 100,
    METER_CENTER_DIAMETER = 140;

/**
* Illustrates the volume envelope of a note played using concentric circles and
* displays the name of the note being played (e.g. "C#").
*/
export default class MusicNoteMeter extends Component {

    constructor(props) {

        super(props);
        validate(props.dependencies, [ 'logger', 'voxophone' ], this, { addPrefix: '_' });
        this._voxophone.addMusicNoteListener(this._handleMusicNoteEvent.bind(this));

        this.state = {
            note: '',
            rings: _.range(NUMBER_OF_RINGS).map(() => ({ isVisible: false, color: 'white' }))
        };
    }

    render() {
        return (
            <View style={styles.musicNoteMeter}>

                {this._renderRings(this.state.rings, this.props.diameter, METER_CENTER_DIAMETER,
                    <View style={styles.meterCenter}>
                        <Text style={styles.meterCenterText}>{this.state.note}</Text>
                    </View>
                )}
            </View>
        );
    }

    _renderRings(rings, diameter, centerDiameter, center) {

        let distanceToCenter = diameter - centerDiameter,
            ringThickness = Math.floor(distanceToCenter / rings.length),
            nextRingDiameter = diameter - ringThickness,
            ring = rings[0],
            color = ring.isVisible ? ring.color : 'white';

        return (
            <Ring backgroundColor={color} diameter={diameter}>
                {rings.length > 1 ? this._renderRings(rings.slice(1), nextRingDiameter, centerDiameter, center) : center}
            </Ring>
        );
    }

    _handleMusicNoteEvent(event) {

        if (event.type === MusicNoteEventType.NOTE_ON) {
            this._noteOn(event.note);
        } else {
            this._noteOff();
        }
    }

    /* eslint-disable */

    /**
    * Illustrates that a given note has been played
    *
    * @param {string} note - e.g. 'C#'
    */
    _noteOn(note) {

        let reversedRings = [ ...this.state.rings ].reverse();
        let delayPerRing = NOTE_ON_TRANSITION_MILLISECONDS / this.state.rings.length;
        let promisedDisplayUpdate = Promise.resolve().then(() => this.setState({ note }));

        // Sequentially render each ring, adding a delay between each to stretch it out to the desired time.
        return reversedRings.reduce((promise, ring) => {
            return promise
            .then(() => {
                ring.color = this._getRandomColor();
                ring.isVisible = true;
                this.setState({
                    rings: this.state.rings
                });
                return delay(delayPerRing)
            });
        }, promisedDisplayUpdate);
    }

    /**
    * Updates the display when a note has stopped being played.
    */
    _noteOff() {

        let delayPerRing = NOTE_OFF_TRANSITION_MILLISECONDS / this.state.rings.length;

        // Sequentially erase each ring, adding a delay between each to stretch it out to the desired time.
        return this.state.rings.reduce((promise, ring) => {
            return promise
            .then(() => {
                ring.isVisible = false;
                this.setState({
                    rings: this.state.rings
                });
                return delay(delayPerRing);
            });
        }, Promise.resolve());
    }

    _getRandomColor() {

        let num = Math.floor(Math.random() * 0xFFFFFF);
        let hex = num.toString(16).padStart(6, '0');
        return '#' + hex;
    }

    /**
    * A method that blinks the music note display animation for testing.
    */
    _blink() {

        return delay(2000)
        .then(() => {

            this._noteIsOn = !this._noteIsOn;
            return this._noteIsOn ? this._noteOn('C#') : this._noteOff();
        })
        .then(() => this._blink());
    }
}

const styles = StyleSheet.create({

    musicNoteMeter: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        // backgroundColor: 'green',
        // borderRadius: 170
    },
    meterCenter: {
        flexGrow: 0,
        flexShrink: 0,
        flexBasis: 'auto',
        height: METER_CENTER_DIAMETER,
        width: METER_CENTER_DIAMETER,
        borderRadius: METER_CENTER_DIAMETER / 2,
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
