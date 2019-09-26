import fs from "fs";
import glob from "glob";
import hasha from "hasha";
import path from "path";
import Promise from "bluebird";

const HASH_ALGO = {
  MD5: "md5",
  SHA256: "sha256"
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
      } else {
        return isWriteable(p);
      }
    })
    .then(function(accessible) {
      if (!accessible) {
        return Promise.reject("path is not writeable");
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
    } else {
      return Promise.resolve();
    }
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
  let promises = files.map(f => getFileStats(f));
  return Promise.all(promises);
}

/**
 * Get file hashses.
 * @param {Array} files - Files
 * @return {Promise|Array} file list with hashes
 */
function getFileHashes(files) {
  const cfg = { algorithm: HASH_ALGO.SHA256 };
  var promises = files.map(f => {
    return hasha.fromFile(f, cfg).then(hash => {
      return { path: f, hash: hash };
    });
  });
  return Promise.all(promises);
}

/**
 * Get project file tree.
 * @param {String} cwd - Project path
 * @returns {Promise}
 */
function getFileTree(cwd) {
  const options = { absolute: true, cwd: cwd, nodir: true, silent: true };
  return new Promise(function(resolve, reject) {
    glob("**/*", options, function(err, files) {
      if (err) {
        reject(err);
      } else {
        resolve(files);
      }
    });
  });
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
        let fullpaths = files.map(f => path.join(dir, f));
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
 * Get stats for all files.
 * @param {Array} files - Files
 * @return {Promise}
 */
function getStats(files) {
  let promises = files.map(f => getFileStats(f));
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
 * Read JSON file.
 * @param {String} f - Path to file
 * @return {Promise<Object>}
 */
function readJSON(f) {
  return new Promise(function(resolve, reject) {
    fs.readFile(f, "utf8", function(err, data) {
      if (err) {
        reject(err);
      } else {
        try {
          let obj = JSON.parse(data);
          resolve(obj);
        } catch (err) {
          reject(err);
        }
      }
    });
  });
}

function removeDirectories(files) {
  let visible = files.filter(f => !f.stats.isDirectory());
  return Promise.resolve(visible);
}

/**
 * Remove hidden files from listing.
 * @param {Array} files - Files
 * @returns {Promise}
 */
function removeHiddenFiles(files) {
  let visible = files.filter(f => {
    let basename = path.basename(f);
    return basename[0] !== ".";
  });
  return Promise.resolve(visible);
}

/**
 * Write JSON file.
 * @param {String} fp - Path to file
 * @param {Object} obj - Data
 * @return {Promise}
 */
function writeJSON(fp, obj) {
  return new Promise(function(resolve, reject) {
    try {
      let data = JSON.stringify(obj);
      fs.writeFile(fp, data, "utf8", function(err) {
        if (err) {
          reject(err);
        } else {
          console.info("Wrote file", fp);
          resolve();
        }
      });
    } catch (err) {
      reject(err);
    }
  });
}

export default {
  ensureDir,
  ensureFile,
  exists,
  getDirStats,
  getFileHashes,
  getFiles,
  getFileStats,
  getFileTree,
  getStats,
  isAccessible: isWriteable,
  mkdir,
  readJSON,
  removeDirectories,
  removeHiddenFiles,
  writeJSON
};
