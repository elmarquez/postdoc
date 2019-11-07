import path from "path";
import Utils from "../utils";

const DATABASE_FILENAME = ".index.json";
const DEFAULT_INDEX = {
  files: [],
  lastUpdated: null,
  tags: [],
  thumbnails: {}
};

/**
 * Convenience methods for working with a library file index.
 */
class Database {
  /**
   * Constructor
   * @param {String} fp - Path to database file
   */
  constructor(fp, data) {
    this._data = data || DEFAULT_INDEX;
    this._path = fp;
  }

  getFiles() {
    return this._data.files;
  }

  getParentDirectory() {
    return path.dirname(this._path);
  }

  getTags() {
    return this._data.tags;
  }

  /**
   * Update database index.
   * @param {Function} cb - Progress callback
   * @returns {Promise<Array>} list of files
   */
  update(cb) {
    const self = this;
    const now = new Date();
    const nowIso = now.toISOString();
    console.info("Starting index update", nowIso);
    self._data.lastUpdated = now.toISOString();
    const fp = self.getParentDirectory();
    return Utils
      .files
      .getFileTree(fp, {absolute: false})
      .then(Utils.files.getFileHashes)
      .then(function(files) {
        self._data.files = files.map(f => {
          // TODO all file paths should be relative to the directory root
          f.filename = path.basename(f.path);
          f.extension = path.extname(f.path);
          f.mimetype = path.extname(f.path);
          f.lastUpdated = nowIso;
          f.tags = [];
          return f;
        });
        // remove deleted files
        // const deletedFiles = self._data.find({$ne: {lastUpdated: nowIso}});
        // console.info('deleted files', deletedFiles);
        const finishTime = new Date();
        console.info("Finished index update", finishTime.toISOString());
        //
        return self;
      });
  }

  /**
   * Write data to a local file.
   * @returns {Promise}
   */
  write() {
    const self = this;
    return Utils.files.writeJSON(this._path, this._data).then(function() {
      return self;
    });
  }
}

/**
 * Load database
 * @param {String} fp - File path
 * @returns {Promise<Database>} data
 */
function load(fp) {
  return Utils.files.exists(fp).then(function(exists) {
    console.info('Loading database from', fp);
    if (!exists) {
      return new Database(fp);
    } else {
      return Utils.files.readJSON(fp).then(function(data) {
        return new Database(fp, data);
      });
    }
  });
}

/**
 * Load database from a project folder.
 * @param {String} fp - Project path
 * @returns {Promise<Database>}
 */
function loadFromDir(fp) {
  const f = path.join(fp, DATABASE_FILENAME);
  return load(f);
}

export default Database;

export {
  load,
  loadFromDir
};
