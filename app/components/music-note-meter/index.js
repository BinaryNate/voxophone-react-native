import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import _ from 'lodash';
import { validate } from 'parameter-validator';
import { color1 } from '../../style-variables';
import { MusicNoteEventType } from 'react-native-voxophone-engine';
import delay from '../../utils/delay';
import Ring from '../music-note-meter-ring';

const NUMBER_OF_RINGS = 8;
const NOTE_ON_TRANSITION_MILLISECONDS = 40;
const NOTE_OFF_TRANSITION_MILLISECONDS = 100;
const TOTAL_HUE_LIGHTNESS_CHANGE = 0.5;
const RANDOM_COLORS_ENABLED = true;

const meterCenterDiameter = 140;

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

        this._blink();
    }

    render() {
        return (
            <View style={styles.musicNoteMeter}>

                {this._renderRings(this.state.rings, this.props.diameter, meterCenterDiameter,
                    <View style={styles.meterCenter}>
                        <Text style={styles.meterCenterText}>C#</Text>
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

    _blink() {

        return delay(2000)
        .then(() => {

            this._noteIsOn = !this._noteIsOn;
            return this._noteIsOn ? this._noteOn('C#') : this._noteOff();
        })
        .then(() => this._blink());
    }

    _handleMusicNoteEvent(event) {

        if (event.type === MusicNoteEventType.NOTE_ON) {

            this.setState({ note: event.note });
            // this._noteOn(event.note);
        } else {
            // this._noteOff();
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

    /**
    * Creates and hooks up the ring-shaped views arranged in concentric circles that are used in the UI.
    *
    * @returns {Promise.<Array.<View>>} - Array where each item is a View that is a ring in the music note meter's UI.
    *                                     The rings go from the center to the circumference as the index increases.
    */
    _createAndConfigureRings() {

        return this._getOuterRing()
        .then(outerRing => {

            let center = this.view.getViewById('meter-center');
            this.view.removeChild(center);

            let radiusLengthToDivide = outerRing.borderRadius - center.borderRadius;
            let radiusStepSize = radiusLengthToDivide / NUMBER_OF_RINGS;

            let numberOfRingsToCreate = NUMBER_OF_RINGS - 1; // Subtract one, since the outer ring already exists.
            let rings = this._createRings(center, numberOfRingsToCreate, radiusStepSize);
            rings.push(outerRing);

            // Link the rings together in a parent-child hierarchy.
            this._linkRingsTogether(rings);
            rings[0].addChild(center);

            this._setRingColors(rings);
            return rings;
        })
        .catch(error => this._logger.error(`An error occurred during ring creation.`, { error }));
    }

    /**
    * @param   {ui/View}        centerRing     - The initial, center ring on which the size of the other rings will be based.
    * @param   {int}            numberOfRings  - Total number of rings to render
    * @param   {int}            radiusStepSize - The distance in pixels between the border of a ring and the border of the ring
    *                                            immediately outside of it.
    * @returns {Array.<ui/View}
    */
    _createRings(centerRing, numberOfRings, radiusStepSize) {

        let previousRing = centerRing,
            rings = [];

        for (let i = 0; i < numberOfRings; i++) {

            let radius = previousRing.borderRadius + radiusStepSize;
            let ring = this._createRing(radius);
            rings.push(ring);
            previousRing = ring;
        }
        return rings;
    }

    _createRing(radius) {

        let ring = new FlexboxLayout();
        ring.height = ring.width = radius * 2;
        ring.borderRadius = radius;
        ring.alignItems = AlignItems.CENTER;
        ring.justifyContent = JustifyContent.CENTER;
        FlexboxLayout.setFlexGrow(ring, 0);
        FlexboxLayout.setFlexShrink(ring, 0);
        return ring;
    }

    /**
    * Gets a reference to the existing view which will serve as the outermost ring and
    * then configures and returns it.
    *
    * @returns {Promise.<ui/View>}
    */
    _getOuterRing() {

        return Promise.resolve()
        .then(() => {

            let outerRing = this.view;
            let outerRingSize = outerRing.getActualSize();
            let outerRingRadius = Math.min(outerRingSize.height, outerRingSize.width) / 2;

            if (outerRingRadius === 0) {
                // The view hasn't been fully initialized. Let's try again in 1 millisecond.
                return delay(1).then(() => this._getOuterRing());
            }
            // Set the height and width equal to each other, because this view is initially just a rectangle.
            outerRing.height = this.view.width = outerRingRadius * 2;
            outerRing.borderRadius = outerRingRadius;
            return outerRing;
        });
    }

    _getRandomColor() {

        let num = Math.floor(Math.random() * 0xFFFFFF);
        let hex = num.toString(16).padStart(6, '0');
        return '#' + hex;
    }

    _linkRingsTogether(rings) {

        rings.forEach((ring, index) => {
            let parentRing = rings[index + 1];

            if (parentRing) {
                parentRing.addChild(ring);
            }
        });
    }

    _setRingColors(rings) {

        rings.forEach((ring, index) => {
            ring.backgroundColor = this._getColorForRingIndex(index);
        });
    }

    _getColorForRing(ring) {

        let ringIndex = this._rings.indexOf(ring);
        return this._getColorForRingIndex(ringIndex);
    }

    _getColorForRingIndex(ringIndex) {

        if (RANDOM_COLORS_ENABLED) {
            return this._getRandomColor();
        }

        let lightnessStepSize = TOTAL_HUE_LIGHTNESS_CHANGE / NUMBER_OF_RINGS;
        let rootColor = '#ff871e';
        let { r, g, b } = ColorEditor(rootColor).darken(ringIndex * lightnessStepSize).rgb().object();
        return new Color(255, r, g, b);
    }
}
