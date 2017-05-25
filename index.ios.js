import React, { Component } from 'react';
import { AppRegistry, View } from 'react-native';
import PerformanceView from './app/components/performance-view';

export default class Voxophone extends Component {

    render() {
        return (<PerformanceView/>);
    }
}

AppRegistry.registerComponent('voxophone', () => Voxophone);
