const { resolve } = require('path');
const log = require('./index.js');

log.configure({
  rootDir: resolve(__dirname, 'logs'),
  logFiles: {
    info: false,
    warn: false,
    debug: true,
    success: true,
    error: true
  },
  logFormat: {
    date: 'YYYY.MM.DD',
    directoryName: '%root%/%date%',
    fileName: '%type%'
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

// Using chalk
const chalk = require('chalk');
log.info('this', 'is', chalk`{blue CHALK}`, 'message!');
