import { basename, extname } from 'path';
import {FILES} from '../types';
import files from '../../lib/utils/files';
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
  // TODO need to revise the file loading pipeline
  let handlers = {
    '.bib': () => console.info('bib handler')
  };
  return {
    type: FILES.OPEN_FILE,
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
