import actions from "./actions";

const PLATFORMS = {
  AIX: "aix",
  DARWIN: "darwin",
  FREEBSD: "freebsd",
  LINUX: "linux",
  OPENBSD: "openbsd",
  SUNOS: "sunos",
  WIN32: "win32"
};

/**
 * Create application menu bar.
 * @return {nw.Menu} menu bar
 */
function createMenuBar() {
  // get the platform specific menubar configuration
  var menubar = null;
  if (process.platform === PLATFORMS.DARWIN) {
    menubar = getMacMenuBar();
  } else {
    menubar = new nw.Menu({ type: "menubar" });
  }
  // file menu
  var fileMenu = getFileMenu();
  menubar.append(new nw.MenuItem({ label: "File", submenu: fileMenu }));
  // edit menu
  var editMenu = getEditMenu();
  menubar.append(new nw.MenuItem({ label: "Edit", submenu: editMenu }));
  // tools menu
  var toolsMenu = getToolsMenu();
  menubar.append(new nw.MenuItem({ label: "Tools", submenu: toolsMenu }));
  // window menu
  var windowMenu = getWindowMenu();
  menubar.append(new nw.MenuItem({ label: "Window", submenu: windowMenu }));
  // help menu
  var helpMenu = getHelpMenu();
  menubar.append(new nw.MenuItem({ label: "Help", submenu: helpMenu }));
  // return menu bar
  return menubar;
}

function getEditMenu() {
  var menu = new nw.Menu();
  menu.append(new nw.MenuItem({ label: "Undo" }));
  menu.append(new nw.MenuItem({ label: "Redo" }));
  menu.append(new nw.MenuItem({ type: "separator" }));
  menu.append(new nw.MenuItem({ label: "Cut" }));
  menu.append(new nw.MenuItem({ label: "Copy" }));
  menu.append(new nw.MenuItem({ label: "Paste" }));
  menu.append(new nw.MenuItem({ label: "Select All" }));
  return menu;
}

function getFileMenu() {
  var menu = new nw.Menu();
  menu.append(new nw.MenuItem({ label: "New Project" }));
  menu.append(new nw.MenuItem({ label: "New File" }));
  menu.append(new nw.MenuItem({ type: "separator" }));
  menu.append(new nw.MenuItem({ label: "Open" }));
  menu.append(new nw.MenuItem({ type: "separator" }));
  menu.append(new nw.MenuItem({ label: "Properties" }));
  menu.append(new nw.MenuItem({ label: "Save" }));
  menu.append(new nw.MenuItem({ label: "Save As" }));
  menu.append(new nw.MenuItem({ label: "Save All" }));
  menu.append(new nw.MenuItem({ type: "separator" }));
  menu.append(new nw.MenuItem({ label: "Close" }));
  return menu;
}

function getMacApplicationMenu() {
  var menu = new nw.Menu();
  menu.append(new nw.MenuItem({ label: "About postdoc" }));
  menu.append(new nw.MenuItem({ label: "Check for updates" }));
  menu.append(new nw.MenuItem({ type: "separator" }));
  menu.append(new nw.MenuItem({ label: "Preferences" }));
  menu.append(new nw.MenuItem({ type: "separator" }));
  menu.append(new nw.MenuItem({ label: "Hide postdoc" }));
  menu.append(new nw.MenuItem({ type: "separator" }));
  menu.append(new nw.MenuItem({ label: "Quit", click: actions.handleQuit }));
  return menu;
}

/**
 * Get Mac OS menu bar.
 * @return {nw.Menu} menu bar
 */
function getMacMenuBar() {
  const manifest = nw.App.manifest;
  var menubar = new nw.Menu({ type: "menubar" });
  menubar.createMacBuiltin(manifest.name, { hideEdit: true, hideWindow: true });
  return menubar;
}

function getToolsMenu() {
  var menu = new nw.Menu();
  menu.append(new nw.MenuItem({ label: "Plugin" }));
  menu.append(new nw.MenuItem({ label: "Plugin" }));
  menu.append(new nw.MenuItem({ type: "separator" }));
  menu.append(new nw.MenuItem({ label: "Plugin" }));
  menu.append(new nw.MenuItem({ label: "Plugin" }));
  menu.append(new nw.MenuItem({ label: "Plugin" }));
  menu.append(new nw.MenuItem({ type: "separator" }));
  menu.append(new nw.MenuItem({ label: "Get extensions" }));
  return menu;
}

function getWindowMenu() {
  var menu = new nw.Menu();
  menu.append(new nw.MenuItem({ label: "Minimize" }));
  menu.append(new nw.MenuItem({ label: "Zoom" }));
  menu.append(new nw.MenuItem({ type: "separator" }));
  menu.append(new nw.MenuItem({ label: "Outline", type: "checkbox" }));
  menu.append(new nw.MenuItem({ label: "Status Bar", type: "checkbox"  }));
  menu.append(new nw.MenuItem({ type: "separator" }));
  menu.append(new nw.MenuItem({ label: "Bring all to front" }));
  return menu;
}

function getHelpMenu() {
  var menu = new nw.Menu();
  menu.append(new nw.MenuItem({ label: "Search" }));
  menu.append(new nw.MenuItem({ label: "Help" }));
  menu.append(new nw.MenuItem({ type: "separator" }));
  menu.append(new nw.MenuItem({ label: "Web site" }));
  menu.append(new nw.MenuItem({ label: "Discussion forum" }));
  return menu;
}

export default {
  createMenuBar
};
