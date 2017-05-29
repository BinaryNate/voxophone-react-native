import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';


export default class MusicNoteMeterRing extends Component {

    render() {

        const { diameter } = this.props;

        let dynamicStyle = {

            width: diameter,
            height: diameter,
            borderRadius: diameter / 2
        };

        return (
            <View
                style={[ styles.ring, dynamicStyle ]}
                backgroundColor={this.props.backgroundColor}
            >
            {this.props.children}
            </View>
        );
    }

    // _handleLayout({ height, width }) {

    // }
}

const styles = StyleSheet.create({

    ring: {
        justifyContent: 'center',
        alignItems: 'center'
    }
});
