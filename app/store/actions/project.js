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

/**
 * Close file. Before calling this function, you should prompt the user to
 * persist the file state.
 * @param {String} path - File path
 * @returns {object}
 */
function closeFile(path) {
  return {
    type: PROJECT.CLOSE_FILE,
    payload: Promise.resolve(path)
  };
}

/**
 * Create file.
 * @param {string} path - File path
 * @returns {Object}
 */
function createFile(path) {
  return {
    type: PROJECT.CREATE_FILE,
    payload: path !== null ? Promise.resolve(path) : Promise.resolve()
  };
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
 * @param {String} path - File path
 * @returns {Object}
 */
function deleteFile(path) {
  return { type: PROJECT.DELETE_FILE, path };
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
 * Open file.
 * @param {String} path - File path
 * @returns {object}
 */
function openFile(path) {
  return {
    type: PROJECT.OPEN_FILE,
    payload: files.readFile(path).then(data => {
      const filename = basename(path);
      const extension = extname(path);
      let type = getFileType(path, data);
      // convert data encoding depending on its inferred type
      const binaryTypes = [
        MIMETYPES.GIF.mimetype,
        MIMETYPES.JPEG.mimetype,
        MIMETYPES.PDF.mimetype,
        MIMETYPES.PNG.mimetype,
        MIMETYPES.TIFF.mimetype,
        MIMETYPES.WEBP.mimetype,
      ];
      if (type.mimetype === MIMETYPES.PDF.mimetype) {
        data = data.toString('base64');
      } else if (type.mimetype === MIMETYPES.JSON.mimetype) {
        try {
          data = data.toString();
          data = JSON.parse(data);
          type = getJsonType(data);
        } catch (err) {
          // TODO need a better approach to this than just bombing out
            console.error(err);
        }
      } else if (binaryTypes.indexOf(type.mimetype) === -1) {
        data = data.toString();
      }
      return { data, filename, path, type };
    })
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
 * Save file.
 * @param {string} path - File path
 * @param {array|object|string} data - File data
 * @returns {{payload: Promise<void>, type: string}}
 */
function saveFile(path, data) {
  return {
    type: PROJECT.SAVE_FILE,
    payload: Promise.resolve()
  };
}

/**
 * Set active editor file.
 * @param {string} path - File path
 * @returns {object}
 */
function setActiveFile(path) {
  return {
    type: PROJECT.SET_ACTIVE_FILE,
    data: path
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
  addFile,
  addTag,
  closeFile,
  createFile,
  createProject,
  deleteFile,
  deleteTag,
  loadFileTree,
  loadIndex,
  openFile,
  openProject,
  saveFile,
  setActiveFile,
  updateFile,
  updateIndex,
  updateTag,
  writeIndex
};
