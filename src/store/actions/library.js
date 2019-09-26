import { LIBRARY } from "./actionTypes";
import shortid from "shortid";
import Library from "../../lib/library";

/**
 * Add file.
 * @param {String} fp - File path
 * @returns {Object}
 */
function addFile(fp) {
  return { type: LIBRARY.ADD_FILE, id: shortid.generate(), path: fp };
}

/**
 * Add tag.
 * @param {String} tag - Tag
 * @returns {Object}
 */
function addTag(tag) {
  return { type: LIBRARY.ADD_FILE, id: shortid.generate(), tag: tag };
}

/**
 * Delete file.
 * @param {String} fp - File path
 * @returns {Object}
 */
function deleteFile(fp) {
  return { type: LIBRARY.DELETE_FILE, id: shortid.generate(), path: fp };
}

/**
 * Delete tag.
 * @param {String} tag - Tag
 * @returns {Object}
 */
function deleteTag(tag) {
  return { type: LIBRARY.DELETE_TAG, id: shortid.generate(), tag: tag };
}

/**
 * Get library index.
 * @param {String} fp - Library path
 * @returns {Function}
 */
function loadIndex(fp) {
  return function(dispatch) {
    dispatch({
      type: LIBRARY.LOAD_LIBRARY_INDEX,
      id: shortid.generate(),
      isLoading: true
    });
    Library.loadIndex(fp).then(function(data) {
      dispatch({
        type: LIBRARY.LOAD_LIBRARY_INDEX,
        id: shortid.generate(),
        files: data.files,
        isLoading: false,
        tags: data.tags
      });
    });
  };
}

/**
 * Update file record.
 * @param {String} fp - File path
 * @returns {Object}
 */
function updateFile(fp) {
  throw new Error("not implemented");
}

/**
 * Update library index.
 * @param {String} fp - Library path
 * @returns {Object}
 */
function updateIndex(fp) {
  return function(dispatch) {
    dispatch({
      type: LIBRARY.UPDATE_INDEX,
      id: shortid.generate(),
      isLoading: true
    });
    Library.updateIndex(fp).then(function(data) {
      dispatch({
        type: LIBRARY.UPDATE_INDEX,
        id: shortid.generate(),
        data,
        isLoading: false
      });
    });
  };
}

/**
 * Update tag.
 * @param {String} tag - Tag
 * @return {Object}
 */
function updateTag(tag) {
  throw new Error("not implemented");
}

export {
  addFile,
  addTag,
  deleteFile,
  deleteTag,
  loadIndex,
  updateFile,
  updateIndex,
  updateTag
};
