import React, { Component } from 'react';
import { AppRegistry } from 'react-native';
import DependencyBuilder from './app/DependencyBuilder';
import Navigator from './app/Navigator';

const dependencies = DependencyBuilder.buildDependencies()

class VoxophoneApp extends Component {
    render() {
        return (<Navigator screenProps={{ dependencies }}/>);
    }
}

AppRegistry.registerComponent('voxophone', () => VoxophoneApp);
