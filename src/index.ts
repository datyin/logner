import { appendFile, ensureDirSync } from 'fs-extra';
import moment from 'moment';
import cp from 'chalk';

let ROOT_DIR = '';

const logOptions: Logner.FileOptions = {
  info: false,
  warn: false,
  debug: true,
  success: true,
  error: true
};

const logColors: Logner.ColorOptions = {
  info: 'cyan',
  warn: 'yellow',
  debug: 'magenta',
  success: 'green',
  error: 'red'
};

const logFormat: Logner.LogFormat = {
  date: 'YYYY.MM.DD',
  directoryName: '%root%/%date%',
  fileName: '%type%'
};

const allTypes = ['info', 'warn', 'debug', 'success', 'error'];

function configure(opt: Logner.Options): void {
  ROOT_DIR = opt?.rootDir?.trim();

  allTypes.forEach((type: string) => {
    const index = type as Logner.AvailableType;

    // Log file options
    if (opt?.logFiles && typeof opt.logFiles[index] !== 'undefined') {
      const newValue = opt.logFiles[index] === 1 || opt.logFiles[index] === true ? true : false;
      logOptions[index] = newValue;
    }

    // Color Options
    if (opt?.colors && typeof opt.colors[index] !== 'undefined') {
      logColors[index] = opt.colors[index]?.trim() || logColors[index];
    }
  });

  // Log Format
  logFormat.date = opt.logFormat?.date?.trim() || logFormat.date;
  logFormat.directoryName = opt.logFormat?.directoryName?.trim() || logFormat.directoryName;
  logFormat.fileName = opt.logFormat?.fileName?.trim() || logFormat.fileName;
}

async function print_message(type: string, ...args: any): Promise<void> {
  const now = moment();

  const typeUpperCased = type.toUpperCase();
  let typeColoredLabel = cp`{${logColors[type as Logner.AvailableType]} ${typeUpperCased}}`;
  const canLogIntoFile = logOptions[type as Logner.AvailableType];

  const time = now.format('HH:mm:ss');
  console.log(cp`[${typeColoredLabel}] {gray.bold ${time}}`, ...args);

  if (ROOT_DIR && canLogIntoFile) {
    const today = now.format(logFormat.date || 'YYYY.MM.DD');

    try {
      let logDir =
        logFormat.directoryName
          ?.replace(new RegExp('%root%', 'gi'), ROOT_DIR)
          .replace(new RegExp('%date%', 'gi'), today)
          .replace(new RegExp('%type%', 'gi'), type) || `${ROOT_DIR}`;

      let fileName =
        logFormat.fileName
          ?.replace(new RegExp('%date%', 'gi'), today)
          .replace(new RegExp('%type%', 'gi'), type) || `${today}_${type}`;

      ensureDirSync(logDir);

      appendFile(
        `${logDir}/${fileName}.log`,
        `${now.format('YYYY.MM.DD HH:mm:ss.SSS')} ${type} ${JSON.stringify([...args])}\r\n`,
        {
          encoding: 'utf8'
        }
      );
    } catch (err) {
      console.log(
        cp`[{${logColors.error} ERROR}] {gray.bold ${time}}`,
        'Failed to write log file.',
        err?.message
      );
    }
  }
}

function info(...args: any): void {
  print_message('info', ...args);
}

function warn(...args: any): void {
  print_message('warn', ...args);
}

function error(...args: any): void {
  print_message('error', ...args);
}

function success(...args: any): void {
  print_message('success', ...args);
}

function debug(...args: any): void {
  print_message('debug', ...args);
}

export = {
  configure,
  info,
  warn,
  error,
  success,
  debug
};
