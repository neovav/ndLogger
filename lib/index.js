/**
 * Main class for loggers data
 */

class ndLogger {

    #list = [];

    /**
     * Getter return string - wrn
     *
     * @return {string}
     */
    static get WRN() { return 'wrn'; }

    /**
     * Getter return string - err
     *
     * @return {string}
     */
    static get ERR() { return 'err'; }

    /**
     * Constructor of the Logger class
     *
     * @param {object} classes
     */
    constructor (...classes) {
        if (typeof classes == 'object' && classes !== null) {
            for (let i in classes) {
                if (typeof classes[i] == 'object' && classes[i] !== null) {
                    if (typeof classes[i]['msg'] == 'function' &&
                        typeof classes[i]['wrn'] == 'function' &&
                        typeof classes[i]['err'] == 'function') this.#list.push(classes[i]);
                }
            }
        }
    }

    /**
     * Add handlers
     */
    add (...classes) {
        if (typeof classes == 'object' && classes !== null) {
            for (let i in classes) {
                if (typeof classes[i] == 'object' && classes[i] !== null) {
                    if (typeof classes[i]['msg'] == 'function' &&
                        typeof classes[i]['wrn'] == 'function' &&
                        typeof classes[i]['err'] == 'function') this.#list.push(classes[i]);
                }
            }
        }
    };

    /**
     * Write to log message
     *
     * @param {string} txt
     */

    msg (txt) {
        for (let i in this.#list) {
            if (typeof this.#list[i] == 'object' && this.#list[i] !== null &&
                typeof this.#list[i]['msg'] == 'function') {
                try {
                    this.#list[i].msg(txt);
                } catch (Err) {}
            }
        }
    };

    /**
     * Write to log warrnings
     *
     * @param {string} txt
     */

    wrn (txt) {
        for (let i in this.#list) {
            if (typeof this.#list[i] == 'object' && this.#list[i] !== null &&
                typeof this.#list[i]['wrn'] == 'function') {
                try {
                    this.#list[i].wrn(txt);
                } catch (Err) {}
            }
        }
    };

    /**
     * Write to log errors
     *
     * @param {string} txt
     */

    err (txt) {
        for (let i in this.#list) {
            if (typeof this.#list[i] == 'object' && this.#list[i] !== null &&
                typeof this.#list[i]['err'] == 'function') {
                try {
                    this.#list[i].err(txt);
                } catch (Err) {}
            }
        }
    };

    /**
     * Get LogToFile class
     *
     * @param {string} header
     * @param {string} file
     * @param {object} options
     *
     * @return LogToFile
     */
    static getLogToFile (header, file, options) {
        let LogToFile = require ('./LogToFile');
        return new LogToFile(header, file, options);
    }

    /**
     * Get LogToConsole class
     *
     * @return LogToConsole
     */
    static getLogToConsole () {
        let LogToConsole = require ('./LogToConsole');
        return new LogToConsole();
    }

}

module.exports = ndLogger;