import { app } from 'electron';
import { APP, PROJECT } from '../../store/types';

/**
 * Build Mac OS application menu.
 * @param {electron.Window} window - Application window
 * @return {electron.Menu}
 */
function buildMenu(mainWindow) {
  const aboutMenu = getAboutMenu(mainWindow);
  const fileMenu = getFileMenu(mainWindow);
  const subMenuEdit = getEditMenu(mainWindow);
  const subMenuViewDev = getViewMenuDev(mainWindow);
  const subMenuViewProd = getViewMenuProd(mainWindow);
  const subMenuWindow = getWindowMenu(mainWindow);
  const subMenuHelp = getHelpMenu(mainWindow);

  const subMenuView =
    process.env.NODE_ENV === 'development' ? subMenuViewDev : subMenuViewProd;

  return [aboutMenu, fileMenu, subMenuEdit, subMenuView, subMenuWindow, subMenuHelp];
}

/**
 * Get about menu.
 * @param {electron.BrowserWindow} window - Application window
 */
function getAboutMenu(window) {
  return {
    label: 'postdoc',
    submenu: [
      {
        click: (item, win) => win.webContents.send(APP.SHOW_ABOUT),
        label: 'About postdoc',
      },
      {
        type: 'separator'
      },
      {
        click: (item, win) => win.webContents.send(APP.SHOW_PREFERENCES),
        label: 'Preferences',
      },
      {
        type: 'separator'
      },
      {
        accelerator: 'Command+H',
        label: 'Hide postdoc',
        selector: 'hide:'
      },
      {
        accelerator: 'Command+Shift+H',
        label: 'Hide Others',
        selector: 'hideOtherApplications:'
      },
      {
        label: 'Show All',
        selector: 'unhideAllApplications:'
      },
      {
        type: 'separator'
      },
      {
        accelerator: 'Command+Q',
        label: 'Quit',
        click: () => {
          // TODO save application state then close window, quit the application after timeout
          window.close();
          app.quit();
        }
      }
    ]
  };
}

/**
 * Get application edit menu.
 * @param {electron.Window} window - Application window
 * @return {electron.Menu} menu
 */
function getEditMenu(window) {
  return {
    label: 'Edit',
    submenu: [{
        label: 'Undo',
        accelerator: 'Command+Z',
        selector: 'undo:'
      },
      {
        label: 'Redo',
        accelerator: 'Shift+Command+Z',
        selector: 'redo:'
      },
      {
        type: 'separator'
      },
      {
        label: 'Cut',
        accelerator: 'Command+X',
        selector: 'cut:'
      },
      {
        label: 'Copy',
        accelerator: 'Command+C',
        selector: 'copy:'
      },
      {
        label: 'Paste',
        accelerator: 'Command+V',
        selector: 'paste:'
      },
      {
        label: 'Select All',
        accelerator: 'Command+A',
        selector: 'selectAll:'
      }
    ]
  };
}

/**
 * Get application file menu.
 * @param {electron.Window} window - Application window
 * @return {electron.Menu} menu 
 */
function getFileMenu(window) {
  return {
    label: 'File',
    submenu: [{
        accelerator: 'Command+N',
        click: (item, win) => win.webContents.send(PROJECT.CREATE_FILE),
        label: 'New File'
      },
      {
        accelerator: 'Command+Shift+N',
        click: (item, win) => win.webContents.send(PROJECT.CREATE_PROJECT),
        label: 'New Project'
      },
      {
        type: 'separator'
      },
      {
        accelerator: 'Command+O',
        click: (item, win) => win.webContents.send(PROJECT.OPEN_FILE),
        label: 'Open File'
      },
      {
        accelerator: 'Command+Shift+O',
        click: (item, win) => win.webContents.send(PROJECT.OPEN_PROJECT),
        label: 'Open Project'
      },
      {
        accelerator: 'Command+S',
        click: (item, win) => win.webContents.send(item.selector),
        label: 'Save',
        selector: 'file:save'
      },
      {
        accelerator: 'Command+Shift+S',
        click: (item, win) => win.webContents.send(item.selector),
        label: 'Save As',
        selector: 'file:save:as'
      },
      {
        click: (item, win) => win.webContents.send(item.selector),
        label: 'Save All',
        selector: 'file:save:all'
      },
      {
        type: 'separator'
      },
      {
        accelerator: 'Command+W',
        click: (item, win) => win.webContents.send(item.selector),
        label: 'Close',
        selector: 'file:close'
      },
    ]
  };
}

/**
 * Get application help menu.
 * @param {electron.Window} window - Application window
 * @return {electron.Menu} menu 
 */
function getHelpMenu(window) {
  return {
    label: 'Help',
    submenu: [{
        label: 'Learn More',
        click: () => console.info('click')
      },
      {
        label: 'Documentation',
        click: () => console.info('click')
      },
      {
        label: 'Community Discussions',
        click: () => console.info('click')
      },
      {
        label: 'Search Issues',
        click: () => console.info('click')
      }
    ]
  };
}

/**
 * Get application view menu.
 * @param {electron.Window} window - Application window
 * @return {electron.Menu} menu 
 */
function getViewMenuDev(window) {
  return {
    label: 'View',
    submenu: [{
        label: 'Reload',
        accelerator: 'Command+R',
        click: () => window.webContents.reload()
      },
      {
        label: 'Toggle Full Screen',
        accelerator: 'Ctrl+Command+F',
        click: () => window.setFullScreen(!window.isFullScreen())
      },
      {
        label: 'Toggle Developer Tools',
        accelerator: 'Alt+Command+I',
        click: () => window.toggleDevTools()
      }
    ]
  };
}

/**
 * Get application view menu.
 * @param {electron.Window} window - Application window
 * @return {electron.Menu} menu 
 */
function getViewMenuProd(window) {
  return {
    label: 'View',
    submenu: [{
      label: 'Toggle Full Screen',
      accelerator: 'Ctrl+Command+F',
      click: () => window.setFullScreen(!window.isFullScreen())
    }]
  };
}

/**
 * Get application window menu.
 * @param {Electron.Window} window - Application window
 * @return {Electron.Menu} menu 
 */
function getWindowMenu(window) {
  return {
    label: 'Window',
    submenu: [{
        label: 'Minimize',
        accelerator: 'Command+M',
        selector: 'performMiniaturize:'
      },
      {
        label: 'Close',
        accelerator: 'Command+W',
        selector: 'performClose:'
      },
      {
        type: 'separator'
      },
      {
        label: 'Bring All to Front',
        selector: 'arrangeInFront:'
      }
    ]
  };
}

export {
  buildMenu
};
