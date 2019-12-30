import { PROJECT } from '../types';
import Project from '../../lib/project';
import files from '../../lib/utils/files';

const { dialog } = require('electron');

/**
 * Add file.
 * @param {String} fp - File path
 * @returns {Object}
 */
function addFile(fp) {
  return { type: PROJECT.ADD_FILE, path: fp };
}

/**
 * Add tag.
 * @param {String} tag - Tag
 * @returns {Object}
 */
function addTag(tag) {
  return { type: PROJECT.ADD_FILE, tag };
}

/**
 * Close file. Before calling this function, you should prompt the user to
 * persist the file state.
 * @param {String} fp - File path
 * @returns {object}
 */
function closeFile(fp) {

}

/**
 * Create project.
 * @returns {Object}
 */
function createProject() {
  return {
    type: PROJECT.CREATE_PROJECT,
    payload: Promise.resolve(path)
  };
}

/**
 * Delete file.
 * @param {String} fp - File path
 * @returns {Object}
 */
function deleteFile(fp) {
  return { type: PROJECT.DELETE_FILE, path: fp };
}

/**
 * Delete tag.
 * @param {String} tag - Tag
 * @returns {Object}
 */
function deleteTag(tag) {
  return { type: PROJECT.DELETE_TAG, tag };
}

/**
 * Load file tree.
 * @param {String} fp - Library path
 * @returns {object}
 */
function loadFileTree(fp) {
  return {
    type: PROJECT.LOAD_FILE_TREE,
    payload: Project.loadFileTree(fp)
  };
}

/**
 * Get library index.
 * @param {String} fp - Library path
 * @returns {Function}
 */
function loadIndex(fp) {
  return {
    type: PROJECT.LOAD_INDEX,
    payload: Project.loadIndex(fp)
  };
}

/**
 * Open file.
 * @param {String} fp - File path
 * @returns {object}
 */
function openFile(fp) {
  return {
    type: PROJECT.OPEN_FILE,
    payload: files.readFile(fp)
  };
}

/**
 * Open new project folder.
 * @param {String} fp - Project path
 * @returns {object}
 */
function openProject(fp) {
  return {
    type: PROJECT.OPEN_PROJECT,
    payload: Promise.resolve(fp)
  };
}

/**
 * Update file record.
 * @param {String} fp - File path
 * @returns {Object}
 */
function updateFile(fp) {
  throw new Error('not implemented');
}

/**
 * Reindex the library, merge changes into the existing index file.
 * @param {String} fp - Library path
 * @returns {Object}
 */
function updateIndex(fp, data) {
  return {
    type: PROJECT.UPDATE_INDEX,
    payload: Project.updateIndex(fp)
  };
}

/**
 * Update tag.
 * @param {String} tag - Tag
 * @return {Object}
 */
function updateTag(tag) {
  throw new Error('not implemented');
}

/**
 * Write library index to the file system.
 * @param {String} fp - Library path
 * @param {Object} data - Index data
 * @returns {Object}
 */
function writeIndex() {
  throw new Error('not implemented');
}

export {
  addFile,
  addTag,
  createProject,
  deleteFile,
  deleteTag,
  loadFileTree,
  loadIndex,
  openFile,
  openProject,
  updateFile,
  updateIndex,
  updateTag,
  writeIndex
};
