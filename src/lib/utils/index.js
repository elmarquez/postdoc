/**
 * Utility functions.
 */
import files from "./files";
import fs from "fs";
import Promise from "bluebird";

/**
 * Load JSON file.
 * @param {String} p - path
 * @returns {Promise<any>}
 */
function loadJSON(p) {
  return new Promise(function(resolve, reject) {
    fs.readFile(p, "utf8", (err, data) => {
      if (err) {
        reject(err);
      } else {
        try {
          let json = JSON.parse(data);
          resolve(json);
        } catch (e) {
          reject(e);
        }
      }
    });
  });
}

function loadJSONSync(p) {
  let data = fs.readFileSync(p, "utf8");
  return JSON.parse(data);
}

export default {
  files,
  loadJSON,
  loadJSONSync
};
