import { MainBundlePath } from 'react-native-fs';
import VoxophoneEngine from 'react-native-voxophone-engine';
import Logger from './utils/Logger';
import FileSystemJsonStorage from './models/storage/FileSystemJsonStorage';
import FileInfoStorage from './models/storage/FileInfoStorage';
import InstrumentManager from './models/InstrumentManager';

export default class DependencyBuilder {

    /**
    * Builds and returns the app's dependencies.
    *
    * @returns {Object} dependencies
    */
    static buildDependencies() {



            let logger = new Logger();

            logger.info(`Building the app's dependencies...`);
            let storageBasePath = `${MainBundlePath}/data`;

            let instrumentManager = new InstrumentManager({
                logger,
                instrumentStorage: new FileSystemJsonStorage({ logger, directoryPath: `${storageBasePath}/instruments` }),
                fileInfoStorage: new FileInfoStorage({ logger, directoryPath: `${storageBasePath}/fileInfo` })
            });

            const voxophone = new VoxophoneEngine({ logger });

            // Go ahead and set the initial instrument voice.
            logger.info('Getting the instruments...');

            instrumentManager.getInstruments()
            .then(instruments => voxophone.setInstrument({ instrument: instruments[0] }));

            let dependencies = {
                logger,
                voxophone,
                instrumentManager
            };

            return dependencies;
    }
}
