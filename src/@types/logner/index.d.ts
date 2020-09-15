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
