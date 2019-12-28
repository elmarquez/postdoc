import { Menu } from 'electron';
import * as Darwin from './darwin';
import * as Posix from './posix';

const { NODE_ENV, DEBUG_PROD } = process.env;

/**
 * Application menu builder.
 */
export default class MenuBuilder {

  /**
   * Constructor
   * @param {Electron.Window} mainWindow 
   */
  constructor(mainWindow) {
    this.mainWindow = mainWindow;
  }

  /**
   * Build and return the application menu.
   * @return {Electron.Menu}
   */
  buildMenu() {
    if (NODE_ENV === 'development' || DEBUG_PROD === 'true') {
      this.setupDevelopmentEnvironment(this.mainWindow);
    }
    const { platform } = process;
    const template = platform === 'darwin' ?
      Darwin.buildMenu(this.mainWindow) :
      Posix.buildMenu(this.mainWindow);
    const menu = Menu.buildFromTemplate(template);
    Menu.setApplicationMenu(menu);
    return menu;
  }

  /**
   * Enable development support options.
   * @param {Electron.Window} window - Application window 
   */
  setupDevelopmentEnvironment(window) {
    window.openDevTools();
    window.webContents.on('context-menu', (e, props) => {
      const { x, y } = props;
      Menu.buildFromTemplate([
        {
          label: 'Inspect element',
          click: () => window.inspectElement(x, y)
        }
      ]).popup(window);
    });
  }

}
