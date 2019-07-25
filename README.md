ndLogger - logger library for NodeJs
====================================

This little library for logger NodeJs applications.

<!-- [START getstarted] -->
## Getting Started

### Installation

To use ndLogger in your project, run:

```bash
npm i ndLogger
# or "yarn add ndLogger"
```

### Usage

Save file as **example.js**

```js
const req = require('./index');
const con = require('./lib/LogToConsole');

const err = req.ERR;

let opt = {};
opt[err] = __dirname + '/log/err.log';

const logToConsole = req.getLogToConsole();
con.setTime();
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
```

Execute script on the command line

```bash
node example.js
```