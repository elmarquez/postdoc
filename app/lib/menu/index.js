// import actions from "./actions";
//
// const PLATFORMS = {
//   AIX: "aix",
//   DARWIN: "darwin",
//   FREEBSD: "freebsd",
//   LINUX: "linux",
//   OPENBSD: "openbsd",
//   SUNOS: "sunos",
//   WIN32: "win32"
// };
//
// /**
//  * Create application menu.
//  * @return {nw.Menu} menu
//  */
// function createMenuBar() {
//   // get the platform specific menubar configuration
//   var menubar = null;
//   if (process.platform === PLATFORMS.DARWIN) {
//     menubar = getMacMenuBar();
//   } else {
//     menubar = new nw.Menu({ type: "menubar" });
//   }
//   // file menu
//   var fileMenu = getFileMenu();
//   menubar.append(new nw.MenuItem({ label: "File", submenu: fileMenu }));
//   // edit menu
//   var editMenu = getEditMenu();
//   menubar.append(new nw.MenuItem({ label: "Edit", submenu: editMenu }));
//   // tools menu
//   var toolsMenu = getToolsMenu();
//   menubar.append(new nw.MenuItem({ label: "Tools", submenu: toolsMenu }));
//   // window menu
//   var windowMenu = getWindowMenu();
//   menubar.append(new nw.MenuItem({ label: "Window", submenu: windowMenu }));
//   // help menu
//   var helpMenu = getHelpMenu();
//   menubar.append(new nw.MenuItem({ label: "Help", submenu: helpMenu }));
//   // return menu bar
//   return menubar;
// }
//
// /**
//  * Get edit menu.
//  * @return {nw.Menu} menu
//  */
// function getEditMenu() {
//   var menu = new nw.Menu();
//   menu.append(new nw.MenuItem({ label: "Undo" }));
//   menu.append(new nw.MenuItem({ label: "Redo" }));
//   menu.append(new nw.MenuItem({ type: "separator" }));
//   menu.append(new nw.MenuItem({ label: "Cut" }));
//   menu.append(new nw.MenuItem({ label: "Copy" }));
//   menu.append(new nw.MenuItem({ label: "Paste" }));
//   menu.append(new nw.MenuItem({ label: "Delete" }));
//   menu.append(new nw.MenuItem({ label: "Select All" }));
//   menu.append(new nw.MenuItem({ type: "separator" }));
//   menu.append(new nw.MenuItem({ label: "Find" }));
//   menu.append(new nw.MenuItem({ label: "Replace" }));
//   return menu;
// }
//
// /**
//  * Get file menu.
//  * @return {nw.Menu} menu
//  */
// function getFileMenu() {
//   var createNewFileSubmenu = new nw.Menu();
//   createNewFileSubmenu.append(new nw.MenuItem({ label: "Project", click: actions.project.createProject }));
//   createNewFileSubmenu.append(new nw.MenuItem({ label: "Project from Git Repository" }));
//   createNewFileSubmenu.append(new nw.MenuItem({ type: "separator" }));
//   createNewFileSubmenu.append(new nw.MenuItem({ label: "Directory" }));
//   createNewFileSubmenu.append(new nw.MenuItem({ label: "File" }));
//   createNewFileSubmenu.append(new nw.MenuItem({ type: "separator" }));
//   createNewFileSubmenu.append(new nw.MenuItem({ label: "Bibliography" }));
//   createNewFileSubmenu.append(new nw.MenuItem({ label: "AsciiDoc File" }));
//   createNewFileSubmenu.append(new nw.MenuItem({ label: "JSON File" }));
//   createNewFileSubmenu.append(new nw.MenuItem({ label: "Markdown File" }));
//
//   var recentItemsSubmenu = new nw.Menu();
//   recentItemsSubmenu.append(new nw.MenuItem({ label: "Project 1" }));
//   recentItemsSubmenu.append(new nw.MenuItem({ label: "Project 2" }));
//
//   var menu = new nw.Menu();
//   menu.append(new nw.MenuItem({ label: "New", key: "N", modifiers: "cmd", submenu: createNewFileSubmenu }));
//   menu.append(new nw.MenuItem({ label: "Open", key: "O", modifiers: "cmd" }));
//   menu.append(new nw.MenuItem({ label: "Recent", submenu: recentItemsSubmenu }));
//   menu.append(new nw.MenuItem({ type: "separator" }));
//   menu.append(new nw.MenuItem({ label: "Properties" }));
//   menu.append(new nw.MenuItem({ label: "Save", key: "S", modifiers: "cmd" }));
//   menu.append(new nw.MenuItem({ label: "Save As" }));
//   menu.append(new nw.MenuItem({ type: "separator" }));
//   menu.append(new nw.MenuItem({ label: "Close" }));
//   return menu;
// }
//
// /**
//  * Get Darwin application menu.
//  * @return {nw.Menu} menu
//  */
// function getMacApplicationMenu() {
//   var menu = new nw.Menu();
//   menu.append(new nw.MenuItem({ label: "About postdoc" }));
//   menu.append(new nw.MenuItem({ label: "Check for updates" }));
//   menu.append(new nw.MenuItem({ type: "separator" }));
//   menu.append(new nw.MenuItem({ label: "Preferences" }));
//   menu.append(new nw.MenuItem({ type: "separator" }));
//   menu.append(new nw.MenuItem({ label: "Hide postdoc" }));
//   menu.append(new nw.MenuItem({ type: "separator" }));
//   menu.append(new nw.MenuItem({ label: "Quit", click: actions.handleQuit }));
//   return menu;
// }
//
// /**
//  * Get Darwin menu bar.
//  * @return {nw.Menu} menu
//  */
// function getMacMenuBar() {
//   const manifest = nw.App.manifest;
//   var menubar = new nw.Menu({ type: "menubar" });
//   menubar.createMacBuiltin(manifest.name, { hideEdit: true, hideWindow: true });
//   return menubar;
// }
//
// /**
//  * Get tools menu.
//  * @return {nw.Menu} menu
//  */
// function getToolsMenu() {
//   var menu = new nw.Menu();
//   menu.append(new nw.MenuItem({ label: "Plugin" }));
//   menu.append(new nw.MenuItem({ label: "Plugin" }));
//   menu.append(new nw.MenuItem({ type: "separator" }));
//   menu.append(new nw.MenuItem({ label: "Plugin" }));
//   menu.append(new nw.MenuItem({ label: "Plugin" }));
//   menu.append(new nw.MenuItem({ label: "Plugin" }));
//   menu.append(new nw.MenuItem({ type: "separator" }));
//   menu.append(new nw.MenuItem({ label: "Get extensions" }));
//   return menu;
// }
//
// /**
//  * Get window menu.
//  * @return {nw.Menu} menu
//  */
// function getWindowMenu() {
//   var menu = new nw.Menu();
//   menu.append(new nw.MenuItem({ label: "Minimize" }));
//   menu.append(new nw.MenuItem({ label: "Zoom" }));
//   menu.append(new nw.MenuItem({ type: "separator" }));
//   menu.append(new nw.MenuItem({ label: "Outline", type: "checkbox" }));
//   menu.append(new nw.MenuItem({ label: "Status Bar", type: "checkbox"  }));
//   menu.append(new nw.MenuItem({ type: "separator" }));
//   menu.append(new nw.MenuItem({ label: "Bring all to Front" }));
//   menu.append(new nw.MenuItem({ label: "Developer Tools" }));
//   return menu;
// }
//
// /**
//  * Get help menu.
//  * @return {nw.Menu} menu
//  */
// function getHelpMenu() {
//   var menu = new nw.Menu();
//   menu.append(new nw.MenuItem({ label: "Search" }));
//   menu.append(new nw.MenuItem({ label: "Help" }));
//   menu.append(new nw.MenuItem({ type: "separator" }));
//   menu.append(new nw.MenuItem({ label: "Web site" }));
//   menu.append(new nw.MenuItem({ label: "Discussion forum" }));
//   return menu;
// }
//
// export default {
//   createMenuBar
// };
