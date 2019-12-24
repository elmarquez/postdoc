import fs from 'fs';
import git from 'simple-git';
import path from 'path';
import Promise from 'bluebird';
import files from './files';

/**
 * Add files to staging.
 * @param {String} cwd - Current working directory
 * @param {Array} files - Files
 * @returns {Promise}
 */
function add(cwd, files) {
  throw new Error('not implemented');
}

/**
 * Commit staged changes.
 * @param {String} cwd - Current working directory
 * @returns {Promise}
 */
function commit(cwd) {
  throw new Error('not implemented');
}

/**
 * Get branches.
 * @param {String} cwd - Current working directory
 * @returns {Promise}
 */
function getBranches(cwd) {
  throw new Error('not implemented');
}

/**
 * Get the name of the current branch.
 * @param {String} cwd - Current working directory
 * @returns {Promise}
 */
function getCurrentBranch(cwd) {
  throw new Error('not implemented');
}

/**
 * Log commit log.
 * @param {String} cwd - Current working directory
 * @param {String} branch - Branch
 * @returns {Promise}
 */
function getLog(cwd, branch) {
  return new Promise(function(resolve, reject) {
    git(cwd).log(function(err, log) {
      if (err) {
        reject(err);
      } else {
        resolve(log);
      }
    });
  });
}

/**
 * Get the repository remotes.
 * @param {String} cwd - Current working directory
 * @returns {Promise}
 */
function getRemotes(cwd) {
  throw new Error('not implemented');
}

/**
 * Get staged changes.
 * @param {String} cwd - Current working directory
 * @returns {Promise}
 */
function getStagedChanges(cwd) {
  throw new Error('not implemented');
}

/**
 * Initialize the directory as a Git repository.
 * @param {String} cwd - Current working directory
 * @returns {Promise}
 */
function init(cwd) {
  throw new Error('not implemented');
}

/**
 * Determine if the current directory is a Git repository.
 * @param {String} cwd - Current working directory
 * @returns {Promise}
 */
function isGitRepository(cwd) {
  throw new Error('not implemented');
}

/**
 * Load project metadata.
 * @param {String} cwd - Current working directory
 * @returns {Promise}
 */
function load(cwd) {
  return Promise.all([loadFiles(cwd), loadMetadata(cwd)]).then(data => {
    return { files: data[0], metadata: data[1] };
  });
}

/**
 * Get file and file metadata listing for a specified path.
 * @param {String} cwd - Directory path
 * @returns {Promise}
 */
function loadFiles(cwd) {
  return files.getFileList(cwd);
}

/**
 * Load project metadata. Metadata is stored in the project.json file in the
 * top level of the project folder.
 * @param {String} cwd - Current working directory
 * @returns {Promise}
 */
function loadMetadata(cwd) {
  return new Promise(function(resolve, reject) {
    const name = path.basename(cwd);
    const p = path.join(cwd, 'project.json');
    fs.exists(p, exists => {
      if (!exists) {
        resolve({ name, version: '0.0.0', description: '' });
      } else {
        fs.readFile(p, 'utf8', (err, data) => {
          if (err) {
            console.error(`Failed to load project.json`, err);
            resolve({ name });
          } else {
            try {
              const json = JSON.parse(data);
              resolve(json);
            } catch (e) {
              reject(e);
            }
          }
        });
      }
    });
  });
}

/**
 * Pull changes.
 * @param {String} cwd - Current working directory
 * @returns {Promise}
 */
function pull(cwd) {
  return new Promise(function(resolve, reject) {
    git(cwd).pull(function(err, log) {
      if (err) {
        reject(err);
      } else {
        resolve(log);
      }
    });
  });
}

/**
 * Set working branch.
 * @param {String} cwd - Current working directory
 * @param {String} branch - Branch name
 * @returns {Promise}
 */
function setBranch(cwd, branch) {
  throw new Error('not implemented');
}

/**
 * Set repository remote.
 * @param {String} cwd - Current working directory
 * @param {String} url - Remote URL
 * @param {String} name - Remote name
 * @returns {Promise}
 */
function setRemote(cwd, url, name) {
  throw new Error('not implemented');
}

/**
 * Stash changes.
 * @param {String} cwd - Current working directory
 * @returns {Promise}
 */
function stash(cwd) {
  throw new Error('not implemented');
}

module.exports = {
  add,
  commit,
  getBranches,
  getCurrentBranch,
  getLog,
  getRemotes,
  getStagedChanges,
  init,
  isGitRepository,
  load,
  pull
};
