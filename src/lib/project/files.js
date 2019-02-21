import fs from 'fs';
import log from 'electron-log';
import path from 'path';
import Promise from "bluebird";

/**
 * Get file stats
 * @param {Array} files - File paths
 * @return {Promise}
 */
function getDirStats(files) {
  let promises = files.map(f => getFileStats(f));
  return Promise.all(promises);
}

/**
 * Get project file tree.
 * @param {String} cwd - Project path
 * @returns {Promise}
 */
function getFileTree (cwd) {
  return getFiles(cwd)
    .then(removeHiddenFiles)
    .then(getStats);
}

/**
 * Get file listing for a directory.
 * @param {String} dir - Directory path
 * @return {Promise}
 */
function getFiles (dir) {
  return new Promise(function (resolve, reject) {
    fs.readdir(dir, function (err, files) {
      if (err) {
        reject(err);
      } else {
        let fullpaths = files.map(f => path.join(dir, f));
        resolve(fullpaths);
      }
    })
  });
}

/**
 * Get file stats.
 * @param {String} f - File path
 * @return {Object
 */
function getFileStats (f) {
  return new Promise(function (resolve, reject) {
    fs.stat(f, (err, stats) => {
      if (err) {
        reject(err);
      } else {
        resolve({path: f, stats});
      }
    });
  });
}

/**
 * Get stats for all files.
 * @param {Array} files - Files
 * @return {Promise}
 */
function getStats (files) {
  let promises = files.map(f => getFileStats(f));
  return Promise.all(promises);
}

/**
 * Remove hidden files from listing.
 * @param {Array} files - Files
 * @returns {Promise}
 */
function removeHiddenFiles (files) {
  let visible = files.filter(f => {
    let basename = path.basename(f);
    return basename[0] !== '.';
  });
  return Promise.resolve(visible);
}

module.exports = {
  getDirStats,
  getFiles,
  getFileStats,
  getFileTree,
  getStats
};
