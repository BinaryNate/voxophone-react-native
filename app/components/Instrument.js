import React, { Component } from 'react';
import { TouchableHighlight, Image, StyleSheet } from 'react-native';

/**
* An available instrument that can be selected.
*/
export default class Instrument extends Component {

    render() {
        return (
            <TouchableHighlight style={styles.imageContainer} onPress={this.props.onSelected}>
                <Image style={styles.image} source={{ uri: this.props.imageSource }}/>
            </TouchableHighlight>
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
    },
    image: {
        flex: 1,
        borderRadius: 40
    }
});
