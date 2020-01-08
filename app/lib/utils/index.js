/**
 * Utility functions.
 */
import Buffer from 'buffer';
import fs from 'fs';
import Promise from 'bluebird';
import files from './files';
import tree from './tree';

function toArrayBuffer(buf) {
  const ab = new ArrayBuffer(buf.length);
  let view = new Uint8Array(ab);
  for (let i = 0; i < buf.length; ++i) {
    view[i] = buf[i];
  }
  return ab;
}

function toBuffer(ab) {
  let buf = Buffer.alloc(ab.byteLength);
  const view = new Uint8Array(ab);
  for (let i = 0; i < buf.length; ++i) {
    buf[i] = view[i];
  }
  return buf;
}

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
  toArrayBuffer,
  toBuffer,
  tree
};
