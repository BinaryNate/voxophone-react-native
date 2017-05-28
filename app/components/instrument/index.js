import React, { Component } from 'react';
import { View, Image, StyleSheet } from 'react-native';

/**
* An available instrument which can be selected.
*/
export default class Instrument extends Component {

    render() {
        return (
            <View style={styles.imageContainer} onPress={this.props.onSelected}>
                <Image source={{ uri: this.props.imageSource }}/>
            </View>
        );
    }

}

const styles = StyleSheet.create({

    imageContainer: {
        margin: 10,
        backgroundColor: 'white',
        borderRadius: 40,
        height: 80,
        width: 80
    }
});
