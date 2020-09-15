declare namespace Logner {
  export interface ColorOptions {
    info?: string;
    warn?: string;
    debug?: string;
    success?: string;
    error?: string;
  }

  export interface LogFormat {
    date?: string | undefined;
    directoryName?: string;
    fileName?: string;
  }

  export interface FileOptions {
    info?: boolean | number;
    warn?: boolean | number;
    debug?: boolean | number;
    success?: boolean | number;
    error?: boolean | number;
  }

  export interface Options {
    rootDir: string;
    logFiles?: FileOptions;
    logFormat?: LogFormat;
    colors?: ColorOptions;
  }

  export type AvailableType = 'info' | 'warn' | 'debug' | 'success' | 'error';
}

declare function configure(opt: Logner.Options): void;
declare function info(...args: any): void;
declare function warn(...args: any): void;
declare function error(...args: any): void;
declare function success(...args: any): void;
declare function debug(...args: any): void;
declare const _default: {
  configure: typeof configure;
  info: typeof info;
  warn: typeof warn;
  error: typeof error;
  success: typeof success;
  debug: typeof debug;
};
export = _default;
