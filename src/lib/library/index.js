import Database, { DATABASE_FILENAME, loadFromDir } from "../database";
import path from "path";
import Utils from "../utils";

const LIBRARY_SETTINGS_FILE = "library.json";

/**
 * @param {String} fp - Path to library
 */
function addFile() {
  throw new Error("not implemented");
}

/**
 * @param {String} fp - Path to library
 */
function addTag() {
  throw new Error("not implemented");
}

/**
 * Load index into memory.
 * @param {String} fp - Path to library
 * @return {Promise}
 */
function loadIndex(fp) {
  return loadFromDir(fp).then(function(db) {
    return {files: db.getFiles(), tags: db.getTags()};
  });
}

/**
 * Load settings into memory.
 * @param {String} fp - Path to library
 * @return {Promise}
 */
function loadSettings(fp) {
  const p = path.join(fp, LIBRARY_SETTINGS_FILE);
  return Utils.files.readJSON(p);
}

/**
 * @param {String} fp - Path to library
 */
function removeFile() {
  throw new Error("not implemented");
}

/**
 * @param {String} fp - Path to library
 */
function removeTag() {
  throw new Error("not implemented");
}

/**
 * @param {String} fp - Path to library
 */
function updateFile() {
  throw new Error("not implemented");
}

/**
 * Update the library index.
 * @param {String} fp - Path to library
 * @returns {Promise<Database>}
 */
function updateIndex(fp) {
  return Database.loadFromDir(fp).then(function(db) {
    return db.update().then(function(db) {
      return db.write();
    });
  });
}

/**
 *
 * @param {String} fp - Path to library
 */
function updateTag() {
  throw new Error("not implemented");
}

/**
 * Write the index to file storage.
 * @param {String} fp - Path to library
 * @param {Object} data - Index data
 * @returns {Promise}
 */
function writeIndex(fp, data) {
  const p = path.join(fp, DATABASE_FILENAME);
  const database = new Database(p, data);
  return database.write();
}

export default {
  addFile,
  addTag,
  loadIndex,
  loadSettings,
  removeFile,
  removeTag,
  updateFile,
  updateIndex,
  updateTag,
  writeIndex
};
