import {app, Menu} from 'electron';
import actions from './actions';

/**
 * Create application menu bar.
 */
function createApplicationMenuBar() {
  var menu = Menu.buildFromTemplate([
    getApplicationMenu(),
    getFileMenu(),
    getEditMenu(),
    getViewMenu(),
    getHelpMenu()
  ]);
  Menu.setApplicationMenu(menu);
}

/**
 * Get Mac application menu.
 * @returns {Object}
 */
function getApplicationMenu () {
  return {
    label: 'postdoc',
    submenu: [
      {label: 'About'},
      {label: 'Check for Updates'},
      {type: 'separator'},
      {label: 'Preferences'},
      {type: 'separator'},
      {label: 'Hide postdoc'},
      {label: 'Hide others'},
      {type: 'separator'},
      {
        accelerator: 'CmdOrCtrl+Q',
        label: 'Quit',
        click: () => app.quit()
      }
    ]
  };
}

/**
 * Get file menu.
 * @returns {Object}
 */
function getFileMenu () {
  return {
    label: 'File',
    submenu: [
      {label: 'New', accelerator: 'CmdOrCtrl+N', click: actions.handleFileNew},
      {label: 'Open Project', accelerator: 'CmdOrCtrl+O', click: actions.handleProjectOpen},
      {label: 'Save As', accelerator: 'CmdOrCtrl+Shift+A'}
    ]
  };
}

/**
 * Get edit menu.
 * @returns {Object}
 */
function getEditMenu () {
 return {
   label: 'Edit',
   submenu: [
     {label:'Undo', accelerator: 'CmdOrCtrl+Z'},
     {label:'Redo', accelerator: 'CmdOrCtrl+Shift+Z'},
     {type:'separator'},
     {label:'Cut', accelerator: 'CmdOrCtrl+X'},
     {label:'Copy', accelerator: 'CmdOrCtrl+C'},
     {label:'Paste', accelerator: 'CmdOrCtrl+V'},
     {type:'separator'},
     {label:'Find', accelerator: 'CmdOrCtrl+F'},
     {label:'Replace', accelerator: 'CmdOrCtrl+Shift+F'}
   ]
 }
}

/**
 * Get view menu.
 * @returns {Object}
 */
function getViewMenu () {
  return {
    label: 'View',
    submenu: [
      {label:'Project'},
      {label:'Editor'},
      {label:'Git'},
      {label:'Terminal'},
      {label:'Settings'}
    ]
  }
}

/**
 * Get help menu.
 * @returns {Object}
 */
function getHelpMenu () {
  return {
    label: 'Help',
    submenu: [
      {label:'Search'},
      {type:'separator'},
      {label:'Project Git repository'},
      {label:'File a Bug Report'},
      {label:'Project Website'}
    ]
  };
}

module.exports = {
  createApplicationMenuBar
};
