import {dialog, remote} from 'electron';
import {pubsub, EVENTS} from '../pubsub';

/**
 * Handle file creation.
 */
function handleFileNew () {
  console.info('file new');
}

/**
 * Handle file save.
 */
function handleFileSave () {
  console.info('file save');
}

/**
 * Handle file save as.
 */
function handleFileSaveAs () {
  console.info('file save as');
}

/**
 * Handle file close.
 */
function handleFileClose () {
  console.info('file close');
}

/**
 * Handle file open action.
 */
function handleFileOpen () {
  console.info('file open');
}

/**
 * Handle project close action.
 */
function handleProjectClose () {
  console.info('project close');
}

/**
 * Handle project open action.
 */
function handleProjectOpen () {
  let config = {
    properties: ['openDirectory', 'createDirectory'],
    title: "Open Project"
  };
  dialog.showOpenDialog(config, function (files) {
    console.info(EVENTS.PROJECT_OPEN, files);
    pubsub.publish(EVENTS.PROJECT_OPEN, files);
  });
}

function handleNewFile () {}

function handleNewProject () {}


/**
 * Handle application quit.
 */
function handleQuit () {}

/**
 * Handle show application info.
 */
function handleShowAboutApplication () {}

/**
 * Handle show application settings.
 */
function handleShowSettings () {}


module.exports = {
  handleProjectOpen: handleProjectOpen
};
