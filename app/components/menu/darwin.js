import { PROJECT } from '../../store/types';

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
        label: 'Preferences',
        selector: 'preferences:'
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
        click: () => console.info('quit application')
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
        click: (item, win) => win.webContents.send(item.selector),
        label: 'New File',
        selector: PROJECT.CREATE_FILE,
      },
      {
        accelerator: 'Command+Shift+N',
        click: (item, win) => win.webContents.send(item.selector),
        label: 'New Project',
        selector: PROJECT.CREATE_PROJECT
      },
      {
        type: 'separator'
      },
      {
        accelerator: 'Command+O',
        click: (item, win) => win.webContents.send(item.selector),
        label: 'Open File',
        selector: PROJECT.OPEN_FILE
      },
      {
        accelerator: 'Command+Shift+O',
        click: (item, win) => win.webContents.send(item.selector),
        label: 'Open Project',
        selector: 'file:open:project'
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
