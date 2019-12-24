import { PROJECT } from '../types';
import Project from '../../lib/project';

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
  deleteFile,
  deleteTag,
  loadFileTree,
  loadIndex,
  updateFile,
  updateIndex,
  updateTag,
  writeIndex
};
