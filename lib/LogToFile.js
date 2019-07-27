const fs       = require('fs');
const ndLogger = require('./');

/**
 * Logging to the file
 */

class LogToFile {

    #is_header     = true;
    #is_header_wrn = true;
    #is_header_err = true;
    #is_write      = true;
    #is_write_wrn  = true;
    #is_write_err  = true;
    #header        = '';
    #file;

    #wrn;
    #err;

    /**
     * Constructor of the logToFile class
     *
     * @param {string} file
     * @param {string} header
     * @param {object} options
     */

    constructor (header, file, options) {
        this.#file   = file;
        this.#header = header;

        if (typeof options == 'object' && options !== null) {
            if (typeof options['is_header'] == 'boolean') this.#is_header = options['is_header'];

            if (typeof options[ndLogger.WRN] == 'string') {
                this.#wrn = options[ndLogger.WRN];
                if (this.#wrn == this.#file) this.#is_header_wrn = this.#is_header;
                    else this.#is_header_wrn = false;
            }

            if (typeof options[ndLogger.ERR] == 'string') {
                this.#err = options[ndLogger.ERR];
                if (this.#wrn == this.#file) this.#is_header_err = this.#is_header;
                    else this.#is_header_err = false;
            }
        }

        if (this.#is_header) LogToFile.wrHeader (this.#header, this.#file);
    };

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
    };

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
    };

    /**
     * The header write to log file
     *
     * @param {string} header
     * @param {string} file
     */
    static wrHeader (header, file) {
        let dir = file.substr(0, file.lastIndexOf('/'));
        if (!fs.existsSync(dir))
            fs.mkdirSync(dir, { recursive: true });

        fs.writeFileSync(file, "\r\n", {'flag': 'a'});
        fs.writeFileSync(file, header + "\r\n" + '='.repeat(header.length) + "\r\n", {'flag': 'a'});
    };

    /**
     * Write to log file
     *
     * @param {string} file
     * @param {string} txt
     */
    static write (file, txt) {
        let date = new Date();
        let month = date.getMonth() + 1;
        if (month < 10) month = '0' + month;
        let day = date.getDate();
        if (day < 10) day = '0' + day;
        let hour = date.getHours();
        if (hour < 10) hour = '0' + hour;
        let minutes = date.getMinutes();
        if (minutes < 10) minutes = '0' + minutes;
        let seconds = date.getSeconds();
        if (seconds < 10) seconds = '0' + seconds;

        txt = date.getFullYear() + '-' + month + '-' + day + ' ' +
            hour + ':' + minutes + ':' + seconds + ' ' + txt;

        fs.writeFileSync(file, txt + "\r\n", {'flag': 'a'});
    };

    /**
     * Messages write to log file
     *
     * @param {string} txt
     */
    msg (txt) {
        if (this.#is_write) {
            if (!this.#is_header) {
                if ((this.#file != this.#wrn || !this.#is_header_wrn) &&
                    (this.#file != this.#err || !this.#is_header_err)) {
                    LogToFile.wrHeader(this.#header, this.#file);
                }
                this.#is_header = true;
            }
            LogToFile.write(this.#file, '      ' + txt);
        }
    }

    /**
     * Warnings write to log file
     *
     * @param {string} txt
     */
    wrn (txt) {
        if (this.#is_write_wrn) {
            let is_header = false;
            if (!this.#is_header_wrn) {
                if ((this.#file != this.#wrn || !this.#is_header) &&
                    (this.#wrn  != this.#err || !this.#is_header_err)) {
                    is_header = true;
                }
                this.#is_header_wrn = true;
            }
            let file = this.#file;
            if (typeof this.#wrn == 'string') file = this.#wrn;
            if (is_header)
                LogToFile.wrHeader(this.#header, file);
            LogToFile.write(file, ' ' + ndLogger.WRN + '  ' + txt);
        }
    }

    /**
     * Errors write to log file
     *
     * @param {string} txt
     */
    err (txt) {
        if (this.#is_write_err) {
            let is_header = false;
            if (!this.#is_header_err) {
                if ((this.#file != this.#err || !this.#is_header) &&
                    (this.#wrn  != this.#err || !this.#is_header_wrn)) {
                    is_header = true;
                }
                this.#is_header_err = true;
            }
            let file = this.#file;
            if (typeof this.#err == 'string') file = this.#err;
            if (is_header)
                LogToFile.wrHeader(this.#header, file);
            LogToFile.write(file, ' ' + ndLogger.ERR + '  ' + txt);
        }
    }
}

module.exports = LogToFile;