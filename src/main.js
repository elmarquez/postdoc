import electron, {app, BrowserWindow, remote} from 'electron';
import isDevelopment from 'electron-is-dev';
import path from 'path';
import pubsub from './lib/pubsub';
import url from 'url';

import menu from './lib/menu';

// make the pubsub library available in both electron and brower scopes
global.pubsub = pubsub;

// main window
var mainWindow;

// assign application event handlers
app.on('activate', handleAppActivate);
app.on('ready', handleAppReady);
app.on('window-all-closed', handleAppWindowAllClosed);

// configure the application
app.setName('postdoc'); // TODO name from configuration


/**
 * Handle application activated event.
 */
function handleAppActivate () {
  if (mainWindow === null) {
    createWindow();
  }
}

/**
 * Handle application ready event.
 */
function handleAppReady () {
  // create the main application window
  mainWindow = new BrowserWindow({width: 800, height: 600}); // TODO resize to fit the screen
  // load user interface
  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }));
  // configure the window
  menu.createApplicationMenuBar();
  mainWindow.maximize();
  if (isDevelopment) {
    mainWindow.webContents.openDevTools();
  }
  // add window event handlers
  mainWindow.on('closed', handleWindowClosed);
}

/**
 * Handle application window all closed event.
 */
function handleAppWindowAllClosed () {
  if (process.platform !== 'darwin') {
    app.quit()
  }
}

/**
 * Handle main window closed event.
 */
function handleWindowClosed () {
  mainWindow = null;
}
