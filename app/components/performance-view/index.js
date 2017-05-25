import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

/**
* The main, top-level application component in which constituent components are nested.
*/
export default class PerformanceView extends Component {

    render() {
        return (
            <View>
                {/*
                <ActionBar>
                  <NavigationButton visibility="collapsed"/>
                </ActionBar>
                */}
                <View style={styles.performanceView}>

                    <View style={styles.musicNoteMeterContainer}>
                        <Text>Music note meter goes here</Text>
                        {/*<m:music-note-meter dependencies="{{ dependencies }}"/>*/}
                    </View>
                    <Text>Instrument picker goes here</Text>
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
        flex: 1,
        marginLeft: 20,
        marginRight: 20
    }
});
