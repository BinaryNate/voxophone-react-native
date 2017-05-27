import fs from 'react-native-fs';
import { validate } from 'parameter-validator';

/**
* Implements database-like, file system-based storage for JSON objects using
* the NativeScript runtime's file system implementation.
*/
export default class FileSystemJsonStorage {

    constructor(options) {

        validate(options, [ 'directoryPath', 'logger' ], this, { addPrefix: '_' });
    }

    /**
    * Loads all of the directory's object from disk.
    *
    * @return {Promise.<Array>}
    */
    query() {

        return fs.readDir(this._directoryPath)
        .then(items => {
            let jsonFiles = items.filter(item => item.isFile() && item.name.substr(-5) === '.json');

            let promisedSerializedEntities = jsonFiles.map(file => fs.readFile(file.path));
            return Promise.all(promisedSerializedEntities);
        })
        .then(serializedEntities => {

            let entities = serializedEntities.reduce((parsedEntities, serializedEntity) => {

                let parsedEntity;
                try {
                    parsedEntity = JSON.parse(serializedEntity);
                } catch (error) {
                    this._logger.error(`${this.constructor.name} encountered an invalid JSON file, which will be omitted.`, { error, serializedEntity });
                }

                if (parsedEntity) parsedEntities.push(parsedEntity);
                return parsedEntities;
            }, []);
            return entities;
        });
    }
}
