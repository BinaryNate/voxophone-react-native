import React, { Component } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { validate } from 'parameter-validator';

export default class Instructions extends Component {

    constructor(props) {

        super(props);
        validate(props.dependencies, [ 'logger', 'voxophone' ], this, { addPrefix: '_' });
    }

    render() {

        return (
            <View style={styles.view}>
                <View style={styles.instructionsContainer}>
                    <Image style={styles.instructions} source={require('./img/instructions-phone-down.png')}/>
                </View>
                <View style={styles.okButtonContainer}>
                    <Image style={styles.okButton} source={require('./img/check-mark-button.png')}/>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({

    view: {
        justifyContent: 'flex-end',
        flex: 1
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
        flexGrow: 0,
        flexShrink: 1,
        flexBasis: 'auto',
        flexDirection: 'row',
        height: 60,
        marginBottom: 20,
        marginRight: 60,
        justifyContent: 'flex-end'
    },
    okButton: {
        resizeMode: 'contain',
        height: undefined,
        flex: 1
    }
});
