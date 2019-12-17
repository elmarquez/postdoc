import { LIBRARY } from '../types';
import shortid from 'shortid';
import Library from '../../lib/library';
import store from '../index';
import { Promise } from 'bluebird';

/**
 * Add file.
 * @param {String} fp - File path
 * @returns {Object}
 */
const addFile = (fp) => {
  return { type: LIBRARY.ADD_FILE, id: shortid.generate(), path: fp };
};

/**
 * Add tag.
 * @param {String} tag - Tag
 * @returns {Object}
 */
const addTag = (tag) => {
  return { type: LIBRARY.ADD_FILE, id: shortid.generate(), tag: tag };
};

/**
 * Delete file.
 * @param {String} fp - File path
 * @returns {Object}
 */
const deleteFile = (fp) => {
  return { type: LIBRARY.DELETE_FILE, id: shortid.generate(), path: fp };
};

/**
 * Delete tag.
 * @param {String} tag - Tag
 * @returns {Object}
 */
const deleteTag = (tag) => {
  return { type: LIBRARY.DELETE_TAG, id: shortid.generate(), tag: tag };
};

/**
 * Get library index.
 * @param {String} fp - Library path
 * @returns {Function}
 */
const loadIndex = (fp) => {
  return {
    type: LIBRARY.LOAD_INDEX,
    path: fp,
    payload: Library.loadIndex(fp)
  };
};

/**
 * Update file record.
 * @param {String} fp - File path
 * @returns {Object}
 */
const updateFile = (fp) => {
  throw new Error('not implemented');
};

/**
 * Reindex the library, merge changes into the existing index file.
 * @param {String} fp - Library path
 * @returns {Object}
 */
const updateIndex = (fp, data) => {
  return {
    type: LIBRARY.UPDATE_INDEX,
    path: fp,
    payload: Library.updateIndex(fp)
  };
};

/**
 * Update tag.
 * @param {String} tag - Tag
 * @return {Object}
 */
const updateTag = (tag) => {
  throw new Error('not implemented');
};

/**
 * Write library index to the file system.
 * @returns {Object}
 */
const writeIndex = () => {
  const state: any = store.getState();
  const { library } = state.profile.data;
  const { data } = state.library;
  return {
    type: LIBRARY.WRITE_INDEX,
    path: library,
    payload: Library.writeIndex(library, data)
  };
};

export {
  addFile,
  addTag,
  deleteFile,
  deleteTag,
  loadIndex,
  updateFile,
  updateIndex,
  updateTag,
  writeIndex
};
