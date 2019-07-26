const req = require('./index');
const con = require('./lib/LogToConsole');

const err = req.ERR;

let opt = {};
opt[err] = __dirname + '/log/err.log';

const logToConsole = req.getLogToConsole();
con.setTime();
con.setFloat(false);
const logToFile = req.getLogToFile('Example work ndLogger class', __dirname + '/log/example.log', opt);
const ndLogger = new req(logToFile);
//const ndLogger = new req(logToConsole, logToFile);
//const ndLogger = new req(logToConsole);
con.float('Hello');
ndLogger.msg('Start application');

ndLogger.err('Error 1');

con.float('Hello 1');
logToConsole.off(err);
//logToFile.off(err);

con.float('Hello 2');
ndLogger.err('Error 2');

con.float('Hello 3');
ndLogger.msg('Stop application');

con.float('End');