import dialog from 'nw-dialog';
import os from 'os';

// bind dialog to document
dialog.setContext(document);

/**
 * Create project scaffold.
 * @param {String} dir - Pdirectory
 * @return {Promise}
 */
function createProject() {
  // TODO get the documents folder
  const home = os.homedir();
  dialog.folderBrowserDialog(function(res) {
    console.info('selected', res);
  });
}

/**
 * Clone project to a target directory.
 * @param {String} parent - Parent directory
 * @return {Promise}
 */
function cloneProject() {
  // TODO get the documents folder
  const home = os.homedir();
  dialog.folderBrowserDialog(function(res) {
    console.info('selected', res);
  });
}

/**
 * Handle project close action.
 */
function handleProjectClose() {
  throw new Error('not implemented');
}

/**
 * Handle project open action.
 */
function handleProjectOpen() {
  throw new Error('not implemented');
}

function handleNewProject() {
  throw new Error('not implemented');
}

export default {
  createProject,
  cloneProject,
  handleProjectClose,
  handleProjectOpen
};
