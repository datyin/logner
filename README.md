# Logner
Simple logger for your NodeJS application.

> NOTE: This module is meant for [Node.JS](https://nodejs.org/) applications, not Web Browser.

<br>

# Installation
```
npm install logner --save
```

<br>

# Usage
To define log directory you need to call .configure function in your application's main file.

* main.js
```javascript
const { resolve } = require('path');
const log = require('logner');

// Basic Usage
log.configure({ rootDir: resolve(__dirname, 'logs') });

// Advanced Usage - Customize all properties
log.configure({
  rootDir: resolve(__dirname, 'logs'),
  logFiles: {
    info: true, // info will be now logged into file
    warn: true, // warn will be now logged into file
    debug: true,
    success: true,
    error: true
  },
  // To Store logs in one directory instead of grouping by date you can use following:
  // output: ./logs/<today>_<type>.log
  logFormat: {
    date: 'YYYYMMDD',
    directoryName: '%root%',
    fileName: '%date%_%type%'
  },
  colors: {
    info: 'cyan',
    warn: 'yellow',
    debug: 'magenta',
    success: 'green',
    error: 'red'
  }
});


log.info('this is info message!');
log.error('this', 'is', 'error', 'message!');
log.warn('this', 'is', 'warning', 'message!');
log.success('this', 'is', { success: 'message' });
log.debug(['this', 'is', 'debug', 'message!']);

// Using chalk. See all chalk options: https://www.npmjs.com/package/chalk#usage
const chalk = require('chalk');
log.info('this', 'is', chalk`{blue CHALK}`, 'message!');
```

* some-other-file.js
```javascript
const log = require('logner');

log.info('this is info message from some-other-file.js!');
```

<br>

# Options
|Key|Type|Description|Required|Default|
|---|----|-----------|--------|-------|
|**rootDir**  |`string`|Log directory path.|:white_check_mark: Yes| N/A |
|**logFiles** |`object`|Toggle which category can log into file.| :white_check_mark: No | See: Options: logFiles |
|**logFormat**|`object`|Change format log files.| :white_check_mark: No | See: Options: logFormat |
|**colors**   |`object`|Change specific category default color.| :white_check_mark: No | See: Options: colors |

<br>

***Options: logFiles***
|Key|Type|Description|Required|Default|
|---|----|-----------|--------|-------|
|**info**   |`boolean` or `number`|Allow 'info' logs to be stored into file.   |No| `false` |
|**warn**   |`boolean` or `number`|Allow 'warning' logs to be stored into file.|No| `false` |
|**debug**  |`boolean` or `number`|Allow 'debug' logs to be stored into file.  |No| `true`  |
|**success**|`boolean` or `number`|Allow 'success' logs to be stored into file.|No| `true`  |
|**error**  |`boolean` or `number`|Allow 'error' logs to be stored into file.  |No| `true`  |

<br>

***Options: logFormat***
- See all available **date** formats [@moment](https://momentjs.com/docs/#/displaying/format/)
- Available **directoryName** shortcuts: `%root%` | `%date%` | `%type%`
- Available **fileName** shortcuts: `%date%` | `%type%`
> Shortcuts:
> - `%root%` = value from **options.rootDir**
> - `%date%` = value from **options.logFormat.date**
> - `%type%` = log type: `INFO` | `WARN` | `DEBUG` | `SUCCESS` | `ERROR`

|Key|Type|Description|Required|Default|
|---|----|-----------|--------|-------|
|**date**          |`string`|Date format for %date% parameter            |No| `YYYY.MM.DD` |
|**directoryName** |`string`|Allow 'warning' logs to be stored into file.|No| `%root%/%date%` |
|**fileName**      |`string`|Allow 'debug' logs to be stored into file.  |No| `%type%`  |

<br>

***Options: colors***
- See all available colors [@chalk](https://www.npmjs.com/package/chalk#colors)

|Key|Type   |Description|Required|Default|
|---|----   |-----------|--------|-------|
|**info**   |`string` |Allow 'info' logs to be stored into file.   |No| `cyan` |
|**warn**   |`string` |Allow 'warning' logs to be stored into file.|No| `yellow` |
|**debug**  |`string` |Allow 'debug' logs to be stored into file.  |No| `magenta` |
|**success**|`string` |Allow 'success' logs to be stored into file.|No| `green` |
|**error**  |`string` |Allow 'error' logs to be stored into file.  |No| `red` |