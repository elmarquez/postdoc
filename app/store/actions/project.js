import { basename, extname } from 'path';
import { PROJECT } from '../types';
import Project from '../../lib/project';
import files from '../../lib/utils/files';
import Utils from '../../lib/utils';
import { getFileType, getJsonType } from '../../lib/utils/type';
import MIMETYPES from '../../constants/mimetypes';

const { dialog } = require('electron');

/**
 * Add file.
 * @param {String} path - File path
 * @returns {Object}
 */
function addFile(path) {
  return { type: PROJECT.ADD_FILE, path };
}

/**
 * Add tag.
 * @param {String} tag - Tag
 * @returns {Object}
 */
function addTag(tag) {
  return { type: PROJECT.ADD_FILE, tag };
}

function cloneProject(path, url) {

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
 * Delete tag.
 * @param {String} tag - Tag
 * @returns {Object}
 */
function deleteTag(tag) {
  return { type: PROJECT.DELETE_TAG, tag };
}

/**
 * Load file tree.
 * @param {String} path - Library path
 * @returns {object}
 */
function loadFileTree(path) {
  return {
    type: PROJECT.LOAD_FILE_TREE,
    payload: Project.loadFileTree(path)
  };
}

/**
 * Get library index.
 * @param {String} path - Library path
 * @returns {Function}
 */
function loadIndex(path) {
  return {
    type: PROJECT.LOAD_INDEX,
    payload: Project.loadIndex(path)
  };
}

/**
 * Open new project folder.
 * @param {String} path - Project path
 * @returns {object}
 */
function openProject(path) {
  return {
    type: PROJECT.OPEN_PROJECT,
    payload: Promise.resolve(path)
  };
}

/**
 * Update file record.
 * @param {String} path - File path
 * @returns {object}
 */
function updateFile(path, data) {
  return {
    type: PROJECT.UPDATE_FILE,
    payload: Promise.resolve({path, data})
  };
}

/**
 * Reindex the library, merge changes into the existing index file.
 * @param {String} path - Library path
 * @returns {Object}
 */
function updateIndex(path, data) {
  return {
    type: PROJECT.UPDATE_INDEX,
    payload: Project.updateIndex(path)
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
 * @param {String} path - Library path
 * @param {Object} data - Index data
 * @returns {Object}
 */
function writeIndex(path, data) {
  throw new Error('not implemented');
}

export {
  addTag,
  createProject,
  deleteTag,
  loadFileTree,
  loadIndex,
  openProject,
  updateIndex,
  updateTag,
  writeIndex
};
