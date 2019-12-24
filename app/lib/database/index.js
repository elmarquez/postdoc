import mimetypes from 'mime-types';
import moment from 'moment';
import path from 'path';
import Utils from '../utils';

const DATABASE_FILENAME = '.postdoc.json';
const DEFAULT_INDEX = {
  files: [],
  lastUpdated: null,
  mimetypes: [],
  tags: [],
  thumbnails: {},
  years: []
};
const THUMBNAILS_DIRECTORY = '.preview';

/**
 * Convenience methods for working with a library file index. Methods that
 * cause side effects will return a Promise that resolves to the database
 * instance.
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

  /**
   * Get all data.
   * @returns {Object}
   */
  getData() {
    return this._data;
  }

  /**
   * Get the list of project files.
   * @param {Number} start - Start index
   * @param {Number} offset - Number of records to return
   * @returns {Array}
   */
  getFiles(start, offset) {
    return this._data.files;
  }

  /**
   * Get list of file mimetypes.
   * @returns {Array}
   */
  getMimeTypes() {
    return this._data.types;
  }

  /**
   * Get the absolute path to the directory containing the database file.
   * @returns {string}
   */
  getParentDirectory() {
    return path.dirname(this._path);
  }

  /**
   * Get the absolute path to the database file.
   * @returns {String}
   */
  getPath() {
    return this._path;
  }

  /**
   * Get the set of tags assigned to the file collection.
   * @returns {Array}
   */
  getTags() {
    return this._data.tags;
  }

  /**
   * Get
   * @param {String} fp - Relative file path
   */
  getThumbnail(fp) {
    throw new Error('not implemented');
  }

  /**
   *
   * @returns {Array}
   */
  getYears() {
    return this._data.years;
  }

  /**
   * Update database index.
   * @param {Function} cb - Progress callback
   * @returns {Promise} returns database instance
   */
  update(cb) {
    const self = this;
    const now = new Date();
    const nowIso = now.toISOString();
    console.debug('Starting index update', nowIso);
    const fp = self.getParentDirectory();
    return Utils.files
      .getFileList(fp, { absolute: false })
      .then(Utils.files.getFileHashes)
      .then(function(files) {
        self._data.files = files.map(f => {
          // TODO all file paths should be relative to the directory root
          f.filename = path.basename(f.path);
          f.extension = path.extname(f.path).toLowerCase();
          f.mimetype = mimetypes.lookup(f.filename);
          f.lastUpdated = nowIso;
          f.tags = [];
          return f;
        });
        self._data.lastUpdated = now.toISOString();
        return self.updateSecondaryIndicies();
      })
      .then(() => {
        // TODO remove deleted files
        // TODO update changed files
        // const deletedFiles = self._data.find({$ne: {lastUpdated: nowIso}});
        // console.debug('deleted files', deletedFiles);
        // TODO merge with existing index
        const finishTime = new Date();
        console.debug('Finished index update', finishTime.toISOString());
        //
        return self;
      });
  }

  /**
   * Update secondary indicies.
   * @returns {Promise} returns database instance
   * TODO consider making this functional
   */
  updateSecondaryIndicies() {
    const self = this;
    console.debug('Updating secondary indidices');
    const { files } = self._data;
    // update tag, types, years sets
    const data = files.reduce(
      (map, f) => {
        if (f.mimetype) {
          map.mimetypes.add(f.mimetype);
        }
        f.tags.forEach(t => {
          map.tags.add(t);
        });
        const year = moment(f.lastModified).format('YYYY');
        map.years.add(year);
        return map;
      },
      { files, mimetypes: new Set(), tags: new Set(), years: new Set() }
    );
    // transform sets to arrays
    data.mimetypes = Array.from(data.mimetypes).sort();
    data.tags = Array.from(data.tags).sort();
    data.years = Array.from(data.years).sort();
    self._data = data;
    return Promise.resolve(self);
  }

  /**
   * Generate preview thumbnails for all image, PDF files.
   * @returns {Promise} returns database instance
   */
  updateThumbnails() {
    throw new Error('not implemented');
  }

  /**
   * Write data to a local file.
   * @returns {Promise} returns database instance
   */
  write() {
    const self = this;
    return Utils.files.writeJSON(this._path, this._data).then(function() {
      return self;
    });
  }
}

/**
 * Get database file path.
 * @param {String} dir - Project or library path
 * @return {String} path to database file
 */
function getDatabasePath(dir) {
  return path.join(dir, DATABASE_FILENAME);
}

/**
 * Load database
 * @param {String} fp - File path
 * @returns {Promise<Database>} data
 */
function load(fp) {
  return Utils.files.exists(fp).then(function(exists) {
    console.debug('Loading database from', fp);
    if (!exists) {
      return new Database(fp);
    }
    return Utils.files.readJSON(fp).then(function(data) {
      return new Database(fp, data);
    });
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

export { DATABASE_FILENAME, getDatabasePath, load, loadFromDir };
