import React, { Component } from 'react';
import { AppRegistry } from 'react-native';
import { MainBundlePath } from 'react-native-fs';
import Instructions from './app/components/instructions';
import Logger from './app/utils/Logger';
import VoxophoneEngine from 'react-native-voxophone-engine';
import FileSystemJsonStorage from './app/models/storage/FileSystemJsonStorage';
import FileInfoStorage from './app/models/storage/FileInfoStorage';
import InstrumentManager from './app/models/InstrumentManager';

let logger = new Logger();

logger.info(`Building the app's dependencies...`);
let storageBasePath = `${MainBundlePath}/data`;

let instrumentManager = new InstrumentManager({
    logger,
    instrumentStorage: new FileSystemJsonStorage({ logger, directoryPath: `${storageBasePath}/instruments` }),
    fileInfoStorage: new FileInfoStorage({ logger, directoryPath: `${storageBasePath}/fileInfo` })
});

const voxophone = new VoxophoneEngine({ logger });

const dependencies = {
    logger,
    voxophone,
    instrumentManager
};

// Go ahead and set the initial instrument voice.
logger.info('Getting the instruments...');
instrumentManager.getInstruments()
.then(instruments => {
    voxophone.setInstrument({ instrument: instruments[0] });
})
.catch(error => {
    logger.error('an error occurred while fetching the instruments', { error });
})


export default class Voxophone extends Component {

    render() {
        return (<Instructions dependencies={dependencies}/>);
    }
}

AppRegistry.registerComponent('voxophone', () => Voxophone);
