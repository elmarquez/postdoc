/* eslint global-require: off, func-names:0 */
/**
 * This module executes inside of electron's main process. You can start
 * electron renderer process from here and communicate with the other processes
 * through IPC.
 *
 * When running `yarn build` or `yarn build-main`, this file is compiled to
 * `./app/main.prod.js` using webpack. This gives us some performance wins.
 */
import { app, BrowserWindow } from 'electron';
import { autoUpdater } from 'electron-updater';
import log from 'electron-log';
import pkg from './package.json';
import MenuBuilder from './components/menu';

const { env, platform } = process;
const { DEBUG_PROD, NODE_ENV, START_MINIMIZED, UPGRADE_EXTENSIONS } = env;

/**
 * Application updater.
 */
export default class AppUpdater {
  /**
   * Constructor
   */
  constructor() {
    log.transports.file.level = 'info';
    autoUpdater.logger = log;
    autoUpdater.checkForUpdatesAndNotify();
  }
}

let mainWindow = null;

if (NODE_ENV === 'production') {
  const sourceMapSupport = require('source-map-support');
  sourceMapSupport.install();
}

if (NODE_ENV === 'development' || DEBUG_PROD === 'true') {
  require('electron-debug')();
}

/**
 * Install application extensions.
 */
const installExtensions = async () => {
  const installer = require('electron-devtools-installer');
  const forceDownload = !!UPGRADE_EXTENSIONS;
  const extensions = ['REACT_DEVELOPER_TOOLS', 'REDUX_DEVTOOLS'];

  return Promise.all(
    extensions.map(name => installer.default(installer[name], forceDownload))
  ).catch(console.log);
};

/**
 * Create application window.
 */
const createWindow = async () => {
  if (NODE_ENV === 'development' || DEBUG_PROD === 'true') {
    await installExtensions();
  }

  mainWindow = new BrowserWindow({
    height: 728,
    show: false,
    title: 'postdoc',
    webPreferences: {
      nodeIntegration: true
    },
    width: 1024
  });

  mainWindow.loadURL(`file://${__dirname}/app.html`);

  // @TODO: Use 'ready-to-show' event
  //        https://github.com/electron/electron/blob/master/docs/api/browser-window.md#using-ready-to-show-event
  mainWindow.webContents.on('did-finish-load', function() {
    if (!mainWindow) {
      throw new Error('"mainWindow" is not defined');
    }
    if (START_MINIMIZED) {
      mainWindow.minimize();
    } else {
      mainWindow.show();
      mainWindow.focus();
    }
  });

  mainWindow.on('closed', function() {
    mainWindow = null;
  });

  const menuBuilder = new MenuBuilder(mainWindow);
  menuBuilder.buildMenu();

  // Remove this if your app does not use auto updates
  // eslint-disable-next-line
  new AppUpdater();
};

/**
 * Handle application activate event.
 */
app.on('activate', function() {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) createWindow();
});

/**
 * Handle application ready event.
 */
app.on('ready', createWindow);

/**
 * Handle application window-all-closed event.
 */
app.on('window-all-closed', function() {
  // Respect the OSX convention of having the application in memory even
  // after all windows have been closed
  if (platform !== 'darwin') {
    app.quit();
  }
});

// set application name
app.name = pkg.name;

// Set application metadata.
app.setAboutPanelOptions({
  applicationName: pkg.name,
  applicationVersion: pkg.version,
  version: pkg.version,
  authors: 'Davis Marques',
  copyright: 'Copyright (c) 2019-present Davis Marques',
  website: 'https://elmarquez.github.io/postdoc'
});
