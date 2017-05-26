/**
* Winston style logger abstraction.
*/
export default class Logger {

    error(...args) {
        this._log('ERROR', ...args);
    }

    warn(...args) {
        this._log('WARN', ...args);
    }

    info(...args) {
        this._log('info', ...args);
    }

    verbose(...args) {
        this._log('verbose', ...args);
    }

    silly(...args) {
        this._log('silly', ...args);
    }

    _log(level, message, metadata) {

        let serializedMetadata = this._serializeMetadata(metadata),
            logEntry = `${level}: ${message}${serializedMetadata}`;

        console.log(logEntry);
    }

    _serializeMetadata(metadata) {

        if (!(metadata && typeof metadata === 'object'))
            return '';

        // If an error was included in the metadata, expand to include its stack trace.
        for (let key in metadata) {
            let value = metadata[key];
            if (value instanceof Error) {
                metadata = Object.assign({}, metadata, {
                    [key]: `${value.name}: ${value.message}\n${value.stack}`
                });
                break;
            }
        }
        return `\n${JSON.stringify(metadata, null, 4)}`;
    }
}
