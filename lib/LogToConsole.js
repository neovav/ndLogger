const ndLogger = require('./');

/**
 * Logging to the console
 */

class LogToConsole {

    static #utime;
    static #txt;
    static #float = true;

    #is_write       = true;
    #is_write_wrn   = true;
    #is_write_err   = true;

    /**
     * Constructor of the logToConsole class
     */

    constructor () {
        this.#is_write = true;
    }

    /**
     * Enable write to the log file
     *
     * @param {string} type
     */
    on (type) {
        if (typeof type == 'string') {
            if (type == ndLogger.ERR) this.#is_write_err = true;
                else if (type == ndLogger.WRN) this.#is_write_wrn = true;
                    else this.#is_write = true;
        } else this.#is_write = true;
    }

    /**
     * Disable write to the log file
     *
     * @param {string} type
     */
    off (type) {
        if (typeof type == 'string') {
            if (type == ndLogger.ERR) this.#is_write_err = false;
                else if (type == ndLogger.WRN) this.#is_write_wrn = false;
                    else this.#is_write = false;
        } else this.#is_write = false;
    }

    /**
     * Messages write to log file
     *
     * @param {string} txt
     */
    msg (txt) {
        if (this.#is_write) console.log('     ' + txt);
    }

    /**
     * Warnings output to the console
     *
     * @param {string} txt
     */
    wrn (txt) {
        if (this.#is_write_wrn) console.warn(txt);
    }

    /**
     * Errors output to the console
     *
     * @param {string} txt
     */
    err (txt) {
        if (this.#is_write_err) console.error(txt);
    }

    /**
     * Static method for set start time
     */
    static setTime () {
        this.#utime = Math.floor(new Date() / 1000)
    }

    /**
     * Float messages
     *
     * @param {string} txt
     */
    static float (txt) {
        if (this.#float) {
            let cnt = 0;
            if (typeof this.#utime == 'undefined') this.setTime();
            if (typeof this.#txt != 'undefined') {
                cnt = this.#txt.length;
                let space = " ";
                process.stdout.write ("\r");
                process.stdout.write (space.repeat(cnt));
                process.stdout.write ("\r");
            }
            this.#txt = (Math.floor(new Date() / 1000) - this.#utime)+'s. ' + txt;
            process.stdout.write (this.#txt);
        }
    }

    /**
     * Enable or disable floating messages
     *
     * @param {boolean} set
     */
    static setFloat (set) {
        this.#float = set;
    }
}

module.exports = LogToConsole;