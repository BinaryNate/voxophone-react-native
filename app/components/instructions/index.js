import React, { Component } from 'react';
import { View, Image, StyleSheet, Animated, TouchableWithoutFeedback } from 'react-native';
import { validate } from 'parameter-validator';

const MARGIN_MIN = 20;
const MARGIN_MAX = 50;
const MARGIN_ANIMATION_DURATION = 4000;

export default class Instructions extends Component {

    constructor(props) {

        super(props);
        // Allow dependencies to be passed in `screenProps` for react-navigation.
        let dependencies = this.props.dependencies || this.props.screenProps.dependencies;
        validate(dependencies, [ 'voxophone' ], this, { addPrefix: '_' });

        this._navigateToPerformanceView = this._navigateToPerformanceView.bind(this);
        this._voxophone.addMusicNoteListener(this._navigateToPerformanceView);

        this.state = {
            margin: new Animated.Value(MARGIN_MIN)
        };

        let cycleAnimation = () => {
            Animated.sequence([
                Animated.timing(this.state.margin, {
                    toValue: MARGIN_MAX,
                    duration: MARGIN_ANIMATION_DURATION
                }),
                Animated.timing(this.state.margin, {
                    toValue: MARGIN_MIN,
                    duration: MARGIN_ANIMATION_DURATION
                })
            ]).start(() => cycleAnimation());
        }

        cycleAnimation();

    }

    render() {

        return (
            <TouchableWithoutFeedback onPress={this._navigateToPerformanceView}>
                <View style={styles.view}>
                    <View style={styles.instructionsContainer}>
                        <Animated.Image style={[ styles.instructions, { margin: this.state.margin }]} source={require('./img/instructions-phone-down.png')}/>
                    </View>
                    <View style={styles.okButtonContainer}>
                        <Image style={styles.okButton} source={require('./img/check-mark-button.png')}/>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        );
    }

    _navigateToPerformanceView() {

        if (this._navigated)
            return;
        this._navigated = true;
        this.props.navigation.navigate('PerformanceView');
    }
}

const styles = StyleSheet.create({

    view: {
        justifyContent: 'flex-end',
        flex: 1,
        backgroundColor: 'white'
    },

    instructionsContainer: {
        flex: 1,
    },

    instructions: {
        margin: 20,
        resizeMode: 'contain',
        flex: 1,
        width: undefined
    },
    okButtonContainer: {
        flex: 0,
        flexDirection: 'row',
        justifyContent: 'flex-end'
    },
    okButton: {
        marginBottom: 20,
        marginRight: 60,
        height: 60,
        width: 60
    }
});
