import crypto from 'crypto';
import fs from 'fs';
import glob from 'glob';
import hasha from 'hasha';
import mime from 'mime-types';
import path from 'path';
import Promise from 'bluebird';

const HASH_ALGO = {
  MD5: 'md5',
  SHA256: 'sha256'
};

/**
 * Ensure that the directory exists.
 * @param {String} p - Directory path
 * @param {Integer} mode - Directory permissions
 * @return {Promise}
 */
function ensureDir(p, mode) {
  return exists(p)
    .then(function(exists) {
      if (!exists) {
        return mkdir(p, mode || 0o700).then(function() {
          return isWriteable(p);
        });
      }
      return isWriteable(p);
    })
    .then(function(accessible) {
      if (!accessible) {
        return Promise.reject('path is not writeable');
      }
    });
}

/**
 * Ensure that the file exists. If it does not, initialize it with the default
 * data.
 * @param {String} file - File path
 * @param {Object} data - Default data
 * @return {Promise}
 */
function ensureFile(file, data) {
  return exists(file).then(function(exists) {
    if (!exists) {
      return writeJSON(file, data);
    }
    return Promise.resolve();
  });
}

/**
 * Determine if the file exists.
 * @param {String} p - File path
 * @return {Promise<Boolean>}
 */
function exists(f) {
  return new Promise(function(resolve, reject) {
    fs.access(f, fs.constants.F_OK, err => {
      if (err) {
        resolve(false);
      } else {
        resolve(true);
      }
    });
  });
}

/**
 * Get file stats
 * @param {Array} files - File paths
 * @return {Promise}
 */
function getDirStats(files) {
  const promises = files.map(f => getFileStats(f));
  return Promise.all(promises);
}

/**
 * Get file hash.
 * @param {string} f - File path
 * @returns {Promise}
 */
function getFileHash(f) {
  return new Promise(function (resolve, reject) {
    const shasum = crypto.createHash(algorithm);
    const s = fs.ReadStream(f);
    s.on('data', (data) => shasum.update(data));
    s.on('end', () => resolve(shasum.digest('hex')));
    s.on('error', (err) => reject(err));
  });
}

/**
 * Get file hashses.
 * @param {Array} files - Files
 * @return {Promise|Array} file list with hashes
 */
function getFileHashes(files) {
  const cfg = { algorithm: HASH_ALGO.SHA256 };
  const promises = files.map(f => {
    return hasha.fromFile(f, cfg).then(hash => {
      return { path: f, hash };
    });
  });
  return Promise.all(promises);
}

/**
 * Get file metadata.
 * @param {string} file - File path
 * @returns {Promise<unknown[]>}
 */
function getFileMetadata(f) {
  return getFileStats(f).then(function(stats) {
    const name = path.basename(f);
    return {path: f, stats, mimetype: mime.lookup(name)};
  })
}

/**
 * Get files metadata.
 * @param {array} files - Files
 * @returns {Promise<unknown[]>}
 */
function getFilesMetadata(files) {
  const promises = files.map(f => getFileMetadata(f));
  return Promise.all(promises);
}

/**
 * Get file listing for a directory.
 * @param {String} dir - Directory path
 * @return {Promise}
 */
function getFiles(dir) {
  return new Promise(function(resolve, reject) {
    fs.readdir(dir, function(err, files) {
      if (err) {
        reject(err);
      } else {
        const fullpaths = files.map(f => path.join(dir, f));
        resolve(fullpaths);
      }
    });
  });
}

/**
 * Get file stats.
 * @param {String} f - File path
 * @return {Object
 */
function getFileStats(f) {
  return new Promise(function(resolve, reject) {
    fs.stat(f, (err, stats) => {
      if (err) {
        reject(err);
      } else {
        resolve({ path: f, stats });
      }
    });
  });
}

/**
 * Get subdirectory file listing.
 * @param {String} cwd - Project path
 * @param {object} options - Options
 * @returns {Promise}
 */
function getFileList(cwd, options) {
  options = { absolute: true, cwd, nodir: true, silent: true };
  return new Promise(function(resolve, reject) {
    glob('**/*', options, function(err, files) {
      if (err) {
        reject(err);
      } else {
        getFilesMetadata(files)
          .then(function(tree) {
            resolve(tree);
          });
      }
    });
  });
}

/**
 * Get stats for all files.
 * @param {Array} files - Files
 * @return {Promise}
 */
function getStats(files) {
  const promises = files.map(f => getFileStats(f));
  return Promise.all(promises);
}

/**
 * Determine if the file is writeable.
 * @param {String} p - Path to file
 * @return {Promise<Boolean>}
 */
function isWriteable(p) {
  return new Promise(function(resolve, reject) {
    fs.access(p, fs.constants.W_OK | fs.constants.W_OK, err => {
      if (err) {
        resolve(false);
      } else {
        resolve(true);
      }
    });
  });
}

/**
 * Make the directory.
 * @param {String} p - Path to directory
 * @param {Integer} mode - File system permissions
 * @return {Promise}
 */
function mkdir(p, mode) {
  return new Promise(function(resolve, reject) {
    fs.mkdir(p, { recursive: true }, function(err) {
      if (err) {
        reject(err);
      } else {
        fs.chmod(p, mode || 0o700, function(err) {
          if (err) {
            reject(err);
          } else {
            resolve();
          }
        });
      }
    });
  });
}

/**
 * Read file data.
 * @param {String} f - Path to file
 * @return {Promise<string>}
 */
function readFile(f) {
  return new Promise(function(resolve, reject) {
    fs.readFile(f, 'utf8', function(err, data) {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
}

/**
 * Read JSON file.
 * @param {String} f - Path to file
 * @return {Promise<Object>}
 */
function readJSON(f) {
  return readFile(f).then(function(data) {
    try {
      return JSON.parse(data);
    } catch (err) {
      throw new Error(err);
    }
  });
}

function removeDirectories(files) {
  const visible = files.filter(f => !f.stats.isDirectory());
  return Promise.resolve(visible);
}

/**
 * Remove hidden files from listing.
 * @param {Array} files - Files
 * @returns {Promise}
 */
function removeHiddenFiles(files) {
  const visible = files.filter(f => {
    const basename = path.basename(f);
    return basename[0] !== '.';
  });
  return Promise.resolve(visible);
}

/**
 * Write file.
 * @param {String} fp - Path to file
 * @param {Object} obj - Data
 * @return {Promise}
 */
function writeFile(fp, data) {
  return new Promise(function(resolve, reject) {
    fs.writeFile(fp, data, 'utf8', function(err) {
      if (err) {
        reject(err);
      } else {
        console.debug('Wrote file', fp, obj);
        resolve();
      }
    });
  });
}

/**
 * Write JSON file.
 * @param {String} fp - Path to file
 * @param {Object} obj - Data
 * @return {Promise}
 */
function writeJSON(fp, obj) {
  try {
    const data = JSON.stringify(obj);
    return writeFile(fp, data);
  } catch (err) {
    return Promise.reject(err);
  }
}

export default {
  ensureDir,
  ensureFile,
  exists,
  getDirStats,
  getFileHashes,
  getFiles,
  getFileStats,
  getFileList,
  getStats,
  isAccessible: isWriteable,
  mkdir,
  readFile,
  readJSON,
  removeDirectories,
  removeHiddenFiles,
  writeFile,
  writeJSON
};
