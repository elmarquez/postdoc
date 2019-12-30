/**
 * Utility functions.
 */
import fs from 'fs';
import Promise from 'bluebird';
import files from './files';
import tree from './tree';

/**
 * Load JSON file.
 * @param {String} p - path
 * @returns {Promise<any>}
 */
function loadJSON(p) {
  return new Promise((resolve, reject) => {
    fs.readFile(p, 'utf8', (err, data) => {
      if (err) {
        reject(err);
      } else {
        try {
          const json = JSON.parse(data);
          resolve(json);
        } catch (e) {
          reject(e);
        }
      }
    });
  });
}

function loadJSONSync(p) {
  const data = fs.readFileSync(p, 'utf8');
  return JSON.parse(data);
}

export default {
  files,
  loadJSON,
  loadJSONSync,
  tree
};
