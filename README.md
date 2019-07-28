ndLogger - logger library for NodeJs
====================================

## Quick Start

This guide will show you how to set up a simple application using Node.js and ndLogger


### Create the `package.json` file

First, create a directory where your application will live.

```bash
mkdir myproject
cd myproject
```

Enter the following command and answer the questions to create the initial structure for your new project:

```bash
npm init
```

Next, install the driver dependency.

```bash
npm install ndlogger --save
```

You should see **NPM** download a lot of files. Once it's done you'll find all the downloaded packages under the **node_modules** directory. 

### Usage

Save file as **example.js**

```js
const fs   = require('fs');
const req  = require('ndlogger');
const con  = require('ndlogger/lib/LogToConsole');

con.setTime();

const err = req.ERR;

let opt = {};
opt[err] = __dirname + '/log/err.log';

const logToConsole = req.getLogToConsole();
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
node sample.js
```