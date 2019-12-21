import {
  app,
  Menu,
  shell,
  BrowserWindow
} from 'electron';

/**
 * Build Mac OS application menu.
 * @param {electron.Window} window - Application window
 * @return {electron.Menu}
 */
function buildMenu(mainWindow) {
  const subMenuAbout = getAboutMenu(mainWindow);
  const fileMenu = getFileMenu(mainWindow);
  const subMenuEdit = getEditMenu(mainWindow);
  const subMenuViewDev = getViewMenuDev(mainWindow);
  const subMenuViewProd = getViewMenuProd(mainWindow);
  const subMenuWindow = getWindowMenu(mainWindow);
  const subMenuHelp = getHelpMenu(mainWindow);

  const subMenuView =
    process.env.NODE_ENV === 'development' ? subMenuViewDev : subMenuViewProd;

  return [subMenuAbout, fileMenu, subMenuEdit, subMenuView, subMenuWindow, subMenuHelp];
}

/**
 * Get about menu.
 */
function getAboutMenu() {
  return {
    label: 'postdoc',
    submenu: [{
        label: 'About postdoc',
        selector: 'orderFrontStandardAboutPanel:'
      },
      {
        type: 'separator'
      },
      {
        label: 'Services',
        submenu: []
      },
      {
        type: 'separator'
      },
      {
        label: 'Hide postdoc',
        accelerator: 'Command+H',
        selector: 'hide:'
      },
      {
        label: 'Hide Others',
        accelerator: 'Command+Shift+H',
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
        label: 'Quit',
        accelerator: 'Command+Q',
        click: () => app.quit()
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
        label: 'New File',
        accelerator: 'Command+N',
        selector: 'new:file'
      },
      {
        label: 'New Project',
        accelerator: 'Command+Shift+N',
        selector: 'new:project'
      },
      {
        type: 'separator'
      },
      {
        label: 'Open File',
        accelerator: 'Command+O',
        selector: 'file:open'
      },
      {
        label: 'Open Project',
        accelerator: 'Command+Shift+O',
        selector: 'file:open:project'
      },
      {
        label: 'Save',
        accelerator: 'Command+S',
        selector: 'file:save'
      },
      {
        label: 'Save As',
        accelerator: 'Command+Shift+S',
        selector: 'file:save:as'
      },
      {
        label: 'Save All',
        selector: 'file:save:all'
      },
      {
        type: 'separator'
      },
      {
        label: 'Close',
        accelerator: 'Command+W',
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
        click() {
          shell.openExternal('http://electron.atom.io');
        }
      },
      {
        label: 'Documentation',
        click() {
          shell.openExternal(
            'https://github.com/atom/electron/tree/master/docs#readme'
          );
        }
      },
      {
        label: 'Community Discussions',
        click() {
          shell.openExternal('https://discuss.atom.io/c/electron');
        }
      },
      {
        label: 'Search Issues',
        click() {
          shell.openExternal('https://github.com/atom/electron/issues');
        }
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
