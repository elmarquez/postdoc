import { basename, extname } from 'path';
import {FILES} from '../types';
import Files from '../../lib/files';
import Utils from '../../lib/utils';
import { getFileType, getJsonType } from '../../lib/utils/type';
import MIMETYPES from '../../constants/mimetypes';

/**
 * Close file. Before calling this function, you should prompt the user to
 * persist the file state.
 * @param {String} path - File path
 * @returns {object}
 */
function closeFile(path) {
  return {
    type: FILES.CLOSE_FILE,
    payload: Promise.resolve(path)
  };
}

/**
 * Create file.
 * @param {string} path - File path
 * @param {string} type - Mimetype
 * @returns {Object}
 */
function createFile(path, type) {
  return {
    type: FILES.CREATE_FILE,
    payload: path !== null ? Promise.resolve(path) : Promise.resolve()
  };
}

/**
 * Delete file.
 * @param {String} path - File path
 * @returns {Object}
 */
function deleteFile(path) {
  return { type: FILES.DELETE_FILE, path };
}

/**
 * Open file.
 * @param {String} path - File path
 * @returns {object}
 */
function openFile(path) {
  const filename = basename(path);
  const extension = extname(path);
  const type = getFileType(path);
  // TODO make file handlers pluggable
  // file the right file handler
  let fileHandlers = {
    DEFAULT: Files.loadText,
    '.adoc': Files.loadText,
    '.bib': Files.loadBibtex,
    '.gif': Files.loadImage,
    '.jpeg': Files.loadImage,
    '.jpg': Files.loadImage,
    '.json': Files.loadJSON,
    '.md': Files.loadText,
    '.pdf': Files.loadPDF,
    '.png': Files.loadImage,
    '.sh': Files.loadText,
    '.txt': Files.loadText,
    '.webp': Files.loadImage,
    '.yaml': Files.loadText,
    '.yml': Files.loadText
  };
  let handler = fileHandlers.DEFAULT;
  if (extension in fileHandlers) {
    handler = fileHandlers[extension];
  }
  return {
    type: FILES.OPEN_FILE,
    payload: handler(path).then(function(data) {
      return { data, filename, path, type };
    })
  };
}

/**
 * Set active editor file.
 * @param {string} path - File path
 * @returns {object}
 */
function setActiveFile(path) {
  return {
    type: FILES.SET_ACTIVE_FILE,
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
    type: FILES.UPDATE_FILE,
    payload: Promise.resolve({path, data})
  };
}

/**
 * Write file to the local disk.
 * @param {string} path - File path
 * @param {array|object|string} data - File data
 * @returns {{payload: Promise<void>, type: string}}
 */
function writeFile(path, data) {
  return {
    type: FILES.SAVE_FILE,
    payload: Promise.resolve()
  };
}

export {
  closeFile,
  createFile,
  deleteFile,
  openFile,
  setActiveFile,
  updateFile,
  writeFile
};
