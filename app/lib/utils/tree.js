import { basename } from 'path';
import Promise from 'bluebird';
import files from './files';

/**
 * Get directory tree listing.
 * @param {string} cwd - Directory path
 * @returns {Promise}
 */
function getDirectoryTree(cwd, recurse) {
  return files
    .getFiles(cwd)
    .then(function(filez) {
      const promises = filez.map((f) => files.getFileStats(f));
      return Promise.all(promises);
    })
    .then(function(filez) {
      const promises = filez.map((f) => {
        const r = {
          key: f.path,
          title: basename(f.path),
          dir: f.stats.isDirectory(),
          hidden: basename(f.path).substring(0,1) === '.',
          link: f.stats.isSymbolicLink(),
        };
        if (r.dir === true) {
          return getDirectoryTree(f.path).then(function(children) {
            return { ...r, children };
          });
        }
        return Promise.resolve(r);
      });
      return Promise.all(promises);
    });
}

export default {
  getDirectoryTree,
};
